import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
  inputError: string | null;
};

export function Headline(props: Props) {
  const { searchValue, setSearchValue, handleSearch, inputError } = props;

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 300);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Dashboard
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter ETH wallet address"
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Button size="sm" onClick={debouncedHandleSearch}>
            Search for wallet
          </Button>
        </div>

        {inputError && <p className="text-sm text-red-500">{inputError}</p>}
      </div>
    </div>
  );
}
