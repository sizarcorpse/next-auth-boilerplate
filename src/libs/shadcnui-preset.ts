import type { Config } from "tailwindcss";

import { shadcnPlugin } from "./shadcnui-plugin";

export const shadcnPreset = {
  darkMode: ["class"],
  content: [],
  plugins: [shadcnPlugin],
} satisfies Config;
