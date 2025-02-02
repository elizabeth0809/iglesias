interface Params {
  slug: string;
}

interface SlugPageProps {
  params: Params;
}

export default function SlugPage({ params }: SlugPageProps) {
  return <h1>SlugPage - {params.slug}</h1>;
}
