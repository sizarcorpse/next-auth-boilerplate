import Link from "next/link";

const about = {
  packages: [
    "NextJS",
    "NextAuth",
    "TailwindCSS",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "React Hook Form",
    "React Hot Toast",
    "Swr",
    "Zod",
    "Shadcn UI",
    "Lucide React",
  ],
};

const Home = async () => {
  const { packages } = about;

  return (
    <main className="flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-52px)]">
          <h1 className="text-xl font-black text-primary uppercase tracking-wider md:text-4xl lg:text-5xl text-center">
            Next Auth Boilerplate
          </h1>

          <div className="flex flex-row items-center justify-center flex-wrap gap-2">
            {packages.map((item, index) => (
              <p
                key={index}
                className="px-2 py-2 rounded-lg border border-border text-sm text-primary font-semibold cursor-pointer md:px-4 md:py-4 "
              >
                {item}
              </p>
            ))}
          </div>

          <div className="bg-primary/5 p-2 rounded-lg md:p-4">
            <pre className="flex flex-col gap-1 whitespace-break-spaces">
              <code className="text-sm text-primary">
                {"$"}{" "}
                {`git clone https://github.com/sizarcorpse/next-auth-boilerplate.git`}
              </code>
              <code className="text-sm text-primary">
                {"$"} {`cd next-auth-boilerplate`}
              </code>
              <code className="text-sm text-primary">
                {"$"} {`npm install`}
              </code>
              <code className="text-sm text-primary">
                {"$"} {`npm run dev`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
