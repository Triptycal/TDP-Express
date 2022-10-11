const {sum} = require("../maths");
const {expct, expect} = require("chai");

describe("maths tests", () => {
    it("should equal 2", () => {
        expect(sum(1,1)).to.equal(2);
    })
    it("should FAIL", () => {
        expect(sum(1,1)).to.equal(3);
    })
}
)