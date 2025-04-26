import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createDump } from "./lib/create-dump";
import type { Json, Storage } from "./lib/types";

export const nodeStorage: Storage = {
  write(json: Json, path: string): void {
    writeFileSync(path, JSON.stringify(json));
  },
  read(path: string): Json {
    const res = readFileSync(path, { encoding: "utf8" });
    return JSON.parse(res);
  },
  clear(path: string): void {
    if (existsSync(path)) {
      rmSync(path);
    }
  },
};

export const DEFAULT_FILE = "dump.json";

export const dump = createDump({
  storage: nodeStorage,
  location: {
    path: __dirname,
    file: DEFAULT_FILE,
  },
});
