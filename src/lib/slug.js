import slugify from "slugify";
import { nanoid } from "nanoid";

export function makeSlug(title) {
  const base = slugify(title || "wallpaper", { lower: true, strict: true, trim: true });
  const suffix = nanoid(6).toLowerCase();
  return `${base}-${suffix}`;
}

export function newId() {
  return nanoid(12);
}
