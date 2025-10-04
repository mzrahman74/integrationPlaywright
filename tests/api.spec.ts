import { test, expect } from "@playwright/test";

test.describe.parallel("Api Testing", () => {
  const baseUrl = "https://reqres.in/api";

  test("Simple api test", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users`, {
      params: {
        page: 2,
      },
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
  });

  test("non existing endpoint", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/23`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    expect(response.status()).toBe(404);
  });

  test("parsing body", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.name).toEqual("fuchsia rose");
    expect(responseBody.data.year).toEqual(2001);
    expect(responseBody.data.color).toEqual("#C74375");
    expect(responseBody.support.url).toEqual(
      "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral"
    );
  });

  test("parsing body for support url & text", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.support.url).toEqual(
      "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral"
    );
    expect(responseBody.support.text).toEqual(
      "Tired of writing endless social media content? Let Content Caddy generate it for you."
    );
  });

  test("POST request - login", async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
  });

  test("POST request - login unsuccessful", async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      data: {
        email: "peter@klaven",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe("Missing password");
  });

  test("PUT request - update", async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      data: {
        name: "morpheus",
        job: "zion",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.updatedAt).toBeTruthy();
  });

  test("PATCH request - update specific", async ({ request }) => {
    const response = await request.patch(`${baseUrl}/users/2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      data: {
        name: "mohammad",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.updatedAt).toBeTruthy();
  });

  test("delete request - ", async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    expect(response.status()).toBe(204);
  });
});
