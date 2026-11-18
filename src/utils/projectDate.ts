export { formatEntryDate as formatProjectDateOrYear } from './gallery.mjs';
import {compareEntries} from './gallery.mjs';
export type ProjectDateLike = {date?: Date; year?: number; title?: string};
export function compareProjectsByDateOrYearDesc(a: ProjectDateLike, b: ProjectDateLike): number {
  return compareEntries(a,b);
}
