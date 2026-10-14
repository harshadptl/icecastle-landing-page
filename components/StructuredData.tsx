/**
 * Renders JSON-LD structured data.
 * Helps search engines and AI assistants understand ICE Castle.
 * Pass only schemas that match the page's topic.
 */
export default function StructuredData({ schemas }: { schemas: object[] }) {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}
