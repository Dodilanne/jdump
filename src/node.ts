import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { joinLocationPath } from "./lib/join-location-path";
import type { Dump, Json, Location, Storage } from "./lib/types";

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

function isFileStackLine(line: string) {
  return line.includes("file:") || line.includes("/") || line.includes("\\");
}

export function getDefaultPath(): string {
  const err = new Error();
  console.log("stack", (err.stack ?? "").split("\n"));
  const line = (err.stack || "").split("\n").filter(isFileStackLine).at(-1);
  if (line?.length) {
    const match = line.match(/\((.*):\d+:\d+\)/) || line.match(/at (.*):\d+:\d+/);
    if (match?.[1]) {
      const callerPath = match[1];
      return callerPath.substring(0, callerPath.lastIndexOf("/")).replace("file://", "");
    }
  }
  throw new Error("Failed to retrieve caller location.");
}

function getDefaultLocation(): Location {
  return {
    path: getDefaultPath(),
    file: "dump.json",
  };
}

export const dump: Dump = (json: Json) => {
  const path = joinLocationPath(getDefaultLocation());
  return nodeStorage.write(json, path);
};
dump.write = (json: Json) => {
  const path = joinLocationPath(getDefaultLocation());
  return nodeStorage.write(json, path);
};
dump.read = () => {
  const path = joinLocationPath(getDefaultLocation());
  return nodeStorage.read(path);
};
dump.clear = () => {
  const path = joinLocationPath(getDefaultLocation());
  return nodeStorage.clear(path);
};
