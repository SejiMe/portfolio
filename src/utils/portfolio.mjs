export const chapters = ['intro', 'work', 'about', 'writing', 'contact'];

export function chapterIndex(hash) {
  const id = hash.replace(/^#/, '');
  const aliases = { projects: 'work', blog: 'writing', home: 'intro' };
  return chapters.indexOf(Object.hasOwn(aliases, id) ? aliases[id] : id);
}

export function advance(index, delta) {
  return Math.max(0, Math.min(chapters.length - 1, index + Math.sign(delta)));
}

export function resolveTheme(saved, prefersDark) {
  return saved === 'dark' || saved === 'light' ? saved : prefersDark ? 'dark' : 'light';
}

export function splashEligible({ hash, reduced, historyReturn, storage }) {
  if (hash || reduced || historyReturn) return false;
  try {
    if (storage.getItem('sej:intro')) return false;
    storage.setItem('sej:probe', '1');
    storage.removeItem('sej:probe');
    return true;
  } catch {
    return false;
  }
}
