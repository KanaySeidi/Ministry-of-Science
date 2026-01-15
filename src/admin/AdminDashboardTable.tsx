import { useMemo, useState } from "react";
import { UNIVERSITY_REPORTS } from "@/data/UniversiteReport";
import type { CourseData } from "@/types/CourseData";

type ViewMode = "students" | "education" | "foreign" | "social";

const COURSES = [1, 2, 3, 4] as const;

const AdminDashboardTable = () => {
  const [universityId, setUniversityId] = useState("knu");
  const [course, setCourse] = useState<1 | 2 | 3 | 4>(1);
  const [view, setView] = useState<ViewMode>("students");

  const report = useMemo(
    () => UNIVERSITY_REPORTS.find((u) => u.universityId === universityId),
    [universityId]
  );

  const courseData: CourseData | undefined = report?.courses[course];

  if (!report || !courseData) {
    return <div className="p-6">Нет данных</div>;
  }

  /* ================= TABLE RENDERERS ================= */

  const renderStudents = () => (
    <tbody>
      <tr>
        <td>Всего студентов</td>
        <td>{courseData.studentsTotal.total}</td>
      </tr>
      <tr>
        <td>Групп</td>
        <td>{courseData.studentsTotal.group}</td>
      </tr>
      <tr>
        <td>Мужчины</td>
        <td>{courseData.studentsTotal.male}</td>
      </tr>
      <tr>
        <td>Женщины</td>
        <td>{courseData.studentsTotal.female}</td>
      </tr>
    </tbody>
  );

  const renderEducation = () => (
    <tbody>
      <tr>
        <td>Очное</td>
        <td>{courseData.education.fullTime}</td>
      </tr>
      <tr>
        <td>Заочное</td>
        <td>{courseData.education.distance}</td>
      </tr>
      <tr>
        <td>Вечернее</td>
        <td>{courseData.education.evening}</td>
      </tr>
      <tr>
        <td>Грант</td>
        <td>{courseData.education.grantCount}</td>
      </tr>
      <tr>
        <td>Контракт</td>
        <td>{courseData.education.contractCount}</td>
      </tr>
      <tr>
        <td>Стоимость контракта</td>
        <td>{courseData.education.contractPrice}</td>
      </tr>
    </tbody>
  );

  const renderForeign = () => (
    <tbody>
      <tr>
        <td>Иностранные (всего)</td>
        <td>{courseData.foreign.reduce((s, f) => s + f.count, 0)}</td>
      </tr>
      {courseData.foreign.map((f) => (
        <tr key={f.country}>
          <td>{f.country}</td>
          <td>{f.count}</td>
        </tr>
      ))}
    </tbody>
  );

  const renderSocial = () => (
    <tbody>
      <tr>
        <td>Сироты (всего)</td>
        <td>{courseData.social.orphansCount}</td>
      </tr>
      <tr>
        <td>Сироты (м)</td>
        <td>{courseData.social.orphansMale}</td>
      </tr>
      <tr>
        <td>Сироты (ж)</td>
        <td>{courseData.social.orphansFemale}</td>
      </tr>

      <tr>
        <td>ЛОВЗ (всего)</td>
        <td>{courseData.social.lovzCount}</td>
      </tr>
      <tr>
        <td>ЛОВЗ (м)</td>
        <td>{courseData.social.lovzMale}</td>
      </tr>
      <tr>
        <td>ЛОВЗ (ж)</td>
        <td>{courseData.social.lovzFemale}</td>
      </tr>

      <tr>
        <td>Этнические кыргызы</td>
        <td>{courseData.social.ethnicKyrgyzCount}</td>
      </tr>

      <tr>
        <td>Алайские события</td>
        <td>{courseData.social.alayEventCount}</td>
      </tr>

      <tr>
        <td>Иностранный бюджет</td>
        <td>{courseData.social.foreignBudgetCount}</td>
      </tr>

      <tr>
        <td>Золотые сертификаты</td>
        <td>{courseData.social.goldenCertificateCount}</td>
      </tr>
    </tbody>
  );

  const renderTableBody = () => {
    switch (view) {
      case "education":
        return renderEducation();
      case "foreign":
        return renderForeign();
      case "social":
        return renderSocial();
      default:
        return renderStudents();
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="w-11/12 mx-auto mt-32 p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Административная таблица (контингент)
      </h1>

      <div className="flex flex-wrap gap-4">
        <select
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
          className="border p-2 rounded"
        >
          {UNIVERSITY_REPORTS.map((u) => (
            <option key={u.universityId} value={u.universityId}>
              {u.universityName}
            </option>
          ))}
        </select>

        <select
          value={course}
          onChange={(e) => setCourse(Number(e.target.value) as any)}
          className="border p-2 rounded"
        >
          {COURSES.map((c) => (
            <option key={c} value={c}>
              {c} курс
            </option>
          ))}
        </select>

        <select
          value={view}
          onChange={(e) => setView(e.target.value as ViewMode)}
          className="border p-2 rounded"
        >
          <option value="students">Общие данные</option>
          <option value="education">Форма обучения</option>
          <option value="foreign">Иностранные студенты</option>
          <option value="social">Социальные категории</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Показатель</th>
            <th className="border p-2 text-left">Значение</th>
          </tr>
        </thead>
        {renderTableBody()}
      </table>
    </div>
  );
};

export default AdminDashboardTable;
