import BlogEspiritual from "./components/BlogEspiritual";

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <BlogEspiritual />
      </div>
    </main>
  );
}
