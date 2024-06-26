import {TrendingNft} from "@/app/(app)/TrendingNft";
import {OnboardingChecklist} from "@/app/(app)/common/OnboardingChecklist";

export default async function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="py-8">
        <h1 className="font-bold text-neutral-900 text-5xl mb-2">Carbon League</h1>
        <p className="font-bold text-neutral-600">Carbon League is a game that rewards you for supporting real-world heros reducing carbon emmisions.</p>
      </div>
      <OnboardingChecklist />
      <TrendingNft />
    </div>
  )
}
