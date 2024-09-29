import { TatumSDK, Network, Ethereum, Status } from "@tatumio/tatum";

const apiKey = import.meta.env.VITE_TATUM_API_KEY;

if (!apiKey) {
  throw new Error("TatumSDK did not receive an API key.");
}

const tatumSDK = await TatumSDK.init<Ethereum>({
  network: Network.ETHEREUM,
  apiKey: { v4: apiKey },
});

export async function getWalletBalance(providedAddress: string) {
  try {
    const balance = await tatumSDK.address.getBalance({
      addresses: [providedAddress],
    });

    if (balance.status !== Status.SUCCESS) {
      const errorMessage = balance.error?.message
        ? formatErrorMessage(balance.error.message)
        : 'Failed to fetch balance';
      throw new Error(errorMessage);
    }

    return balance;
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    throw error;
  }
}

function formatErrorMessage(message: string[] | object[]) {
  if (Array.isArray(message)) {
    return message.join(', ');
  }
  return JSON.stringify(message);
}