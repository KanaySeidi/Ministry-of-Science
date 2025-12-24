// import { Formik, FieldArray, Field, Form } from "formik";
// import { useState } from "react";
// import ConfirmModal from "@/components/organisms/confirmModal/ConfirmModal";

// type Program = {
//   name: string;
//   courses: {
//     "1"?: number;
//     "2"?: number;
//     "3"?: number;
//     "4"?: number;
//   };
// };

// type Values = {
//   univKey: string;
//   programs: Program[];
// };

// const initialValues: Values = {
//   univKey: "",
//   programs: [
//     {
//       name: "",
//       courses: { "1": 0, "2": 0, "3": 0, "4": 0 },
//     },
//   ],
// };

// const Scholarship = () => {
//   const handleSubmit = (values: Values) => {
//     console.log("SUBMIT", values);
//     alert("Данные подготовлены (см. консоль)");
//   };

//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [toRemoveIndex, setToRemoveIndex] = useState<number | null>(null);

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-4">
//         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//           {({ values }) => (
//             <Form className="space-y-6">
//               <FieldArray name="programs">
//                 {({ push, remove }) => (
//                   <div className="space-y-4">
//                     <h2 className="font-semibold">Студенты</h2>
//                     {values.programs.map((idx) => (
//                       <div key={idx} className="p-4 border rounded">
//                         <div className="flex gap-2">
//                           <div className="w-full">
//                             <label className="text-sinii font-medium">
//                               Наименование направление подготовки/специальности
//                             </label>
//                             <Field
//                               name={`programs.${idx}.name`}
//                               className="w-full border p-2"
//                             />
//                           </div>
//                           <div className="flex flex-col justify-start">
//                             <button
//                               onClick={() => {
//                                 setToRemoveIndex(idx);
//                                 setConfirmOpen(true);
//                               }}
//                               type="button"
//                               className="text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-400 cursor-pointer"
//                             >
//                               Удалить
//                             </button>
//                           </div>
//                           <ConfirmModal
//                             open={confirmOpen}
//                             title="Удалить программу?"
//                             description="Вы точно хотите удалить эту программу? Данные будут потеряны."
//                             confirmLabel="Удалить"
//                             cancelLabel="Отмена"
//                             onCancel={() => {
//                               setConfirmOpen(false);
//                               setToRemoveIndex(null);
//                             }}
//                             onConfirm={() => {
//                               if (toRemoveIndex !== null) {
//                                 remove(toRemoveIndex);
//                               }
//                               setConfirmOpen(false);
//                               setToRemoveIndex(null);
//                             }}
//                           />
//                         </div>

//                         <div className="grid grid-cols-4 gap-2 mt-2">
//                           {[1, 2, 3, 4].map((c) => (
//                             <div key={c}>
//                               <label>Курс {c} </label>
//                               <Field
//                                 type="number"
//                                 name={`programs.${idx}.courses.${c}.male`}
//                                 className="w-full border p-1"
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                     <div className="flex justify-between">
//                       <button
//                         type="button"
//                         onClick={() => push(initialValues.programs[0])}
//                         className="px-3 py-1  text-green-600 cursor-pointer"
//                       >
//                         <div className="flex gap-2">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             stroke-width="2"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             className="lucide lucide-plus-icon lucide-plus"
//                           >
//                             <path d="M5 12h14" />
//                             <path d="M12 5v14" />
//                           </svg>
//                           <p>Добавить направление</p>
//                         </div>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </FieldArray>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default Scholarship;
