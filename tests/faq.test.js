const request = require("supertest");
const app = require("../server");

describe("FAQ API Tests", () => {
  it("should create an FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({ question: "What is Node.js?", answer: "A runtime for JavaScript." });

    expect(res.statusCode).toEqual(201);
    expect(res.body.faq).toHaveProperty("_id");
  });

  it("should fetch FAQs", async () => {
    const res = await request(app).get("/api/faqs?lang=hi");
    expect(res.statusCode).toEqual(200);
  });
});
