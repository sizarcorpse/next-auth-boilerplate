import type { Config } from "tailwindcss";

import { shadcnPlugin } from "./shadcnui-plugin";

export const shadcnPreset = {
  darkMode: ["class"],
  content: [],
  plugins: [shadcnPlugin, require("tailwindcss-animate")],
} satisfies Config;
