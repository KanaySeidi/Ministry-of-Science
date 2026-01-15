// import type { Values } from "@/types";

// export function aggregateForeignStudents(values: Values) {
//   const result = {
//     total: 0,
//     byLevel: { bachelor: 0, master: 0 },
//     byCourse: { 1: 0, 2: 0, 3: 0, 4: 0 },
//     byNation: {} as Record<string, number>,
//   };

//   values.programs.forEach((program) => {
//     program.foreign_students_by_nation?.forEach((n) => {
//       Object.entries(n.courses).forEach(([course, count]) => {
//         result.total += count;
//         result.byCourse[course as any] += count;
//         result.byNation[n.nation] = (result.byNation[n.nation] || 0) + count;
//       });
//     });
//   });

//   return result;
// }
