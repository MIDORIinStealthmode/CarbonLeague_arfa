import {MyNftList} from "@/app/(app)/profile/MyNftList";
import {OnboardingChecklist} from "@/app/(app)/common/OnboardingChecklist";

export default function ProfilePage() {
  return (
    <div>
      <OnboardingChecklist />

      <div className="flex justify-between">
        <div className="">
          <h1 className="font-bold text-neutral-900 text-2xl mb-2">My Profile</h1>
          <p className="font-bold text-neutral-600">Your Superpowers!!</p>
        </div>
      </div>

      <MyNftList />
    </div>
  )
}
