import {WalletButton} from "@/app/(app)/WalletButton";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-2 h-20 bg-neutral-700">
      <Link href="/" className="navbar-logo">Logo Here</Link>

      <WalletButton />
    </nav>
  );
}
