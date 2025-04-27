export type Json = unknown;

export type Storage = {
  write(json: Json, path: string): void;
  read(path: string): Json;
  clear(path: string): void;
};

export type Location = string | { path: string; file: string };

export type Options = {
  location: Location;
  storage: Storage;
};

export type Dump = {
  (json: Json): void;
  write(json: Json): void;
  read(): unknown;
  clear(): void;
};
