// components/SchemaFAQ.tsx
import React from "react";

type QA = { q: string; a: string };

const SchemaFAQ: React.FC<{ items: QA[] }> = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export default SchemaFAQ;
