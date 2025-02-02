import Link from "next/link";

export default function BlogPage() {
  return (
    <main>
      <h1>The Blog</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus culpa
        officia dolores praesentium sit eum quae vel quaerat voluptate
        recusandae quisquam dolorem aperiam possimus dolorum, nisi reiciendis.
        Fugiat, eius ipsam.
      </p>
      <Link href="/blog/first-post">blog numero 1 </Link>
      <Link href="/blog/secun-post">blog numero 2 </Link>
    </main>
  );
}
