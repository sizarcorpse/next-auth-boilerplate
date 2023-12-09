const about = {
  packages: [
    "NextJS",
    "NextAuth",
    "TailwindCSS",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "React Hook Form",
    "React-hot-toast",
    "Swr",
    "React-icons",
    "Zod",
  ],
};

import { getCurrentUser, getUserServerSession } from "@/actions";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";

const Home = async () => {
  const { packages } = about;
  const user = await getCurrentUser();
  const session = await getServerSession(authOptions);
  const userSessionServer = await getUserServerSession();

  return (
    <main className="flex items-center justify-center p-6">
      <div className="container max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-xl font-bold text-slate-800 uppercase md:text-4xl lg:text-6xl text-center">
            Next Auth Boilerplate
          </h1>
          <div className="flex flex-row items-center justify-center flex-wrap gap-2">
            {packages.map((item, index) => (
              <p
                key={index}
                className="px-2 py-1 rounded-lg border border-slate-300 text-sm text-slate-800 font-semibold cursor-pointer hover:bg-amber-300 hover:border-rose-400"
              >
                {item}
              </p>
            ))}
          </div>
          <div className="max-w-screen-xl">
            <pre>
              <code>
                getCurrentUser:
                {JSON.stringify(user, null, 2)}
              </code>
            </pre>
            <pre>
              <code>session:{JSON.stringify(session, null, 2)}</code>
            </pre>
            <pre>
              <code>
                getUserServerSession:
                {JSON.stringify(userSessionServer, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
