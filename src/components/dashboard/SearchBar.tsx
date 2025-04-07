
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-full md:max-w-md lg:max-w-lg">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Etken madde veya ilaç adı ile arama yapın..."
        className="pl-10 py-6"
      />
    </div>
  );
};

export default SearchBar;
