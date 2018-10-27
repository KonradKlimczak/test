import * as assert from "assert";
import { App } from "../src/App";

describe("App", function() {
  describe("Cube solver", function() {
    it("should return 1, which is the simples solution", () => {
      const expected = 1;
      console.time("should return 1, which is the simples solution");
      const result = App(1, 1, 1, 1);
      console.timeEnd("should return 1, which is the simples solution");

      assert.equal(result, expected, "OMG IT FAILS IN the simplest case possible!");
    });

    it("should return 1000 for 10 10 10 2000", () => {
      const expected = 1000;
      
      console.time("should return 1000 for 10 10 10 2000");
      const result = App(10, 10, 10, 2000);
      console.timeEnd("should return 1000 for 10 10 10 2000");
      assert.equal(result, expected, `Returned ${result} instead of ${expected}.`);
    });

    it("should return -1 for 10 10 10 900", () => {
      const expected = -1;
      const result = App(10, 10, 10, 900);
      assert.equal(result, expected, `Returned ${result} instead of ${expected}.`);
    });

    it("should return 50 for 5 5 5 61 7 1", () => {
      const expected = 50;
      const result = App(5, 5, 5, 61, 7, 1);
      assert.equal(result, expected, `Returned ${result} instead of ${expected}.`);
    });

    it("should return -1 for 4 4 8 10 10 1", () => {
      const expected = -1;
      const result = App(4, 4, 8, 10, 10, 1);
      assert.equal(result, expected, `Returned ${result} instead of ${expected}.`);
    });

    it("should return 9 for 1 1 9 9 1", () => {
      const expected = 9;
      const result = App(1, 1, 9, 9, 1);
      assert.equal(result, expected, `Returned ${result} instead of ${expected}.`);
    });

    it("should solve really hard example", () => {
      const expected = 50070;
      const result = App(1000, 1000, 1000, 0, 0, 0, 46501, 0, 2791, 631, 127, 19, 1);
      assert.equal(result, expected, `Returned ${result} instead of ${expected}.`);
    });
  });
});
