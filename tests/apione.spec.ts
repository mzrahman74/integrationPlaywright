import { test, expect } from "@playwright/test";
import "dotenv/config";

test.describe.parallel("Api Testing", () => {
  const baseUrl = process.env.base_url;
  const api_key = process.env.api_key;

  test("list resource", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
  });
  test("single resource", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown/2`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
  });
  test("parsing body", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown/2`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.data.nmae).toEqual(undefined);
    expect(responseBody.data.id).toBe(2);
  });
  test("not found", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown/23`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    expect(response.status()).toBe(404);
  });
  test("register", async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
      data: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.id).toBe(4);
    expect(responseBody.token).toBeTruthy();
  });
  test("unregister", async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
      data: {
        email: "sydney@fife",
      },
    });
    expect(response.status()).toBe(400);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.error).toBe("Missing password");
  });
  test("{PUT request - replacement", async ({ request }) => {
    const response = await request.put(`${baseUrl}/user/2`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
      data: {
        id: 2,
        name: "fuch rose",
        year: 2002,
        color: "#C74375",
        pantone_value: "17-2032",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.updatedAt).toBeTruthy();
  });
});
