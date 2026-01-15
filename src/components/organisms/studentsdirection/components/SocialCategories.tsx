import SocialCategory from "./SocialCategory";

const SocialCategories = ({
  socialItems,
  level,
  course,
}: {
  socialItems: { id: number; title: string }[];
  level: "bachelor" | "master" | "specialist";
  course: 1 | 2 | 3 | 4;
}) => {
  return (
    <div className="border p-4 rounded space-y-4">
      <h4 className="font-semibold">Социальные категории</h4>
      {socialItems.map((cat) => (
        <SocialCategory
          key={cat.id}
          category={cat}
          level={level}
          course={course}
        />
      ))}
    </div>
  );
};

export default SocialCategories;
