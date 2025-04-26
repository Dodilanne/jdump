import { joinLocationPath } from "./join-location-path";
import type { Json, Options } from "./types";

export function createDump({ location, storage }: Options) {
  const path = joinLocationPath(location);
  const dump = (json: Json) => storage.write(json, path);
  dump.write = (json: Json) => storage.write(json, path);
  dump.read = () => storage.read(path);
  dump.clear = () => storage.clear(path);
  return dump;
}
