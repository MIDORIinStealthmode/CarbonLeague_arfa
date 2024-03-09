import { ThirdwebAuthAppRouter } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

// @ts-ignore @SEE https://github.com/thirdweb-dev/js/pull/2085
globalThis.TW_SKIP_FETCH_SETUP = true;

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuthAppRouter(
  {
    domain: process.env.NEXT_PUBLIC_DOMAIN || "",
    wallet: new PrivateKeyWallet(
      process.env.ADMIN_SECRET_KEY || "",
    ),
    thirdwebAuthOptions: {
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
      clientSecret: process.env.THIRDWEB_CLIENT_SECRET,
    }
  },
);
