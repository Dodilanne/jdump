import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createDump } from "./lib/create-dump";
import { defaultLocation } from "./lib/defaults";
import type { Json, Storage } from "./lib/types";

export const nodeStorage: Storage = {
  write(json: Json, path: string): void {
    writeFileSync(path, JSON.stringify(json));
  },
  read(path: string): Json {
    if (!existsSync(path)) {
      return {};
    }
    try {
      const res = readFileSync(path, { encoding: "utf8" });
      return JSON.parse(res);
    } catch {
      return {};
    }
  },
  clear(path: string): void {
    if (existsSync(path)) {
      rmSync(path);
    }
  },
};

export const dump = createDump({
  storage: nodeStorage,
  location: defaultLocation,
});
