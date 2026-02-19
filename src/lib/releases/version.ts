import fs from "fs";
import path from "path";

export function getNextVersion(slug: string): string {
  const dir = path.join(process.cwd(), "src/releases", slug);

  if (!fs.existsSync(dir)) {
    return "v1";
  }

  const files = fs.readdirSync(dir);

  const versions = files
    .map((f) => f.replace(".json", ""))
    .map((v) => Number(v.replace("v", "")))
    .filter(Boolean);

  const next = versions.length ? Math.max(...versions) + 1 : 1;

  return `v${next}`;
}
