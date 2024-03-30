import { serve } from "inngest/next";
import {inngest} from "@/lib/inngest";
import {mintSuperpower} from "@/app/api/inngest/mintSuperpower";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    mintSuperpower
  ],
});
