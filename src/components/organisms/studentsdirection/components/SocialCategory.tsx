import { useStudentDirectionStore } from "@/store/user/useStudents";
import { useTranslation } from "react-i18next";

type UiLevel = "bachelor" | "master" | "specialist";

type Props = {
  category: {
    id: number;
    title: string | number;
  };
  level: UiLevel;
  course: 1 | 2 | 3 | 4;
};

type SocialValue = {
  total: number;
  male: number;
  female: number;
};

const SocialCategory = ({ category, level, course }: Props) => {
  const { t } = useTranslation();

  const { coursesByLevel, updateSocial } = useStudentDirectionStore();

  const currentCourse = coursesByLevel[level]?.[course];
  if (!currentCourse) return null;

  const value = currentCourse.social[category.id] ?? {
    total: 0,
    male: 0,
    female: 0,
  };

  const inputValue = (v: number) => (v === 0 ? "" : v);

  const validKeys: (keyof SocialValue)[] = ["total", "male", "female"];

  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-sinii">{category.title}</p>

      <div className="flex gap-5">
        {validKeys.map((key) => (
          <div key={key}>
            <input
              id={`${category.id}-${key}`}
              type="number"
              className="border p-1 w-full placeholder:text-gray-400"
              placeholder={t(`studentDirection.${key}`)}
              value={inputValue(value[key as keyof SocialValue])}
              onChange={(e) =>
                updateSocial(level, course, category.id, {
                  ...value,
                  [key]: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialCategory;
