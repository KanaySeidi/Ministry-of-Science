import type { Univ } from "@/utils/Universitets";

export type Submission = {
  id: string;
  univKey: string;
  filledAt: string;
  answers: Record<string, any>;
};

const KEY_UNIVS = "app_univs_v1";
const KEY_SUBMISSIONS = "app_submissions_v1";

export function initUnivs(univs: Univ[]) {
  if (!localStorage.getItem(KEY_UNIVS)) {
    localStorage.setItem(KEY_UNIVS, JSON.stringify(univs));
  }
}

export function getUnivs(): Univ[] {
  const raw = localStorage.getItem(KEY_UNIVS);
  return raw ? JSON.parse(raw) : [];
}

export function getSubmissions(): Submission[] {
  const raw = localStorage.getItem(KEY_SUBMISSIONS);
  return raw ? JSON.parse(raw) : [];
}

export function saveSubmission(sub: Submission) {
  const arr = getSubmissions();
  const idx = arr.findIndex((s) => s.id === sub.id);
  if (idx >= 0) arr[idx] = sub;
  else arr.push(sub);
  localStorage.setItem(KEY_SUBMISSIONS, JSON.stringify(arr));
}

export function addSubmissionFor(
  univKey: string,
  answers: Record<string, any>
) {
  const sub: Submission = {
    id: crypto.randomUUID(),
    univKey,
    filledAt: new Date().toISOString(),
    answers,
  };
  saveSubmission(sub);
  return sub;
}

export function exportSubmissionsCSV(): string {
  const subs = getSubmissions();
  if (subs.length === 0) return "";

  const rows = subs.map((s) => ({
    id: s.id,
    univKey: s.univKey,
    filledAt: s.filledAt,
    answers: JSON.stringify(s.answers).replace(/"/g, '""'),
  }));
  const header = ["id", "univKey", "filledAt", "answers"];
  const csv = [header.join(",")]
    .concat(
      rows.map((r) => `${r.id},${r.univKey},${r.filledAt},"${r.answers}"`)
    )
    .join("\n");
  return csv;
}

export function downloadCSV(filename = "submissions.csv") {
  const csv = exportSubmissionsCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
