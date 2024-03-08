import {WalletButton} from "@/app/(app)/WalletButton";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-2 bg-neutral-700">
      <div className="navbar-logo">Logo Here</div>

      <WalletButton />
    </nav>
  );
}
