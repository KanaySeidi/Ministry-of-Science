import type { CourseData } from "@/types/CourseData";

export function aggregateForeign(course: CourseData) {
  const byCountry = course.foreign;

  const totalForeign = byCountry.reduce((sum, c) => sum + c.count, 0);

  const byEducationForm = {
    fullTime: Math.round(totalForeign * 0.7),
    distance: Math.round(totalForeign * 0.2),
    evening: Math.round(totalForeign * 0.1),
  };

  const byGender = {
    male: Math.round(totalForeign * 0.55),
    female: Math.round(totalForeign * 0.45),
  };

  return {
    totalForeign,
    byCountry,
    byEducationForm,
    byGender,
  };
}
