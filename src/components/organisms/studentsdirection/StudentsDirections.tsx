import { DIRECTIONS } from "@/utils/direction";
import { useStudentDirectionStore } from "@/store/useStudents";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ForeignStudents from "../foreignStudents/ForeignStudents";

export default function StudentDirectionPage() {
  const {
    direction,
    selectedCourse,
    coursesByLevel,
    setDirectionCode,
    setLevel,
    setSelectedCourse,
    updateCourse,
    reset,
  } = useStudentDirectionStore();

  const { t } = useTranslation();
  const [activeForm, setActiveForm] = useState<
    "fullTime" | "distance" | "evening" | "studentsTotal"
  >("fullTime");

  const level = direction.level;
  const currentCourse = level && coursesByLevel[level][selectedCourse];

  const inputValue = (v: number) => (v === 0 ? "" : v);

  const handleCodeChange = (code: string) => {
    const found = DIRECTIONS.find((d) => d.code === code);
    setDirectionCode(code, found?.name || "");
  };

  const handleSubmit = () => {
    if (!direction.level) return;

    const payload = {
      direction,
      courses: coursesByLevel[direction.level],
    };

    console.log("SUBMIT PAYLOAD", payload);
    alert("Данные отправлены (см. консоль)");
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h4 className="font-medium text-sinii">
        {t("studentDirection.educationForm")}
      </h4>

      <div className="flex gap-2">
        {[
          ["fullTime", t("studentDirection.fullTime")],
          ["distance", t("studentDirection.distance")],
          ["evening", t("studentDirection.evening")],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveForm(key as any)}
            className={`px-4 py-1 border rounded ${
              activeForm === key ? "bg-sinii text-white" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="border p-4 rounded space-y-3">
        <input
          placeholder={t("studentDirection.codePlaceholder")}
          className="border p-2 w-full"
          value={direction.code}
          onChange={(e) => handleCodeChange(e.target.value)}
        />

        {direction.name && (
          <p className="font-medium text-sinii">{direction.name}</p>
        )}

        <div className="flex gap-6">
          <label className="flex gap-2 items-center">
            <input
              type="radio"
              checked={direction.level === "bachelor"}
              onChange={() => setLevel("bachelor")}
            />
            {t("studentDirection.bachelor")}
          </label>

          <label className="flex gap-2 items-center">
            <input
              type="radio"
              checked={direction.level === "master"}
              onChange={() => setLevel("master")}
            />
            {t("studentDirection.master")}
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelectedCourse(c as any)}
            className={`px-3 py-1 border rounded placeholder:text-gray-400 ${
              selectedCourse === c ? "bg-sinii text-white" : ""
            }`}
          >
            {c} курс
          </button>
        ))}
      </div>
      <div>
        {level && currentCourse && (
          <div className="border p-4 rounded space-y-3">
            <div>
              <label>{t("studentDirection.group")}</label>
              <input
                type="number"
                className="border p-1 w-full"
                value={inputValue(currentCourse.studentsTotal.group)}
                onChange={(e) =>
                  updateCourse(
                    level,
                    selectedCourse,
                    "studentsTotal",
                    "group",
                    Number(e.target.value || 0)
                  )
                }
              />
            </div>

            <div>
              <label>{t("studentDirection.courseCount")}</label>
              <input
                type="number"
                className="border p-1 w-full"
                value={inputValue(currentCourse.studentsTotal.total)}
                onChange={(e) =>
                  updateCourse(
                    level,
                    selectedCourse,
                    "studentsTotal",
                    "total",
                    Number(e.target.value || 0)
                  )
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>{t("studentDirection.male")}</label>
                <input
                  type="number"
                  className="border p-1 w-full"
                  value={inputValue(currentCourse.studentsTotal.male)}
                  onChange={(e) =>
                    updateCourse(
                      level,
                      selectedCourse,
                      "studentsTotal",
                      "male",
                      Number(e.target.value || 0)
                    )
                  }
                />
              </div>

              <div>
                <label>{t("studentDirection.female")}</label>
                <input
                  type="number"
                  className="border p-1 w-full"
                  value={inputValue(currentCourse.studentsTotal.female)}
                  onChange={(e) =>
                    updateCourse(
                      level,
                      selectedCourse,
                      "studentsTotal",
                      "female",
                      Number(e.target.value || 0)
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {level && currentCourse && (
        <>
          <div className="border p-4 rounded space-y-4">
            <div className="flex flex-col gap-1.5">
              <label>{t("studentDirection.grant")}</label>
              <input
                type="number"
                placeholder={t("studentDirection.amountPlaceholder")}
                className="border p-1 w-full placeholder:text-gray-400"
                value={inputValue(currentCourse.education.grantCount)}
                onChange={(e) =>
                  updateCourse(
                    level,
                    selectedCourse,
                    "education",
                    "grantCount",
                    e.target.value === "" ? 0 : Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label>{t("studentDirection.contract")}</label>
                <input
                  type="number"
                  placeholder={t("studentDirection.amountPlaceholder")}
                  className="border p-1 w-full placeholder:text-gray-400"
                  value={inputValue(currentCourse.education.contractCount)}
                  onChange={(e) =>
                    updateCourse(
                      level,
                      selectedCourse,
                      "education",
                      "contractCount",
                      e.target.value === "" ? 0 : Number(e.target.value)
                    )
                  }
                />
              </div>

              <div>
                <label>{t("studentDirection.contractPrice")}</label>
                <input
                  type="number"
                  placeholder={t("studentDirection.pricePlaceholder")}
                  className="border p-1 w-full placeholder:text-gray-400"
                  value={inputValue(currentCourse.education.contractPrice)}
                  onChange={(e) =>
                    updateCourse(
                      level,
                      selectedCourse,
                      "education",
                      "contractPrice",
                      e.target.value === "" ? 0 : Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="border p-4 rounded space-y-4">
            <h3 className="font-semibold">{t("studentDirection.living")}</h3>

            {[
              ["dormitory", t("studentDirection.dormitory")],
              ["rent", t("studentDirection.rent")],
            ].map(([key, label]) => (
              <div key={key}>
                <label>{label}</label>
                <input
                  type="number"
                  placeholder={t("studentDirection.amountPlaceholder")}
                  className="border p-1 w-full placeholder:text-gray-400"
                  value={inputValue((currentCourse.living as any)[key])}
                  onChange={(e) =>
                    updateCourse(
                      level,
                      selectedCourse,
                      "living",
                      key,
                      e.target.value === "" ? 0 : Number(e.target.value)
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div>
            {level && <ForeignStudents level={level} course={selectedCourse} />}
          </div>

          <div className="border p-4 rounded space-y-4">
            <h4 className="font-semibold">{t("studentDirection.social")}</h4>

            <div className="flex flex-col gap-5">
              {/* Сироты */}
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sinii">
                  {t("studentDirection.orphans")}
                </p>
                <div className="space-y-2 flex gap-5">
                  <div>
                    <label>{t("studentDirection.total")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.orphansCount)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "orphansCount",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div>
                    <label>{t("studentDirection.male")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.orphansMale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "orphansMale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div>
                    <label>{t("studentDirection.female")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.orphansFemale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "orphansFemale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* ЛОВЗ */}
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sinii">
                  {t("studentDirection.lovz")}
                </p>

                <div className="flex gap-5">
                  <div>
                    <label>{t("studentDirection.total")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.lovzCount)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "lovzCount",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.male")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.lovzMale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "lovzMale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.female")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.lovzFemale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "lovzFemale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Этнические кыргызы */}
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sinii">
                  {t("studentDirection.ethnic")}
                </p>

                <div className="flex gap-5">
                  <div>
                    <label>{t("studentDirection.total")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.ethnicKyrgyzCount)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "ethnicKyrgyzCount",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.male")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.ethnicKyrgyzMale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "ethnicKyrgyzMale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.female")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(
                        currentCourse.social.ethnicKyrgyzFemale
                      )}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "ethnicKyrgyzFemale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Алайские события */}
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sinii">
                  {t("studentDirection.alayEvent")}
                </p>

                <div className="flex gap-5">
                  <div>
                    <label>{t("studentDirection.total")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.alayEventCount)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "alayEventCount",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.male")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.alayEventMale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "alayEventMale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.female")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.alayEventFemale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "alayEventFemale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Золотые сертификаты */}
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sinii">
                  {t("studentDirection.goldenCertificate")}
                </p>

                <div className="flex gap-5">
                  <div>
                    <label>{t("studentDirection.total")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(
                        currentCourse.social.goldenCertificateMale
                      )}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "goldenCertificateMale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.male")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(
                        currentCourse.social.goldenCertificateMale
                      )}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "goldenCertificateMale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.female")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(
                        currentCourse.social.goldenCertificateFemale
                      )}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "goldenCertificateFemale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Из бюджета другиз государств */}
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sinii">
                  {t("studentDirection.foreignBudget")}
                </p>

                <div className="flex gap-5">
                  <div>
                    <label>{t("studentDirection.total")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(
                        currentCourse.social.foreignBudgetCount
                      )}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "foreignBudgetCount",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.male")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(currentCourse.social.foreignBudgetMale)}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "foreignBudgetMale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>{t("studentDirection.female")}</label>
                    <input
                      type="number"
                      placeholder={t("studentDirection.amountPlaceholder")}
                      className="border p-1 w-full placeholder:text-gray-400"
                      value={inputValue(
                        currentCourse.social.foreignBudgetFemale
                      )}
                      onChange={(e) =>
                        updateCourse(
                          level,
                          selectedCourse,
                          "social",
                          "foreignBudgetFemale",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <div className="border p-4 rounded space-y-2">
              <h3 className="font-semibold">
                {t("studentDirection.graduates")}
              </h3>

              <label>{t("studentDirection.graduates_2024_2025")}</label>

              <input
                type="number"
                placeholder={t("studentDirection.amountPlaceholder")}
                className="border p-1 w-full placeholder:text-gray-400"
                value={inputValue(currentCourse.graduates.count_2024_2025)}
                onChange={(e) =>
                  updateCourse(
                    level,
                    selectedCourse,
                    "graduates",
                    "count_2024_2025",
                    e.target.value === "" ? 0 : Number(e.target.value)
                  )
                }
              />
            </div>
          </div> */}
        </>
      )}

      <button
        disabled={!direction.level || !direction.code}
        onClick={handleSubmit}
        className="bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
      >
        {t("studentDirection.submit")}
      </button>
    </div>
  );
}
