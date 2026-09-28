import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const [name, hash] of [["landing", ""], ["report", "#/report"], ["hr", "#/hr"], ["check", "#/check"]])
  test(`${name} has no WCAG A/AA violations`, async ({ page }) => {
    await page.goto(`/${hash}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(result.violations).toEqual([]);
  });

test("the landing stage states the problem and shows the sample gap", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Pay gaps, proven." })).toBeVisible();
  await expect(page.getByText("14.5% short")).toBeVisible();
  await expect(page.getByText(/fictional employer/)).toBeVisible();
});

test("the sample report withholds the small category", async ({ page }) => {
  await page.goto("/#/report");
  await expect(page.getByRole("heading", { name: "Engineering" })).toBeVisible();
  await expect(page.getByText("8.9% short")).toBeVisible();
  await expect(page.getByText("Withheld by the circuit")).toBeVisible();
});

test("the report form rejects an invalid address", async ({ page }) => {
  await page.goto("/#/report");
  await page.getByLabel("Open a report by its contract address").fill("nope");
  await page.getByRole("button", { name: "Open report" }).click();
  await expect(page.getByRole("alert")).toContainText("64 hexadecimal");
});

test("creating a report without a wallet explains how to get one", async ({ page }) => {
  await page.goto("/#/hr");
  await expect(page.getByText("Stays dark")).toBeVisible();
  await page.getByRole("button", { name: "Create report on Midnight" }).click();
  await expect(page.getByRole("alert").first()).toContainText("Install Lace");
});

test("an employee packet that is not a Parity file is refused", async ({ page }) => {
  await page.goto("/#/check");
  await page.locator('input[type="file"]').setInputFiles({ name: "x.json", mimeType: "application/json", buffer: Buffer.from("{}") });
  await expect(page.getByRole("alert")).toContainText("not a Parity file");
});
