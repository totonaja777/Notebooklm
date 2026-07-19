import asyncio, pathlib
from playwright.async_api import async_playwright

BASE = pathlib.Path(__file__).parent

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
        page = await browser.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
        await page.goto((BASE / "ndlp-infographic.html").as_uri())
        await page.wait_for_timeout(600)
        await page.screenshot(path=str(BASE / "ndlp-infographic.png"))
        await browser.close()

asyncio.run(main())
