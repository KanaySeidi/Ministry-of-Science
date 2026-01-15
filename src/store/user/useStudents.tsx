import { create } from "zustand";

/* ================== TYPES ================== */

export type Course = 1 | 2 | 3 | 4;

type ForeignStudent = {
  country: number; // ID страны
  count: number;
};

type SocialValue = {
  all: number;
  male: number;
  female: number;
};

type CourseData = {
  foreign: ForeignStudent[];

  education: {
    grantCount: number;
    contractCount: number;
    contractPrice: number;
  };

  living: {
    dormitory: number;
    rent: number;
  };

  /** key = social_item.id */
  social: Record<number, SocialValue>;

  studentsTotal: {
    group: number;
    total: number;
    male: number;
    female: number;
  };
};

type State = {
  direction: {
    programId: number | null;
    code: string;
    name: string;
    eduLevelId: number | null; // edu-levels
    eduFormId: number | null; // edu-forms
  };

  selectedCourse: Course;

  coursesByLevel: {
    bachelor: Record<Course, CourseData>;
    master: Record<Course, CourseData>;
    specialist: Record<Course, CourseData>;
  };

  /* ---------- setters ---------- */

  setDirectionCode: (code: string, name: string, programId?: number) => void;

  setEduLevel: (eduLevelId: number) => void;
  setEduForm: (eduFormId: number) => void;

  setSelectedCourse: (course: Course) => void;

  /* ---------- updates ---------- */

  updateCourse: (
    level: "bachelor" | "master" | "specialist",
    course: Course,
    section: "education" | "living" | "studentsTotal",
    field: string,
    value: number
  ) => void;

  updateSocial: (
    level: "bachelor" | "master" | "specialist",
    course: Course,
    socialId: number,
    value: SocialValue
  ) => void;

  /* ---------- foreign ---------- */

  addForeignStudent: (
    level: "bachelor" | "master" | "specialist",
    course: Course
  ) => void;

  updateForeignStudent: (
    level: "bachelor" | "master" | "specialist",
    course: Course,
    index: number,
    field: "country" | "count",
    value: number
  ) => void;

  removeForeignStudent: (
    level: "bachelor" | "master" | "specialist",
    course: Course,
    index: number
  ) => void;

  reset: () => void;
};

/* ================== HELPERS ================== */

const emptyCourse = (): CourseData => ({
  foreign: [],

  education: {
    grantCount: 0,
    contractCount: 0,
    contractPrice: 0,
  },

  living: {
    dormitory: 0,
    rent: 0,
  },

  social: {},

  studentsTotal: {
    group: 0,
    total: 0,
    male: 0,
    female: 0,
  },
});

const initCourses = (): Record<Course, CourseData> => ({
  1: emptyCourse(),
  2: emptyCourse(),
  3: emptyCourse(),
  4: emptyCourse(),
});

/* ================== STORE ================== */

export const useStudentDirectionStore = create<State>((set) => ({
  direction: {
    programId: null,
    code: "",
    name: "",
    eduLevelId: null,
    eduFormId: null,
  },

  selectedCourse: 1,

  coursesByLevel: {
    bachelor: initCourses(),
    master: initCourses(),
    specialist: initCourses(),
  },

  /* ---------- direction ---------- */

  setDirectionCode: (code, name, programId) =>
    set((state) => ({
      direction: {
        ...state.direction,
        code,
        name,
        programId: programId ?? state.direction.programId,
      },
    })),

  setEduLevel: (eduLevelId) =>
    set((state) => ({
      direction: { ...state.direction, eduLevelId },
    })),

  setEduForm: (eduFormId) =>
    set((state) => ({
      direction: { ...state.direction, eduFormId },
    })),

  setSelectedCourse: (course) => set({ selectedCourse: course }),

  /* ---------- standard sections ---------- */

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

  /* ---------- social (KEY PART) ---------- */

  updateSocial: (level, course, socialId, value) =>
    set((state) => ({
      coursesByLevel: {
        ...state.coursesByLevel,
        [level]: {
          ...state.coursesByLevel[level],
          [course]: {
            ...state.coursesByLevel[level][course],
            social: {
              ...state.coursesByLevel[level][course].social,
              [socialId]: value,
            },
          },
        },
      },
    })),

  /* ---------- foreign students ---------- */

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
              { country: 0, count: 0 },
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

  /* ---------- reset ---------- */

  reset: () =>
    set({
      direction: {
        programId: null,
        code: "",
        name: "",
        eduLevelId: null,
        eduFormId: null,
      },
      selectedCourse: 1,
      coursesByLevel: {
        bachelor: initCourses(),
        master: initCourses(),
        specialist: initCourses(),
      },
    }),
}));
