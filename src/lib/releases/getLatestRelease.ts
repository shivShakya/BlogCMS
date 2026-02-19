import fs from "fs";
import path from "path";

export function getLatestRelease(slug: string) {
  const dir = path.join(process.cwd(), "src/releases", slug);

  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir);

  if (!files.length) return null;

  const versions = files
    .map((f) => f.replace(".json", ""))
    .map((v) => Number(v.replace("v", "")));

  const latest = Math.max(...versions);

  const filePath = path.join(dir, `v${latest}.json`);

  const file = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(file);
}
