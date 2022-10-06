import { describe, expect, it } from "vitest";
import storage from "./";

describe("suite", () => {
  it("serial test", async () => {
    const s = storage("x");
    s.set(1);
    expect(s.get()).toBe(1);
  });
});
