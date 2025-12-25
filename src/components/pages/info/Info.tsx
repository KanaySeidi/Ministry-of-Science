// src/pages/InfoPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UNIVERSITIES } from "@/utils/Universitets";
import { currentUnivId } from "@/api/auth";
import { useTranslation } from "react-i18next";
import StudentDirectionPage from "@/components/organisms/studentsdirection/StudentsDirections";

const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const sessionId = currentUnivId();
    if (!sessionId || String(sessionId) !== id) {
      navigate("/");
    }
  }, [id, navigate]);

  const univ = UNIVERSITIES.find((u) => String(u.id) === id);

  const { t } = useTranslation();

  if (!univ) {
    return <div className="p-6">ВУЗ не найден</div>;
  }

  type Tab = "students" | "mtb";

  const [activeTab, setActiveTab] = React.useState<Tab>("students");

  return (
    <div className="max-w-3xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-bold mb-2">
        {t("info.welcome")}, {univ.title}!
      </h1>
      <p className="text-gray-700 mb-6">{t("info.welcomesubtitle")}</p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded ${
            activeTab === "students"
              ? "bg-sinii text-white"
              : "border text-sinii"
          }`}
        >
          Контингент студентов
        </button>
      </div>
      <div>{activeTab === "students" && <StudentDirectionPage />}</div>
    </div>
  );
};

export default Info;
