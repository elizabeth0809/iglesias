import Link from "next/link";

export default function Header() {
  return (
    <header className="test">
      <p>
        <Link href="/">Home</Link>
        <Link href="/about">About us</Link>
        <Link href="/blog">Blogs</Link>
      </p>
    </header>
  );
}
