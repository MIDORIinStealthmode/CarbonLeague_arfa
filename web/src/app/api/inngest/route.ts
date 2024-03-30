import { serve } from "inngest/next";
import {inngest} from "@/lib/inngest";
import {SuperpowerService} from "@/lib/services/Superpower";

const mintSuperpower = inngest.createFunction(
  { id: "mint-superpower" },
  { event: "superpower.mint" },
  async ({ event }) => {
    const { superpowerId, address } = event.data;
    await SuperpowerService.mint({ superpowerId, address })
  }
)

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    mintSuperpower
  ],
});
