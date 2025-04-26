import type { Location } from "./types";

export function joinLocationPath(location: Location): string {
  if (typeof location === "string") {
    return location;
  }
  const path = location.path.endsWith("/") ? location.path.slice(0, -1) : location.path;
  const file = location.file.startsWith("/") ? location.file.slice(1) : location.file;
  return `${path}/${file}`;
}
