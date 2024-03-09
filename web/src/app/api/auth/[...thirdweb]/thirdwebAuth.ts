import { ThirdwebAuthAppRouter } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import {ChainOrRpcUrl} from "@thirdweb-dev/sdk";

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
      secretKey: process.env.THIRDWEB_CLIENT_SECRET!,
    }
  },
);

export const getUserModel = async () => {
  const accountUser = await getUser();

  if (!accountUser) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: {
      address: accountUser.address
    }
  })
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        address: accountUser.address,
      }
    })
  }

  return user
}
