import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  TatumSDK,
  Network,
  Ethereum,
  Status,
  ResponseDto,
  AddressBalance,
} from "@tatumio/tatum";

type TCtx = {
  sdk: Ethereum | null;
  getWalletBalance: (
    providedAddress: string,
  ) => Promise<ResponseDto<AddressBalance[]>>;
};

const TatumCtx = createContext<TCtx | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function TatumProvider(props: Props) {
  const { children } = props;

  const [sdk, setSdk] = useState<Ethereum | null>(null);

  async function initSDK() {
    const apiKey = import.meta.env.VITE_TATUM_API_KEY;

    if (!apiKey) {
      throw new Error("TatumSDK did not receive an API key.");
    }

    const tatumSDK = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: apiKey },
    });

    setSdk(tatumSDK);
  }

  async function getWalletBalance(providedAddress: string) {
    if (!sdk) {
      throw new Error("TatumSDK not initialized");
    }

    try {
      const balance = await sdk.address.getBalance({
        addresses: [providedAddress],
      });

      if (balance.status !== Status.SUCCESS) {
        const errorMessage = balance.error?.message
          ? formatErrorMessage(balance.error.message)
          : "Failed to fetch balance";
        throw new Error(errorMessage);
      }

      return balance;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      throw error;
    }
  }

  const value = {
    sdk,
    getWalletBalance,
  };

  useEffect(() => {
    if (!sdk) {
      initSDK();
    }

    return () => {
      if (sdk) {
        sdk.destroy();
      }
    };
  }, []);

  return <TatumCtx.Provider value={value}>{children}</TatumCtx.Provider>;
}

export function useTatum() {
  const ctx = useContext(TatumCtx);

  if (ctx === undefined) {
    throw new Error("useTatum must be used within a CountProvider");
  }

  return ctx;
}

function formatErrorMessage(message: string[] | object[]) {
  if (Array.isArray(message)) {
    return message.join(", ");
  }
  return JSON.stringify(message);
}
