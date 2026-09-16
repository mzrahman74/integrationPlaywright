import { test, expect } from "@playwright/test";
import "dotenv/config";
import { faker } from "@faker-js/faker";

test.describe.parallel("@js api Testing", () => {
  const title = faker.lorem.sentence();
  const userid = faker.number.int({ min: 1, max: 10 });
  const body = faker.lorem.paragraph();
  const jsUrl = process.env.js_url;

  test("Create api posts", async ({ request }) => {
    const response = await request.post(`${jsUrl}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: title,
        body: body,
        userId: userid,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(201);
    expect(responseBody.title).toBe(title);
    expect(responseBody.userId).toBe(userid);
  });
  test("GET api posts", async ({ request }) => {
    const response = await request.get(`${jsUrl}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.length).toBe(100);
    expect(responseBody[51].userId).toBe(6);
    expect(responseBody[51].id).toBe(52);
    expect(responseBody[0].title).toBe(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    );
  });
  test("PUT api posts", async ({ request }) => {
    const response = await request.put(`${jsUrl}/posts/1`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: 1,
        title: title,
        body: body,
        userId: 101,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.title).toBe(title);
    expect(responseBody.body).toBe(body);
  });
  test("DELETE api posts", async ({ request }) => {
    const response = await request.delete(`${jsUrl}/posts/1`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
  });
  test("GET api comments  by postId", async ({ request }) => {
    const response = await request.get(`${jsUrl}/comments`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        postId: 1,
      },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.length).toBe(5);
  });
});
