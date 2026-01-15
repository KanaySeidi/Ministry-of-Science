import type { CourseData } from "@/types/CourseData";

function createCourseData(male: number, female: number): CourseData {
  const total = male + female;

  return {
    foreign: [
      { country: "Казахстан", count: Math.round(total * 0.04) },
      { country: "Узбекистан", count: Math.round(total * 0.03) },
      { country: "Россия", count: Math.round(total * 0.02) },
      { country: "Индия", count: Math.round(total * 0.01) },
    ],

    education: {
      grantCount: Math.round(total * 0.45),
      contractCount: Math.round(total * 0.55),
      contractPrice: 48000,

      fullTime: Math.round(total * 0.7),
      distance: Math.round(total * 0.2),
      evening: Math.round(total * 0.1),
    },

    living: {
      dormitory: Math.round(total * 0.35),
      rent: Math.round(total * 0.25),
    },

    social: {
      orphansCount: 45,
      orphansMale: 20,
      orphansFemale: 25,

      lovzCount: 38,
      lovzMale: 16,
      lovzFemale: 22,

      ethnicKyrgyzCount: Math.round(total * 0.12),
      ethnicKyrgyzMale: Math.round(male * 0.12),
      ethnicKyrgyzFemale: Math.round(female * 0.12),

      alayEventCount: 14,
      alayEventMale: 6,
      alayEventFemale: 8,

      foreignBudgetCount: 26,
      foreignBudgetMale: 14,
      foreignBudgetFemale: 12,

      goldenCertificateCount: 18,
      goldenCertificateMale: 7,
      goldenCertificateFemale: 11,
    },

    graduates: {
      count_2024_2025: Math.round(total * 0.23),
    },

    studentsTotal: {
      group: Math.round(total / 25),
      total,
      male,
      female,
    },
  };
}

export default createCourseData;
