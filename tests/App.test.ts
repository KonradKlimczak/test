import assert = require("assert");
import { App } from "../src";

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("App", function() {
  describe("Cube solver", function() {
    it("should return 3, which is the simples solution", () => {
      const expected = 3;
      const result = App(1, 1, 1, 3);
      assert.equal(
        result,
        expected,
        "OMG IT FAILS IN the simplest case possible!"
      );
    });
  });
});
