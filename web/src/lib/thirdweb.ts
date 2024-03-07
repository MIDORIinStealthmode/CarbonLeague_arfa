import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// export const sdk = ThirdwebSDK.fromPrivateKey(, 'goerli')
export const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.ADMIN_SECRET_KEY!,
  'goerli',
  {
    secretKey: "3PglbteHkL3KO6VvkSXB2sR9ldfWL8mAsprXt84_2gOXUVXsrXYEfiwyI93PnNKapok8V6yeB-kRAc6DEXrhFQ",
  }
)
