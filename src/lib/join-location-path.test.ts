import { expect, test } from "vitest";
import { joinLocationPath } from "./join-location-path";

test("joinLocationPath", () => {
  expect(joinLocationPath({ path: "", file: "" })).toBe("/");
  expect(joinLocationPath({ path: "./a/b/", file: "/c" })).toBe("./a/b/c");
  expect(joinLocationPath({ path: "./a/b", file: "/c" })).toBe("./a/b/c");
  expect(joinLocationPath({ path: "./a/b", file: "c" })).toBe("./a/b/c");
  expect(joinLocationPath({ path: "./a/b", file: "/c" })).toBe("./a/b/c");
});
