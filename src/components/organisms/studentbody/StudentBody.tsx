import { Formik, FieldArray, Field, Form } from "formik";
import { useState } from "react";
import ConfirmModal from "@/components/organisms/confirmModal/ConfirmModal";
import { initialValues, type Values } from "@/types";

type Props = {
  values: Values;
};

function StudentBody({ values }: Props) {
  const handleSubmit = (values: Values) => {
    console.log("SUBMIT", values);
    alert("Данные подготовлены (см. консоль)");
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toRemoveIndex, setToRemoveIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="space-y-6">
            <FieldArray name="programs">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <h2 className="font-semibold">Студенты</h2>
                  {values.programs.map((p, idx) => (
                    <div key={idx} className="p-4 border rounded">
                      <div className="flex gap-2">
                        <div className="w-full">
                          <label className="text-sinii font-medium">
                            Наименование направление подготовки/специальности
                          </label>
                          <Field
                            name={`programs.${idx}.name`}
                            className="w-full border p-2"
                          />
                        </div>
                        <div className="flex flex-col justify-start">
                          <button
                            onClick={() => {
                              setToRemoveIndex(idx);
                              setConfirmOpen(true);
                            }}
                            type="button"
                            className="text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-400 cursor-pointer"
                          >
                            Удалить
                          </button>
                        </div>
                        <ConfirmModal
                          open={confirmOpen}
                          title="Удалить программу?"
                          description="Вы точно хотите удалить эту программу? Данные будут потеряны."
                          confirmLabel="Удалить"
                          cancelLabel="Отмена"
                          onCancel={() => {
                            setConfirmOpen(false);
                            setToRemoveIndex(null);
                          }}
                          onConfirm={() => {
                            if (toRemoveIndex !== null) {
                              remove(toRemoveIndex);
                            }
                            setConfirmOpen(false);
                            setToRemoveIndex(null);
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {[1, 2, 3, 4].map((c) => (
                          <div key={c}>
                            <label>Курс {c} </label>
                            <Field
                              type="number"
                              name={`programs.${idx}.courses.${c}.male`}
                              className="w-full border p-1"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 grid items-start gap-x-2">
                        <div className="grid grid-cols-2 gap-x-2">
                          <div>
                            <label>Грант</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.grant_count`}
                              className="w-full border p-1 mt-6"
                            />
                          </div>
                          <div>
                            <label>За счет бюджетов других государств</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.foreign_budget_count`}
                              className="w-full border p-1"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 mt-5 gap-x-2">
                          <div>
                            <label>Контракт</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.contract_count`}
                              className="w-full border p-1"
                            />
                          </div>
                          <div>
                            <label>Стоимость контракта</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.contract_price`}
                              className="w-full border p-1"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-sinii font-medium py-2">Из них</p>
                        <div className="grid grid-cols-5 items-start gap-x-2">
                          <div>
                            <label>Очное (М)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.full_time_edu.male`}
                              className="w-full border p-1"
                            />
                            <label>Очное (Ж)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.full_time_edu.female`}
                              className="w-full border p-1"
                            />
                          </div>
                          <div>
                            <label>Заочное (М)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.distance_edu.male`}
                              className="w-full border p-1"
                            />
                            <label>Заочное (Ж)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.distance_edu.female`}
                              className="w-full border p-1"
                            />
                          </div>
                          <div>
                            <label>Вечерное (М)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.evening_edu.male`}
                              className="w-full border p-1"
                            />
                            <label>Вечерное (Ж)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.evening_edu.female`}
                              className="w-full border p-1"
                            />
                          </div>
                          <div>
                            <label>Сироты (М)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.courses.male`}
                              className="w-full border p-1"
                            />
                            <label>Сироты (Ж)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.courses.female`}
                              className="w-full border p-1"
                            />
                          </div>
                          <div>
                            <label>ЛОВЗ (М)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.courses.male`}
                              className="w-full border p-1"
                            />
                            <label>ЛОВЗ (Ж)</label>
                            <Field
                              type="number"
                              name={`programs.${idx}.courses.female`}
                              className="w-full border p-1"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <label>
                            количество выпускников за 2024 - 2025 учебный год
                          </label>
                          <Field
                            type="number"
                            name={`programs.${idx}.graduates_2024_2025`}
                            className="w-full border p-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => push(initialValues.programs[0])}
                      className="px-3 py-1  text-green-600 cursor-pointer"
                    >
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus-icon lucide-plus"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        <p>Добавить направление</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentBody;
