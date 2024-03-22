import {ThirdwebSDK} from "@thirdweb-dev/sdk";

// @ts-ignore @SEE https://github.com/thirdweb-dev/js/pull/2085
globalThis.TW_SKIP_FETCH_SETUP = true;

export const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.ADMIN_SECRET_KEY!,
  process.env.NEXT_PUBLIC_CHAIN_ID!,
  {
    secretKey: process.env.THIRDWEB_SECRET_KEY!,
  }
)
