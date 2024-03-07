import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// export const sdk = ThirdwebSDK.fromPrivateKey(, 'goerli')
export const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.ADMIN_SECRET_KEY!,
  'goerli',
  {
    secretKey: "",
  }
)
