import { test, expect } from "@playwright/test";

test.describe.parallel("Api Testing", () => {
  const baseUrl = "https://reqres.in/api";

  test("list resource", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
  });
  test("single resource", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown/2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
  });
  test("parsing body", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown/2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.data.nmae).toEqual(undefined);
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.year).toBe(2001);
    expect(responseBody.data.color).toBe("#C74375");
    expect(responseBody.support.url).toEqual(
      "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral"
    );
    expect(responseBody.support.text).toEqual(
      "Tired of writing endless social media content? Let Content Caddy generate it for you."
    );
  });
  test("not found", async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown/23`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    expect(response.status()).toBe(404);
  });
  test("register", async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      data: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.id).toBe(4);
    expect(responseBody.token).toBeTruthy();
  });
  test("unregister", async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      headers: {
        "x-api-key": "reqres-free-v1",
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
        "x-api-key": "reqres-free-v1",
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
