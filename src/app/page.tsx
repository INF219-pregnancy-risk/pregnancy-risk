import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 justify-center">
      <Link
        href="/survey"
        className="bg-blue-500 py-2 px-4 rounded-md text-white"
      >
        Survey Page
      </Link>
    </main>
  );
}
