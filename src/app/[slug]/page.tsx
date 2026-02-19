import { getLatestRelease } from "../../lib/releases/getLatestRelease";
import SectionRenderer from "@/components/SectionRenderer";

export default async function LivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const release = getLatestRelease(slug);

  if (!release) {
    return <div>No published version found</div>;
  }

  return (
    <main>
      <SectionRenderer sections={release.page.sections} />
    </main>
  );
}