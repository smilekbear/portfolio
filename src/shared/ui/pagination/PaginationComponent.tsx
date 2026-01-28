"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  page: number;
  totalPage: number;
  basePath?: string;
  onPageChange?: (nextPage: number) => void;
  keepScrollPosition?: boolean;
};

export function PaginationComponent({
  page,
  totalPage,
  basePath = "/knowledge",
  onPageChange,
  keepScrollPosition = true,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clamp = (p: number) => Math.max(1, Math.min(totalPage, p));

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const goTo = (nextPageRaw: number) => {
    if (totalPage <= 0) return;

    const nextPage = clamp(nextPageRaw);
    if (nextPage === page) return;

    onPageChange?.(nextPage);
    router.push(buildHref(nextPage), { scroll: !keepScrollPosition ? true : false });
  };

  const handleClick =
    (nextPage: number) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Let users open in new tab, copy link, etc.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      goTo(nextPage);
    };

  // if (totalPage <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPage;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(clamp(page - 1))}
            aria-disabled={!canPrev}
            onClick={handleClick(page - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPage }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={buildHref(pageNum)}
                isActive={pageNum === page}
                onClick={handleClick(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={buildHref(clamp(page + 1))}
            aria-disabled={!canNext}
            onClick={handleClick(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}