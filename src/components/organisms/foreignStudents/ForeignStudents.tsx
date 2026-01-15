import { useStudentDirectionStore } from "@/store/user/useStudents";
import { useContingentFormDataStore } from "@/store/form/useContingentFormDataStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

type UiLevel = "bachelor" | "master" | "specialist";

export default function ForeignStudents({
  level,
  course,
}: {
  level: UiLevel;
  course: 1 | 2 | 3 | 4;
}) {
  const {
    coursesByLevel,
    addForeignStudent,
    updateForeignStudent,
    removeForeignStudent,
  } = useStudentDirectionStore();

  const { countries = [] } = useContingentFormDataStore();
  const { t } = useTranslation();

  const currentCourse = coursesByLevel[level]?.[course];
  if (!currentCourse) return null;

  const inputValue = (v: number) => (v === 0 ? "" : v);

  return (
    <div className="border p-4 rounded space-y-4">
      <h4 className="font-semibold">
        {t("studentDirection.includingForeignStudents")}
      </h4>

      {currentCourse.foreign.map((item, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex justify-between items-center">
            <label>{t("studentDirection.sitizen")}</label>
            <button
              type="button"
              onClick={() => removeForeignStudent(level, course, idx)}
              className="text-white bg-red-500 px-3 py-1 rounded-md text-sm"
            >
              {t("studentDirection.removeCountry")}
            </button>
          </div>

          {/* COUNTRY */}
          <select
            className="border p-2 w-full"
            value={item.country}
            onChange={(e) =>
              updateForeignStudent(
                level,
                course,
                idx,
                "country",
                Number(e.target.value)
              )
            }
          >
            <option value={0}>
              {t("studentDirection.countryPlaceholder")}
            </option>

            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          {/* COUNT */}
          <input
            type="number"
            placeholder={t("studentDirection.amountPlaceholder")}
            className="border p-2 w-full"
            value={inputValue(item.count)}
            onChange={(e) =>
              updateForeignStudent(
                level,
                course,
                idx,
                "count",
                e.target.value === "" ? 0 : Number(e.target.value)
              )
            }
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => addForeignStudent(level, course)}
        className="text-green-600 cursor-pointer"
      >
        + {t("studentDirection.addCountry")}
      </button>
    </div>
  );
}
