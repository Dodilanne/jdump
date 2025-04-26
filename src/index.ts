export type Json = unknown;

export type Storage = {
  write(json: Json, location: Location): void;
  read(location: Location): Json;
  clear(location: Location): void;
};

export type Location = {
  path: string;
  file: string;
};

export type Options = {
  location: Location;
  storage: Storage;
};

export function createDump({ location, storage }: Options) {
  const dump = (json: Json) => storage.write(json, location);
  dump.write = (json: Json) => storage.write(json, location);
  dump.read = () => storage.read(location);
  dump.clear = () => storage.clear(location);
  return dump;
}
