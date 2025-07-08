"use client";
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface Page {
  title: string;
  path: string;
  icon?: React.ElementType;
}

export function SearchModal({
  open,
  onOpenChange,
  pages,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pages: Page[];
}) {
  const [query, setQuery] = React.useState("");
  const [highlighted, setHighlighted] = React.useState(0);
  const router = useRouter();

  const filtered = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.path.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    setHighlighted(0);
  }, [query, open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter" && filtered[highlighted]) {
      router.push(filtered[highlighted].path);
      onOpenChange(false);
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full p-0 overflow-hidden" hideClose>
        <div className="p-4 border-b relative">
          <Input
            autoFocus
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pr-10"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute right-7 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setQuery("")}
              tabIndex={-1}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="max-h-72 overflow-y-auto divide-y">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found.
            </div>
          ) : (
            filtered.map((page, i) => (
              <button
                key={page.path}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent focus:bg-accent transition-colors ${
                  i === highlighted ? "bg-accent" : ""
                }`}
                onClick={() => {
                  router.push(page.path);
                  onOpenChange(false);
                }}
                onMouseEnter={() => setHighlighted(i)}
              >
                {page.icon && (
                  <page.icon className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="font-medium">{page.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {page.path}
                </span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
