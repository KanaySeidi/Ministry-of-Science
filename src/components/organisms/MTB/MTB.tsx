// import { Field } from "formik";

// type MTB = {
//   practice_rooms?: { area?: number; count?: number };
//   lab_rooms?: { area?: number; count?: number };
//   lecture_rooms?: { area?: number; count?: number };
//   computer_classes?: {
//     classes?: number;
//     computers_total?: number;
//     computers_for_learning?: number;
//   };
//   library?: { electronic?: number; print?: number };
//   sports_halls?: { count?: number; total_area?: number };
//   medical_point?: { exists?: boolean; area?: number };
//   assembly_hall?: { exists?: boolean; area?: number };
//   canteen?: { exists?: boolean; seats?: number };
//   technopark?: { exists?: boolean; description?: string };
// };

// function MTB() {
//   return (
//     <div>
//       <h2 className="font-semibold">Материально-техническая база</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label>Аудитории для практики — общая площадь</label>
//           <Field
//             type="number"
//             name="mtb.practice_rooms.area"
//             className="w-full border p-2"
//           />
//         </div>
//         <div>
//           <label>Аудитории для практики — количество</label>
//           <Field
//             type="number"
//             name="mtb.practice_rooms.count"
//             className="w-full border p-2"
//           />
//         </div>

//         <div>
//           <label>Компьютерные классы — кол-во</label>
//           <Field
//             type="number"
//             name="mtb.computer_classes.classes"
//             className="w-full border p-2"
//           />
//         </div>
//         <div>
//           <label>Компьютеров всего</label>
//           <Field
//             type="number"
//             name="mtb.computer_classes.computers_total"
//             className="w-full border p-2"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MTB;
