import fs from "fs";
import path from "path";
import { Release } from "../schema/releaseSchema";
import { getNextVersion } from "./version";

export function saveRelease(slug: string, pageData: any) {
  const version = getNextVersion(slug);

  const dir = path.join(process.cwd(), "src/releases", slug);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${version}.json`);

  const release: Release = {
    version,
    createdAt: new Date().toISOString(),
    page: pageData,
  };

  fs.writeFileSync(filePath, JSON.stringify(release, null, 2));

  return release;
}
