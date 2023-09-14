import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-6">
      <img src={"/pregnant.svg"} />
      <h1>Are you at risk??????!</h1>
      <button className="bg-blue-500 py-5 px-20 rounded-lg">Nothing...</button>
    </main>
  );
}
