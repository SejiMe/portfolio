export type ProjectDateLike = {
  date?: Date;
  year?: number;
};

export function compareProjectsByDateOrYearDesc(
  a: ProjectDateLike,
  b: ProjectDateLike,
): number {
  if (a.date && b.date) {
    return b.date.getTime() - a.date.getTime();
  }

  const yearA = a.date?.getFullYear() ?? a.year ?? 0;
  const yearB = b.date?.getFullYear() ?? b.year ?? 0;
  return yearB - yearA;
}

export function formatProjectDateOrYear(
  project: ProjectDateLike,
  locale = "en-US",
): string {
  if (project.date) {
    return project.date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
    });
  }

  return String(project.year ?? "");
}