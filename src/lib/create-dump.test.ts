import { expect, test, vi } from "vitest";
import { createDump } from "./create-dump";
import type { Json, Location, Storage } from "./types";

test("createDump", () => {
  let data: Json = { a: true };
  const storage: Storage = {
    write: vi.fn((json: unknown) => {
      data = json;
    }),
    read: vi.fn(() => {
      return data;
    }),
    clear: vi.fn(() => {
      data = undefined;
    }),
  };
  const location: Location = {
    path: __dirname,
    file: "dump.json",
  };
  const dump = createDump({ storage, location });
  expect(dump.read()).toBe(data);
  const updated = { b: false };
  dump.write(updated);
  expect(dump.read()).toBe(updated);
  dump.clear();
  expect(dump.read()).toBe(undefined);
});
