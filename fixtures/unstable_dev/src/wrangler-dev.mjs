import { unstable_dev } from "wrangler";

for (const options of [
	{ remote: false, experimentalDevenvRuntime: false },
	{ remote: false, experimentalDevenvRuntime: true },
	{ remote: true, experimentalDevenvRuntime: false },
	{ remote: true, experimentalDevenvRuntime: true },
]) {
	//since the script is invoked from the directory above, need to specify index.js is in src/
	console.log("\n\nBeginning test for:", options);

	const worker = await unstable_dev("src/index.js", options);

	const resp = await worker.fetch("http://localhost:8787/");
	const text = await resp.text();

	console.log("Invoked worker: ", text);

	await worker.stop();
}
