import LoginWithGithub from "@/components/auth/buttons/LoginWithGithub";
import { SignUpForm } from "@/components/user";
import {
  Coffee,
  Github,
  Link as LinkIcon,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
              className="w-4 h-4 text-primary group-hover:text-warning group-hover:scale-105 transition-all duration-300"
              strokeWidth={1.5}
            />
          </Link>
        );
      })}
    </div>
  );
};

const SignUpPage = () => {
  return (
    <main className="w-full flex items-center justify-center p-2 min-h-[calc(100vh-60px)] sm:px-6">
      <div className="container p-0 max-w-screen-lg bg-primary rounded-2xl min-h-[767px] h-auto grid grid-cols-2">
        <div className="col-span-2 order-2 p-6 sm:py-8 sm:px-20 grid grid-cols-1 gap-4 md:gap-2 md:col-span-1 md:order-1 md:px-4 lg:px-12">
          <h2 className="flex flex-col gap-1 text-primary-foreground text-4xl font-bold md:gap-2 md:text-4xl">
            <span className="flex items-center gap-2">
              <Coffee className="w-8 h-8 text-warning" />
              <Link
                href="https://www.sizar.io"
                target="_blank"
                className="text-base text-muted font-medium hover:underline"
              >
                sizar.io
              </Link>
            </span>
            Explore Imagination
            <span className="text-primary-foreground text-base font-normal">
              Create an account to start exploring
            </span>
          </h2>

          <div className="flex flex-col gap-2">
            <LoginWithGithub />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-primary-foreground">
              Create new account 🦖
            </h3>
            <SignUpForm />
            <div className="text-primary-foreground text-base font-normal">
              Already have an account?
              <Link href="/login">
                <span className="text-warning hover:underline"> Login</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-2 order-1 min-h-[320px] relative md:col-span-1 md:order-2">
          <div className="absolute top-0 right-0 left-0 bottom-4 flex flex-col items-start justify-end p-2  md:top-4 md:right-4 md:bottom-4 md:left-4">
            <Image
              src="https://images.unsplash.com/photo-1612733399020-e2194e3dbfda"
              alt="Authentication"
              fill={true}
              quality={100}
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center rounded-t-2xl md:rounded-2xl z-10"
            />
            <DeveloperSocialLinks />
          </div>
          di
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
