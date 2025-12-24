import { Formik, Form } from "formik";
import { useState } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import StudentBody from "@/components/organisms/studentbody/StudentBody";
import MTB from "@/components/organisms/MTB/MTB";
import ForeignStudents from "@/components/organisms/foreignStudents/ForeignStudents";
import Scholarship from "@/components/molecules/scholarship/Scholarship";
import { initialValues } from "@/types";
import StudentDirectionPage from "../studentsdirection/StudentsDirections";

const steps = ["Студенты", "Иностранные студенты", "По стипендиям", "МТБ"];

export default function InfoTable() {
  const [step, setStep] = useState(0);

  return (
    // <Formik initialValues={initialValues} onSubmit={(v) => console.log(v)}>
    //   {({ values }) => (
    //     <Form className="max-w-4xl mx-auto p-6">
    //       <ProgressBar step={step} steps={steps} />

    //       {step === 0 && <StudentBody values={values} />}
    //       {step === 1 && <ForeignStudents values={values} />}
    //       {step === 2 && <Scholarship values={values} />}
    //       {step === 3 && <MTB />}

    //       <div className="flex justify-between mt-6">
    //         {step > 0 && (
    //           <button
    //             type="button"
    //             onClick={() => setStep(step - 1)}
    //             className="px-4 py-2 border text-white rounded-md bg-sinii hover:bg-sinii/80 cursor-pointer"
    //           >
    //             Назад
    //           </button>
    //         )}

    //         {step < steps.length - 1 ? (
    //           <button
    //             type="button"
    //             onClick={() => setStep(step + 1)}
    //             className="px-4 py-2 bg-sinii text-white rounded-md hover:bg-sinii/80 cursor-pointer"
    //           >
    //             Далее
    //           </button>
    //         ) : (
    //           <button
    //             type="submit"
    //             className="px-4 py-2 bg-green-600 text-white rounded"
    //           >
    //             Отправить
    //           </button>
    //         )}
    //       </div>
    //     </Form>
    //   )}
    // </Formik>
    <StudentDirectionPage />
  );
}
