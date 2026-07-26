import { test, expect } from "@playwright/test";
import "dotenv/config";

test.describe.parallel("@js api Testing", () => {
  const jsUrl = process.env.js_url;

  test("Create api posts", async ({ request }) => {
    const response = await request.post(`${jsUrl}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: "lorem ipsum",
        body: "Nec ridiculus erat maecenas montes mollis, rhoncus at ad massa dis fusce, ligula nisi vulputate etiam. Vitae conubia ridiculus est lectus quam a posuere ad, quisque dignissim nulla litora habitant fermentum curae fusce metus, eleifend tempus potenti convallis nam blandit porttitor. Nibh erat leo euismod habitant egestas vulputate laoreet habitasse nostra, elementum himenaeos nisi phasellus semper imperdiet eu aliquam, fames eleifend primis venenatis interdum a et ornare.",
        userId: 10,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(201);
    expect(responseBody.title).toBe("lorem ipsum");
    expect(responseBody.userId).toBe(10);
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
        title: "Beautiful title",
        body: "Yusuf Rahman is a software engineer and a playwright automation tester. He has been working in the field of software testing for over 5 years and has extensive experience in using Playwright for end-to-end testing of web applications. In this article, he shares his insights on how to effectively use Playwright for testing web applications.",
        userId: 101,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.title).toBe("Beautiful title");
    expect(responseBody.body).toBe(
      "Yusuf Rahman is a software engineer and a playwright automation tester. He has been working in the field of software testing for over 5 years and has extensive experience in using Playwright for end-to-end testing of web applications. In this article, he shares his insights on how to effectively use Playwright for testing web applications.",
    );
  });
});
