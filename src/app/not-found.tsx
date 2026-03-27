import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col min-h-100 justify-center items-center text-4xl gap-2  m-0 p-0"
    >
      <div className="animate-bounce text-6xl m-0">🛸</div>
      <h2 className="m-0"> 404 - Not Found</h2>
      <p className="m-0">Cette page n'existe pas</p>
      <Link href="/" className="link">
        Return Home
      </Link>
    </div>
  );
}
