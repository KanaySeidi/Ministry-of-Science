import { useTranslation } from "react-i18next";

const Living = ({
  currentCourse,
  updateCourse,
  level,
  course,
}: {
  currentCourse: any;
  updateCourse: (
    level: "bachelor" | "master" | "specialist",
    course: 1 | 2 | 3 | 4,
    section: string,
    field: string,
    value: number
  ) => void;
  level: "bachelor" | "master" | "specialist";
  course: 1 | 2 | 3 | 4;
}) => {
  const inputValue = (v: number) => (v === 0 ? "" : v);

  const { t } = useTranslation();
  return (
    <div className="border p-4 rounded space-y-2">
      {(["dormitory", "rent"] as const).map((key) => (
        <div key={key}>
          <label
            htmlFor={key}
            className="block text-sm font-medium text-gray-700"
          >
            {t(`studentDirection.${key}`)}
          </label>
          <input
            id={key}
            type="number"
            className="border p-1 w-full placeholder:text-black/40"
            placeholder={t(`studentDirection.amountPlaceholder`)}
            value={inputValue(currentCourse.living[key])}
            onChange={(e) =>
              updateCourse(
                level,
                course,
                "living",
                key,
                Number(e.target.value || 0)
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Living;
