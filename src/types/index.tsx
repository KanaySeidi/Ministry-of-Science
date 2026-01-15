import type { CourseData } from "./CourseData";

export type LoginValues = {
  login: string;
  password: string;
};

export type Props = {
  authenticate?: (
    login: string,
    password: string
  ) => Promise<{ ok: boolean; message?: string }>;
  onSuccess?: (login: string) => void;
};

type CourseCounts = { male?: number; female?: number };

type ForeignNation = {
  nation: string;
  courses: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
  };
};

export type Program = {
  name: string;
  courses: {
    "1"?: number;
    "2"?: number;
    "3"?: number;
    "4"?: number;
  };
  contract_count?: number;
  contract_price?: number;
  grant_count?: number;
  foreign_budget_count?: number;
  total?: number;
  orphans?: CourseCounts;
  LOVZ?: CourseCounts;
  graduates_2024_2025?: number;
  full_time_edu?: CourseCounts;
  evening_edu?: CourseCounts;
  distance_edu?: CourseCounts;
  foreign_students_by_nation?: ForeignNation[];
};

export type MTB = {
  practice_rooms?: { area?: number; count?: number };
  lab_rooms?: { area?: number; count?: number };
  lecture_rooms?: { area?: number; count?: number };
  computer_classes?: {
    classes?: number;
    computers_total?: number;
    computers_for_learning?: number;
  };
  library?: { electronic?: number; print?: number };
  sports_halls?: { count?: number; total_area?: number };
  medical_point?: { exists?: boolean; area?: number };
  assembly_hall?: { exists?: boolean; area?: number };
  canteen?: { exists?: boolean; seats?: number };
  technopark?: { exists?: boolean; description?: string };
};

export type Values = {
  univKey: string;
  programs: Program[];
  foreign_students: any[];
  scholarships: any[];
  mtb: MTB;
};

export const initialValues: Values = {
  univKey: "",
  programs: [
    {
      name: "",
      courses: { "1": 0, "2": 0, "3": 0, "4": 0 },
      contract_count: 0,
      contract_price: 0,
      grant_count: 0,
      foreign_budget_count: 0,
      total: 0,
      orphans: {},
      LOVZ: {},
      graduates_2024_2025: 0,
      full_time_edu: {},
      distance_edu: {},
      evening_edu: {},
    },
  ],
  foreign_students: [],
  scholarships: [],
  mtb: {},
};

export type UniversityReport = {
  universityId: string;
  universityName: string;
  year: "2024-2025";
  courses: Record<1 | 2 | 3 | 4, CourseData>;
};
