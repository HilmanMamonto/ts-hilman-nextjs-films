import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="w-screen h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-3xl font-semibold">404 Page Not Foud</h1>
        <button onClick={() => router.push("/movie")}>back to home</button>
      </div>
    </section>
  );
};

export default NotFound;
