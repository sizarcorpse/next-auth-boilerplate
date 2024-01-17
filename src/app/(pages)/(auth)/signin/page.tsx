import { LoginWithGithub, SignInForm } from "@/components/user";
import {
  Coffee,
  Github,
  Link as LinkIcon,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const socials = [
  {
    name: "Github",
    icon: Github,
    url: "www.github.com/sizarcorpse",
  },
  {
    name: "Linkedin",
    icon: Linkedin,
    url: "www.linkedin.com/in/ramizimran",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "www.twitter.com/sizarcorpse",
  },
  {
    name: "Website",
    icon: LinkIcon,
    url: "www.sizar.io",
  },
];

const DeveloperSocialLinks = () => {
  return (
    <div className="flex items-center justify-center gap-2 z-20 w-full rounded-2xl p-2 md:rounded-b-2xl">
      {socials.map((social, i) => {
        const Icon = social.icon;
        return (
          <Link
            href={`https://${social.url}`}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className="group p-2 backdrop-blur-xl rounded-full"
          >
            <Icon
              className="w-4 h-4 text-neutral-50 group-hover:text-warning group-hover:scale-105 transition-all duration-300"
              strokeWidth={1.5}
            />
          </Link>
        );
      })}
    </div>
  );
};

const SignInPage = () => {
  return (
    <main className="w-full flex items-center justify-center p-2 min-h-[calc(100vh-60px)] sm:px-6">
      <div className="container p-0 max-w-screen-lg bg-primary rounded-2xl min-h-[767px] h-auto grid grid-cols-2">
        <div className="col-span-2 order-2 p-6 w-full flex flex-row content-center items-center justify-center gap-6 flex-wrap sm:py-8 sm:px-20 md:gap-10 md:col-span-1 md:order-1 md:px-4 lg:px-12">
          <div className="flex items-center gap-2 grow">
            <Coffee className="w-8 h-8 text-warning" strokeWidth={1.5} />
            <Link
              href="https://www.sizar.io"
              target="_blank"
              className="text-base text-muted hover:underline"
            >
              sizar.io
            </Link>
          </div>
          <div className="basis-full flex flex-col gap-4">
            <SignInForm />
            <div className="text-primary-foreground text-sm font-light">
              Do not have an account?
              <Link href="/signup">
                <span className="text-warning hover:underline"> Sign Up</span>
              </Link>
            </div>
            <div className="flex items-center justify-center my-2">
              <hr className="w-full border-border/10" />
              <span className="text-sm font-light px-2 text-primary-foreground">
                or
              </span>
              <hr className="w-full border-border/10" />
            </div>
            <LoginWithGithub />
          </div>
        </div>

        <div className="col-span-2 order-1 min-h-[320px] relative md:col-span-1 md:order-2">
          <div className="absolute top-0 right-0 left-0 bottom-4 flex flex-col items-start justify-end p-2  md:top-4 md:right-4 md:bottom-4 md:left-4">
            <Image
              src="https://images.unsplash.com/photo-1613643971957-b7325f439db5"
              alt="Authentication"
              fill={true}
              quality={100}
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center rounded-t-2xl md:rounded-2xl z-10"
            />
            <DeveloperSocialLinks />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
