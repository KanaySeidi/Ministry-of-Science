// src/components/LoginForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { authenticate } from "@/api/auth";
import { initUnivs } from "@/utils/storage";
import { UNIVERSITIES } from "@/utils/Universitets";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    initUnivs(UNIVERSITIES);
  }, []);

  const initialValues = { login: "", password: "" };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    if (!values.login.trim()) errors.login = "Введите логин";
    if (!values.password.trim()) errors.password = "Введите пароль";
    return errors;
  };

  const onSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    setApiError(null);
    const res = authenticate(values.login, values.password);
    if (res.ok && res.univ) {
      navigate(`/info/${res.univ.id}`);
    } else {
      setApiError(res.message ?? "Ошибка");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Введите данные ВУЗа
      </h2>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-4">
            <div>
              <Field
                placeholder="Логин"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-white text-sinii rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name="login"
              />
              <div className="text-red-400 text-sm mt-1">
                <ErrorMessage name="login" />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Field
                placeholder="Пароль"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-white text-sinii rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="w-32 px-1 bg-white text-sinii rounded-md cursor-pointer hover:bg-white/80"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>

            {apiError && <div className="text-red-600">{apiError}</div>}

            <button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className={`w-full py-2 rounded text-white ${
                isSubmitting || !isValid || !dirty
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Отправка..." : "Войти"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
