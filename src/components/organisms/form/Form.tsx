import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLogin } from "@/hooks/useLogin";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useLogin();

  const initialValues = { username: "", password: "" };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    if (!values.username.trim()) errors.username = "Введите логин";
    if (!values.password.trim()) errors.password = "Введите пароль";
    return errors;
  };

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      await login(values.username, values.password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-white">Вход в систему</h2>

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
                name="username"
                className="w-full px-3 py-3 bg-white rounded-md font-medium placeholder:font-normal"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Field
                placeholder="Пароль"
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-3 bg-white rounded-md font-medium placeholder:font-normal"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="w-40 bg-white rounded-md"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty || loading}
              className="w-full py-2 bg-indigo-600 text-white rounded"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
