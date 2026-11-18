export function pageSize(width) {
  return width >= 1100 ? 4 : width >= 650 ? 2 : 1;
}

export function pageCount(total, size) {
  return Math.max(1, Math.ceil(total / size));
}

export function clampPage(page, total, size) {
  return Math.max(0, Math.min(pageCount(total, size) - 1, page));
}

export function regroupPage(page, oldSize, newSize, total) {
  return clampPage(Math.floor(page * oldSize / newSize), total, newSize);
}

export function compareEntries(a, b) {
  const dateA = a.data ?? a;
  const dateB = b.data ?? b;
  const yearA = dateA.date?.getFullYear() ?? dateA.year ?? -Infinity;
  const yearB = dateB.date?.getFullYear() ?? dateB.year ?? -Infinity;
  if (yearA !== yearB) return yearA > yearB ? -1 : 1;
  if (dateA.date && dateB.date && +dateA.date !== +dateB.date) return +dateB.date - +dateA.date;
  const nameA = String(a.slug ?? dateA.title ?? '');
  const nameB = String(b.slug ?? dateB.title ?? '');
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
}

export function formatEntryDate(entry, locale = 'en-US') {
  if (entry.date) return entry.date.toLocaleDateString(locale, {year:'numeric', month:'short'});
  return entry.year === undefined ? '' : String(entry.year);
}
