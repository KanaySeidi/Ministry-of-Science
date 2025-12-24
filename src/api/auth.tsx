// src/utils/auth.ts
import bcrypt from "bcryptjs";
import { UNIVERSITIES, type Univ } from "@/utils/Universitets";

const SESSION_KEY = "currentUnivKey";
const SESSION_ID = "currentUnivId";

export function findUnivByKey(key: string): Univ | undefined {
  return UNIVERSITIES.find((u) => u.key.toLowerCase() === key.toLowerCase());
}

export function authenticate(
  key: string,
  password: string
): { ok: boolean; message?: string; univ?: Univ } {
  const u = findUnivByKey(key);
  if (!u) return { ok: false, message: "Логин не найден" };

  if (!("passwordHash" in u)) {
    return {
      ok: false,
      message: "Нет passwordHash у юнита (проверь universities.ts)",
    };
  }

  try {
    const match = bcrypt.compareSync(password, u.passwordHash);
    if (!match) return { ok: false, message: "Неверный пароль" };

    sessionStorage.setItem(SESSION_KEY, u.key);
    sessionStorage.setItem(SESSION_ID, String(u.id));
    return { ok: true, univ: u };
  } catch (err) {
    return {
      ok: false,
      message: "Ошибка сравнения пароля: " + (err as Error).message,
    };
  }
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_ID);
}

export function currentUnivKey(): string | null {
  return sessionStorage.getItem(SESSION_KEY);
}

export function currentUnivId(): number | null {
  const v = sessionStorage.getItem(SESSION_ID);
  return v ? Number(v) : null;
}
