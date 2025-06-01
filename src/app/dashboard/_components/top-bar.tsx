"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArticleSearch } from "@/store/dashboard/document/section-search";
import { CircleUser } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  name: string;
}

const Topbar = ({ name }: Props) => {
  const { query, setQuery } = useArticleSearch();
  const pathName = usePathname();

  // Split path and check structure
  const pathSegments = pathName.split("/").filter(Boolean); // removes empty segments

  const isOnArticlePage =
    pathName.startsWith("/dashboard/documents/") && pathSegments.length > 3;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold">{name}</h1>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Only show search input on article page */}
        {isOnArticlePage && (
          <div>
            <Input
              className="w-[300px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by article number..."
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full border">
            <CircleUser className="h-5 w-5 text-primary" />
            <span className="sr-only">Profile</span>
          </Button>
          <div className="text-sm">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
