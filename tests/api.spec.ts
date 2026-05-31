import { test, expect } from "@playwright/test";
import "dotenv/config";

test.describe.parallel("@api Testing", () => {
  const baseUrl = process.env.base_url;
  const api_key = process.env.api_key;

  test("simple api test", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users`, {
      params: {
        page: 1,
      },
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
  });

  test("non existing endpoint", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/23`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    expect(response.status()).toBe(404);
  });

  test("parsing body", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.avatar).toBeTruthy();
  });

  test("parsing body for support url & text", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.support.url).toEqual(
      "https://benhowdle.im/first-cto-playbook?utm_source=reqres&utm_medium=json&utm_campaign=referral",
    );
    expect(responseBody.support.text).toEqual(
      "Become a better CTO. A playbook of painful stories and practical advice from a two-time startup CTO.",
    );
  });

  test("POST request - login", async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      headers: {
        "x-api-key": `${api_key}`,
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
        "x-api-key": `${api_key}`,
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
        "x-api-key": `${api_key}`,
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
        "x-api-key": `${api_key}`,
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
    const response = await request.delete(`${baseUrl}/users/7`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    expect(response.status()).toBe(204);
  });

  test("get request for user 5", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/5`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(5);
    expect(responseBody._meta.upgrade_url).toBe(
      "https://app.reqres.in/upgrade",
    );
    expect(responseBody._meta.variant).toBe("v1_a");
    expect(responseBody._meta.message).toBe(
      "Your data persists here. Add auth, logs, and custom schemas to build a real backend.",
    );
    expect(responseBody._meta.cta.label).toBe("See example app");
  });
  test("get request for user 200 - non existing user", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/200`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(404);
    expect(responseBody).toEqual({});
  });
  test("get call for the user 24", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/8`, {
      headers: {
        "x-api-key": `${api_key}`,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(8);
    expect(responseBody._meta.upgrade_url).toBe(
      "https://app.reqres.in/upgrade",
    );
    expect(responseBody._meta.variant).toBe("v1_a");
    expect(responseBody._meta.message).toBe(
      "Your data persists here. Add auth, logs, and custom schemas to build a real backend.",
    );
    expect(responseBody._meta.cta.label).toBe("See example app");
  });
});
