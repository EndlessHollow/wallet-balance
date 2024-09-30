import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useMemo } from "react";
import { AddressBalance } from "@tatumio/tatum";
import { BalanceSkeleton } from "./skeleton";
import { Headline } from "./headline";
import { useTatum } from "@/use-tatum";

interface WalletState {
  wallet: string;
  data: AddressBalance[] | null;
  fetchError: string | null;
  isLoading: boolean;
}

export function Dashboard() {
  const [walletState, setWalletState] = useState<WalletState>({
    wallet: "",
    data: null,
    fetchError: null,
    isLoading: false,
  });
  const [inputError, setInputError] = useState<string | null>(null);

  const { getWalletBalance } = useTatum();

  const ethBalance = useMemo(() => {
    if (!walletState.data) return null;
    return (
      walletState.data.find((asset) => asset.asset === "ETH")?.balance || "0"
    );
  }, [walletState.data]);

  async function searchWalletByAddress() {
    if (!walletState.wallet.trim()) {
      setInputError("Please enter a wallet address");
      return;
    }
    setInputError(null);

    setWalletState((prev) => ({ ...prev, isLoading: true, fetchError: null }));

    try {
      const response = await getWalletBalance(walletState.wallet);
      setWalletState((prev) => ({ ...prev, data: response.data }));
    } catch (err) {
      setWalletState((prev) => ({
        ...prev,
        fetchError:
          err instanceof Error ? err.message : "An unknown error occurred",
        data: null,
      }));
    } finally {
      setWalletState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <div className="container mx-auto px-4 grid gap-4 py-16">
      <Headline
        searchValue={walletState.wallet}
        setSearchValue={(value) =>
          setWalletState((prev) => ({ ...prev, wallet: value }))
        }
        handleSearch={searchWalletByAddress}
        inputError={inputError}
      />
      <Card>
        <CardHeader>
          <CardTitle>Wallet Details</CardTitle>
          <CardDescription>Balance of your ETH wallet</CardDescription>
        </CardHeader>
        <CardContent>
          {walletState.isLoading && <BalanceSkeleton />}
          {walletState.fetchError && (
            <p className="text-red-500">{walletState.fetchError}</p>
          )}
          {ethBalance && <p>ETH Balance: {ethBalance}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
