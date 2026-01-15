export type ForeignStudent = {
  country: string;
  count: number;
};

export type CourseData = {
  foreign: ForeignStudent[];

  education: {
    grantCount: number;
    contractCount: number;
    contractPrice: number;

    fullTime: number;
    distance: number;
    evening: number;
  };

  living: {
    dormitory: number;
    rent: number;
  };

  social: {
    orphansCount: number;
    orphansMale: number;
    orphansFemale: number;

    lovzCount: number;
    lovzMale: number;
    lovzFemale: number;

    ethnicKyrgyzCount: number;
    ethnicKyrgyzMale: number;
    ethnicKyrgyzFemale: number;

    alayEventCount: number;
    alayEventMale: number;
    alayEventFemale: number;

    foreignBudgetCount: number;
    foreignBudgetMale: number;
    foreignBudgetFemale: number;

    goldenCertificateCount: number;
    goldenCertificateMale: number;
    goldenCertificateFemale: number;
  };

  graduates: {
    count_2024_2025: number;
  };

  studentsTotal: {
    group: number;
    total: number;
    male: number;
    female: number;
  };
};
