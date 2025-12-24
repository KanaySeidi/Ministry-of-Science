// src/pages/InfoPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UNIVERSITIES } from "@/utils/Universitets";
import { currentUnivId } from "@/api/auth";
import { useTranslation } from "react-i18next";
import StudentDirectionPage from "@/components/organisms/studentsdirection/StudentsDirections";

const Main: React.FC = () => {
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

  return (
    <div className="max-w-3xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-bold mb-2">
        {t("info.welcome")}, {univ.title}!
      </h1>
      <p className="text-gray-700 mb-6">{t("info.welcomesubtitle")}</p>

      <StudentDirectionPage />
    </div>
  );
};

export default Main;
