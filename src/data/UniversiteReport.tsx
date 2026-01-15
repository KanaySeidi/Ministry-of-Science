import type { UniversityReport } from "@/types";
import createCourseData from "@/utils/Generate";

export const UNIVERSITY_REPORTS: UniversityReport[] = [
  {
    universityId: "knu",
    universityName: "Кыргызский национальный университет им. Ж. Баласагына",
    year: "2024-2025",
    courses: {
      1: createCourseData(4200, 2300),
      2: createCourseData(3900, 2100),
      3: createCourseData(3500, 1900),
      4: createCourseData(3000, 1600),
    },
  },
  {
    universityId: "kstu",
    universityName:
      "Кыргызский государственный технический университет им. И. Раззакова",
    year: "2024-2025",
    courses: {
      1: createCourseData(3100, 1200),
      2: createCourseData(2900, 1100),
      3: createCourseData(2600, 1000),
      4: createCourseData(2400, 900),
    },
  },
  {
    universityId: "ksmu",
    universityName: "Кыргызская государственная медицинская академия",
    year: "2024-2025",
    courses: {
      1: createCourseData(1800, 2600),
      2: createCourseData(1700, 2500),
      3: createCourseData(1600, 2400),
      4: createCourseData(1500, 2300),
    },
  },
];
