import { chromium } from "playwright"
import fs from "fs"
import chalk from "chalk"

// Use port 3003 for the confirmed running instance
const BASE_URL = "http://localhost:3003"

const routes = [
  "/",
  "/services",
  "/industries",
  "/products",
  "/portfolio",
  "/pricing",
  "/blog",
  "/about",
  "/contact",
  "/dashboard",
]

async function audit() {
  if (!fs.existsSync("audit")) {
    fs.mkdirSync("audit")
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()

  let report = []

  for (const route of routes) {
    const url = BASE_URL + route

    console.log(chalk.blue(`Auditing: ${url}`))

    const errors = []
    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text())
        console.log(chalk.red(`  [Error] ${msg.text().slice(0, 100)}...`))
      }
    })

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle' })

      const title = await page.title()
      const content = await page.content()

      // Lowered threshold to 1500 chars to avoid false positives on clean but minimal pages
      const blankPage = content.length < 1500

      const screenshot = `audit-${route.replace(/\//g, "") || "home"}.png`
      await page.screenshot({ path: `audit/${screenshot}`, fullPage: true })

      report.push({
        route,
        status: response.status(),
        title,
        blankPage,
        consoleErrors: errors.length,
        screenshot
      })

      if (blankPage) {
        console.log(chalk.red("⚠ Potential Blank Page Detected"))
      } else {
        console.log(chalk.green("✓ Page OK"))
      }
    } catch (err) {
      console.log(chalk.bgRed(`✖ Failed to load ${url}: ${err.message}`))
      report.push({
        route,
        status: "FAILED",
        error: err.message
      })
    }
  }

  fs.writeFileSync(
    "audit/report.json",
    JSON.stringify(report, null, 2)
  )

  console.log(chalk.yellow("\nAudit Complete"))
  console.log("Report saved to audit/report.json")

  await browser.close()
}

audit()
