import { chromium } from 'playwright';

export const GET = async ({ url }: { url: URL }) => {
	const browser = await chromium.launch({
		headless: true
	});

	const page = await browser.newPage();

	await page.goto(
		`http://ufcstats.com/statistics/fighters/search?query=${url.searchParams.get('search')}&page=all`,
		{
			waitUntil: 'networkidle'
		}
	);

	const html = await page.content();

	await browser.close();

	return new Response(html, {
		headers: { 'content-type': 'text/html' }
	});
};
