import {WalletButton} from "@/app/(app)/WalletButton";
import Link from "next/link";
import NextImage from "next/image";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-2 h-20 bg-gradient-to-r from-teal-100 to-teal-200">
      <Link href="/" className="flex gap-4 font-bold items-center text-2xl text-teal-900">
        <NextImage src="/logo-transparent.png" alt="Logo" width={100} height={100} className="h-full w-auto"/>
        CARBON LEAGUE
      </Link>

      <WalletButton />
    </nav>
  );
}
