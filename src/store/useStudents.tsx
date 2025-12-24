import { create } from "zustand";

export type Level = "bachelor" | "master";
export type Course = 1 | 2 | 3 | 4;

type ForeignStudent = {
  country: string;
  count: number;
};

type CourseData = {
  foreign: ForeignStudent[];
  education: {
    grantCount: number;
    contractCount: number;
    contractPrice: number;
    foreignBudgetCount: number;
    fullTime: number;
    distance: number;
    evening: number;
  };
  living: {
    dormitory: number;
    rent: number;
  };
  social: {
    orphansMale: number;
    orphansFemale: number;
    lovzMale: number;
    lovzFemale: number;
  };
  graduates: {
    count_2024_2025: number;
  };
};

type State = {
  direction: {
    code: string;
    name: string;
    level: Level | null;
  };

  selectedCourse: Course;

  coursesByLevel: {
    bachelor: Record<Course, CourseData>;
    master: Record<Course, CourseData>;
  };

  setDirectionCode: (code: string, name: string) => void;
  setLevel: (level: Level) => void;
  setSelectedCourse: (course: Course) => void;

  // 🔹 для обычных секций
  updateCourse: (
    level: Level,
    course: Course,
    section: "education" | "living" | "social" | "graduates",
    field: string,
    value: number
  ) => void;

  // 🔹 для foreign[]
  addForeignStudent: (level: Level, course: Course) => void;
  updateForeignStudent: (
    level: Level,
    course: Course,
    index: number,
    field: "country" | "count",
    value: string | number
  ) => void;
  removeForeignStudent: (level: Level, course: Course, index: number) => void;

  reset: () => void;
};

const emptyCourse = (): CourseData => ({
  foreign: [{ country: "", count: 0 }],
  education: {
    grantCount: 0,
    contractCount: 0,
    contractPrice: 0,
    foreignBudgetCount: 0,
    fullTime: 0,
    distance: 0,
    evening: 0,
  },
  living: {
    dormitory: 0,
    rent: 0,
  },
  social: {
    orphansMale: 0,
    orphansFemale: 0,
    lovzMale: 0,
    lovzFemale: 0,
  },
  graduates: {
    count_2024_2025: 0,
  },
});

const initCourses = (): Record<Course, CourseData> => ({
  1: emptyCourse(),
  2: emptyCourse(),
  3: emptyCourse(),
  4: emptyCourse(),
});

export const useStudentDirectionStore = create<State>((set) => ({
  direction: {
    code: "",
    name: "",
    level: null,
  },

  selectedCourse: 1,

  coursesByLevel: {
    bachelor: initCourses(),
    master: initCourses(),
  },

  setDirectionCode: (code, name) =>
    set((state) => ({
      direction: { ...state.direction, code, name },
    })),

  setLevel: (level) =>
    set((state) => ({
      direction: { ...state.direction, level },
    })),

  setSelectedCourse: (course) => set({ selectedCourse: course }),

  // 🔹 обычные секции
  updateCourse: (level, course, section, field, value) =>
    set((state) => ({
      coursesByLevel: {
        ...state.coursesByLevel,
        [level]: {
          ...state.coursesByLevel[level],
          [course]: {
            ...state.coursesByLevel[level][course],
            [section]: {
              ...state.coursesByLevel[level][course][section],
              [field]: value,
            },
          },
        },
      },
    })),

  // 🔹 foreign[]
  addForeignStudent: (level, course) =>
    set((state) => ({
      coursesByLevel: {
        ...state.coursesByLevel,
        [level]: {
          ...state.coursesByLevel[level],
          [course]: {
            ...state.coursesByLevel[level][course],
            foreign: [
              ...state.coursesByLevel[level][course].foreign,
              { country: "", count: 0 },
            ],
          },
        },
      },
    })),

  updateForeignStudent: (level, course, index, field, value) =>
    set((state) => {
      const list = [...state.coursesByLevel[level][course].foreign];
      list[index] = { ...list[index], [field]: value };

      return {
        coursesByLevel: {
          ...state.coursesByLevel,
          [level]: {
            ...state.coursesByLevel[level],
            [course]: {
              ...state.coursesByLevel[level][course],
              foreign: list,
            },
          },
        },
      };
    }),

  removeForeignStudent: (level, course, index) =>
    set((state) => ({
      coursesByLevel: {
        ...state.coursesByLevel,
        [level]: {
          ...state.coursesByLevel[level],
          [course]: {
            ...state.coursesByLevel[level][course],
            foreign: state.coursesByLevel[level][course].foreign.filter(
              (_, i) => i !== index
            ),
          },
        },
      },
    })),

  reset: () =>
    set({
      direction: { code: "", name: "", level: null },
      selectedCourse: 1,
      coursesByLevel: {
        bachelor: initCourses(),
        master: initCourses(),
      },
    }),
}));
