"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useCollectionSearchStore from "@/store/collections";
import { Category } from "@prisma/client";
import { Search } from "lucide-react";

interface Props {
  categories: Category[];
}

const CollectionFilter = ({ categories }: Props) => {
  const { query, setQuery, category, setCategory } = useCollectionSearchStore();
  return (
    <div className="py-[50px] container">
      <div className="relative">
        <Input
          placeholder="Search by title, description, or law number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute right-3 top-2" />
      </div>

      <div className="mt-5 flex flex-wrap gap-5">
        <Button
          variant={category === "all" ? "default" : "outline"}
          className={cn(
            category === "all"
              ? "text-white"
              : "text-primary hover:text-primary/80"
          )}
          onClick={() => setCategory("all")}
        >
          All
        </Button>
        {categories.map((item) => (
          <Button
            key={item.id}
            variant={category === item.id ? "default" : "outline"}
            className={cn(
              category === item.id
                ? "text-white"
                : "text-primary hover:text-primary/80"
            )}
            onClick={() => setCategory(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CollectionFilter;
