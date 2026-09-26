// __tests__/lead.test.js
import "dotenv/config";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import Lead from "../src/models/lead.model.js";

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await Lead.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/leads", () => {
  it("should create a lead with valid data", async () => {
    const newLead = {
      name: "Test User",
      email: "testuser@example.com",
      phone: "9876543210",
    };
    const response = await request(app).post("/api/leads").send(newLead);

    expect(response.status).toBe(201);
    expect(response.body.lead.name).toBe(newLead.name);
    expect(response.body.lead.email).toBe(newLead.email);
    expect(response.body.lead.status).toBe("new");
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/leads")
      .send({ name: "Only Name" });

    expect(response.status).toBe(400);
  });

  it("should return 409 if email already exists", async () => {
    const lead = {
      name: "Dup User",
      email: "dup@example.com",
      phone: "1112223333",
    };
    await request(app).post("/api/leads").send(lead);

    const response = await request(app)
      .post("/api/leads")
      .send({ ...lead, phone: "4445556666" });

    expect(response.status).toBe(409);
  });
});

describe("GET /api/leads", () => {
  it("should return all leads when no search param is given", async () => {
    await Lead.create({
      name: "Alice",
      email: "alice@example.com",
      phone: "1111111111",
    });
    await Lead.create({
      name: "Bob",
      email: "bob@example.com",
      phone: "2222222222",
    });

    const response = await request(app).get("/api/leads");

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(2);
  });

  it("should return filtered leads when search matches", async () => {
    await Lead.create({
      name: "Charlie",
      email: "charlie@example.com",
      phone: "3333333333",
    });
    await Lead.create({
      name: "Dana",
      email: "dana@example.com",
      phone: "4444444444",
    });

    const response = await request(app).get("/api/leads?search=charlie");

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.data[0].name).toBe("Charlie");
  });

  it("should return an empty array when search matches nothing", async () => {
    const response = await request(app).get("/api/leads?search=nonexistentxyz");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
});

describe("PATCH /api/leads/:id/status", () => {
  it("should update status on a valid request", async () => {
    const lead = await Lead.create({
      name: "Eve",
      email: "eve@example.com",
      phone: "5555555555",
    });

    const response = await request(app)
      .patch(`/api/leads/${lead._id}/status`)
      .send({ status: "contacted" });

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("contacted");
  });

  it("should return 400 for an invalid status value", async () => {
    const lead = await Lead.create({
      name: "Frank",
      email: "frank@example.com",
      phone: "6666666666",
    });

    const response = await request(app)
      .patch(`/api/leads/${lead._id}/status`)
      .send({ status: "banana" });

    expect(response.status).toBe(400);
  });

  it("should return 404 for a nonexistent id", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .patch(`/api/leads/${fakeId}/status`)
      .send({ status: "contacted" });

    expect(response.status).toBe(404);
  });

  it("should return 400 for a malformed id", async () => {
    const response = await request(app)
      .patch("/api/leads/123/status")
      .send({ status: "contacted" });

    expect(response.status).toBe(400);
  });
});
