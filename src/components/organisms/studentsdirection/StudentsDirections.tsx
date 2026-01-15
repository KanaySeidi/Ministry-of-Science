import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useStudentDirectionStore } from "@/store/user/useStudents";
import { useStudentSubmitStore } from "@/store/user/useStudentsSubmitStore";
import { useDirectionByCodeStore } from "@/store/form/useDirectionByCodeStore";
import { useContingentFormDataStore } from "@/store/form/useContingentFormDataStore";

import ForeignStudents from "../foreignStudents/ForeignStudents";
import SocialCategories from "./components/SocialCategories";
import Loader from "../loader/Loader";
import TotalStudents from "./components/TotalStudents";
import Education from "./components/Education";
import Living from "./components/Living";

/* ================= TYPES ================= */

type UiLevel = "bachelor" | "master" | "specialist";

const EDU_LEVELS: { id: number; ui: UiLevel; title: string }[] = [
  { id: 1, ui: "bachelor", title: "Бакалавриат" },
  { id: 2, ui: "master", title: "Магистратура" },
  { id: 3, ui: "specialist", title: "Специалитет" },
];

export default function StudentDirectionPage() {
  const { t } = useTranslation();

  /* ---------- STORES ---------- */

  const {
    direction,
    selectedCourse,
    coursesByLevel,
    setDirectionCode,
    setEduLevel,
    setEduForm,
    setSelectedCourse,
    updateCourse,
    reset,
  } = useStudentDirectionStore();

  const {
    direction: apiDirection,
    fetchByCode,
    loading: directionLoading,
    error: directionError,
  } = useDirectionByCodeStore();

  const {
    eduFormData,
    socialItems,
    fetchFormData,
    loading: metaLoading,
  } = useContingentFormDataStore();

  const { submit } = useStudentSubmitStore();

  /* ---------- LOCAL STATE ---------- */

  const [codeInput, setCodeInput] = useState("");

  /* ---------- INIT ---------- */

  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  /* ---------- DIRECTION SYNC ---------- */

  useEffect(() => {
    if (!apiDirection) return;
    setDirectionCode(apiDirection.code, apiDirection.title, apiDirection.id);
  }, [apiDirection, setDirectionCode]);

  /* ---------- DERIVED ---------- */

  const uiLevel: UiLevel | null = useMemo(() => {
    if (!direction || !direction.eduLevelId) return null; // Ensure direction is defined
    const found = EDU_LEVELS.find((l) => l.id === direction.eduLevelId);
    return found ? found.ui : null;
  }, [direction]);

  const currentCourse = useMemo(() => {
    if (!uiLevel || !coursesByLevel || !coursesByLevel[uiLevel]) return null; // Ensure coursesByLevel is defined
    return coursesByLevel[uiLevel]?.[selectedCourse] ?? null;
  }, [uiLevel, selectedCourse, coursesByLevel]);

  /* ---------- PAYLOAD ---------- */

  const buildRequestPayload = () => {
    if (
      !uiLevel ||
      !direction ||
      !direction.programId ||
      !direction.eduFormId ||
      !coursesByLevel[uiLevel]
    )
      return []; // Ensure all dependencies are defined

    return Object.entries(coursesByLevel[uiLevel])
      .filter(
        ([, course]) =>
          course.studentsTotal.total > 0 ||
          course.foreign.some((f) => f.country > 0 && f.count > 0)
      )
      .map(([courseNumber, course]) => ({
        program: direction.programId,
        form_level: direction.eduFormId,
        course_number: Number(courseNumber),

        students_count: course.studentsTotal.total,
        man_count: course.studentsTotal.male,
        woman_count: course.studentsTotal.female,
        group_count: course.studentsTotal.group,

        contract_value: String(course.education.contractPrice || 0),
        contract_basis_count: course.education.contractCount,
        grant_basis_count: course.education.grantCount,

        apartment_count: course.living.rent,
        hostel_count: course.living.dormitory,

        social_categories: Object.entries(course.social).map(([id, value]) => ({
          social_item: Number(id),
          all_count: value.all,
          man_count: value.male,
          woman_count: value.female,
        })),

        foreign_students: course.foreign
          .filter((f) => f.country > 0 && f.count > 0)
          .map((f) => ({
            country: f.country,
            count: f.count,
          })),
      }));
  };

  /* ---------- SUBMIT ---------- */

  const handleSubmit = async () => {
    const payload = buildRequestPayload();
    if (!payload.length) return;

    try {
      await submit(payload);
      alert("Данные успешно отправлены");
      reset();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Ошибка при отправке данных. Попробуйте снова.");
    }
  };

  /* ---------- LOADING GUARDS ---------- */

  useEffect(() => {
    console.log("Edu Form Data from Store:", eduFormData);
    console.log("Social Items from Store:", socialItems);
  }, [eduFormData, socialItems]);

  if (metaLoading || directionLoading) {
    return <Loader />;
  }

  if (!eduFormData || !socialItems) {
    console.error("Ошибка загрузки данных:", {
      eduFormData,
      socialItems,
    });
    return (
      <p className="text-red-500">Ошибка загрузки данных. Попробуйте позже.</p>
    );
  }

  if (!eduFormData.length || !socialItems.length) {
    return (
      <p className="text-red-500">
        Данные отсутствуют. Проверьте настройки или повторите попытку позже.
      </p>
    );
  }

  /* ---------- EDU FORM ---------- */

  const EduFormSelect = () => (
    <select
      value={direction.eduFormId || ""}
      onChange={(e) => setEduForm(Number(e.target.value))}
      className="border p-2 w-full"
    >
      <option value="" disabled>
        {t("studentDirection.selectEduForm")}
      </option>
      {eduFormData.map((form) => (
        <option key={form.id} value={form.id}>
          {form.title}
        </option>
      ))}
    </select>
  );

  /* ================= RENDER ================= */

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* ---------- DIRECTION ---------- */}

      <input
        type="text"
        placeholder={t("studentDirection.codePlaceholder")}
        className="border p-2 w-full"
        value={codeInput}
        onChange={(e) => {
          setCodeInput(e.target.value);
          if (e.target.value.trim()) {
            fetchByCode(e.target.value);
          }
        }}
      />

      {directionError && (
        <p className="text-red-500 text-sm">{directionError}</p>
      )}

      {direction.name && (
        <p className="font-medium text-sinii">{direction.name}</p>
      )}

      {/* ---------- EDU FORM ---------- */}

      <EduFormSelect />

      {/* ---------- EDU LEVEL ---------- */}

      <div className="flex gap-6">
        {EDU_LEVELS.map((lvl) => (
          <label key={lvl.id} className="flex gap-2 items-center">
            <input
              type="radio"
              checked={direction.eduLevelId === lvl.id}
              onChange={() => setEduLevel(lvl.id)}
            />
            {lvl.title}
          </label>
        ))}
      </div>

      {/* ---------- COURSES ---------- */}

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelectedCourse(c as any)}
            className={`px-3 py-1 border rounded ${
              selectedCourse === c ? "bg-sinii text-white" : ""
            }`}
          >
            {c} курс
          </button>
        ))}
      </div>

      {/* ---------- FORM ---------- */}

      {uiLevel && currentCourse && (
        <>
          {/* TOTAL */}
          <TotalStudents
            currentCourse={currentCourse}
            updateCourse={(level, course, section, field, value) =>
              updateCourse(
                level,
                course,
                section as "studentsTotal",
                field,
                value
              )
            }
            level={uiLevel}
            course={selectedCourse}
          />

          {/* EDUCATION */}
          <Education
            currentCourse={currentCourse}
            updateCourse={(level, course, section, field, value) =>
              updateCourse(level, course, section as "education", field, value)
            }
            level={uiLevel}
            course={selectedCourse}
          />

          {/* FOREIGN */}
          <ForeignStudents level={uiLevel} course={selectedCourse} />

          {/* LIVING */}
          <Living
            currentCourse={currentCourse}
            updateCourse={(level, course, section, field, value) =>
              updateCourse(level, course, section as "living", field, value)
            }
            level={uiLevel}
            course={selectedCourse}
          />

          {/* SOCIAL */}
          <SocialCategories
            socialItems={socialItems}
            level={uiLevel}
            course={selectedCourse}
          />
        </>
      )}

      {/* ---------- SUBMIT ---------- */}

      <button
        disabled={
          !direction.programId || !direction.eduFormId || !direction.eduLevelId
        }
        onClick={handleSubmit}
        className="bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
      >
        {t("studentDirection.submit")}
      </button>
    </div>
  );
}
