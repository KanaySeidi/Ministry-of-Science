import { useStudentDirectionStore } from "@/store/useStudents";
import { useTranslation } from "react-i18next";

export default function ForeignStudents({
  level,
  course,
}: {
  level: "bachelor" | "master";
  course: 1 | 2 | 3 | 4;
}) {
  const {
    coursesByLevel,
    addForeignStudent,
    updateForeignStudent,
    removeForeignStudent,
  } = useStudentDirectionStore();

  const { t } = useTranslation();

  const currentCourse = coursesByLevel[level][course];

  return (
    <div className="border p-4 rounded space-y-4">
      <h4 className="font-semibold">
        {t("studentDirection.includingForeignStudents")}
      </h4>

      {currentCourse.foreign.map((item, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex justify-between">
            <label>{t("studentDirection.sitizen")}</label>
            <button
              type="button"
              onClick={() => removeForeignStudent(level, course, idx)}
              className="text-white bg-red-500 px-3 py-2 rounded-md text-sm cursor-pointer"
            >
              {t("studentDirection.removeCountry")}
            </button>
          </div>

          <input
            type="text"
            placeholder={t("studentDirection.countryPlaceholder")}
            className="border p-2 w-full"
            value={item.country}
            onChange={(e) =>
              updateForeignStudent(
                level,
                course,
                idx,
                "country",
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder={t("studentDirection.amountPlaceholder")}
            className="border p-2 w-full"
            value={item.count || ""}
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
