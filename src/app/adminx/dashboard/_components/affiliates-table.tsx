import { use, useEffect, useId, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAffiliate } from "@/lib/firebase/add-affiliate";
import { AffiliateCtx } from "@/app/_ctx/affiliate";
import { Icon, IconName } from "@/lib/icons";
import { HyperList } from "@/ui/hyper-list";

export const AffiliatesTable = () => {
  const { affiliates } = use(AffiliateCtx)!;
  useEffect(() => {
    if (affiliates.length === 0) {
      console.log("Fetching affiliates data...");
      // Fetch affiliates data from API or other source
    }
    console.log(affiliates);
  }, [affiliates]);
  return (
    <div className="bg-gradient-to-b size-full dark:from-hot-dark/20 from-super-fade dark:via-hot-dark/40 dark:to-neutral-400/40 via-ultra-fade to-super-fade">
      <AffiliatesDataTable data={affiliates} />
    </div>
  );
};

const columns: ColumnDef<IAffiliate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
    size: 180,
  },
  {
    header: "Email",
    accessorKey: "email",
    size: 200,
  },
  {
    header: "Status",
    accessorKey: "active",
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue("active") === false &&
            "bg-muted-foreground/60 text-primary-foreground",
        )}
      >
        {row.getValue("active") === true ? "Active" : "Inactive"}
      </Badge>
    ),
    size: 120,
  },
  {
    header: "Rewards",
    accessorKey: "rewardPoints",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("rewardPoints"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return formatted;
    },
    size: 120,
  },
];

interface AffiliatesDataTableProps {
  data: IAffiliate[];
}

export default function AffiliatesDataTable({
  data,
}: AffiliatesDataTableProps) {
  const id = useId();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  const paginations = useMemo(
    () =>
      [
        {
          label: "Go to First Page",
          icon: "square-double-arrow-left",
          fn: table.firstPage,
          disabled: table.getCanPreviousPage(),
        },
        {
          label: "Go to Previous Page",
          icon: "square-arrow-left",
          fn: table.previousPage,
          disabled: table.getCanPreviousPage(),
        },
        {
          label: "Go to Next Page",
          icon: "square-arrow-right",
          fn: table.nextPage,
          disabled: !table.getCanNextPage(),
        },
        {
          label: "Go to Last Page",
          icon: "square-double-arrow-right",
          fn: table.lastPage,
          disabled: !table.getCanNextPage(),
        },
      ] as IPaginationButton[],
    [table],
  );

  return (
    <div className="flex flex-col justify-between h-full font-sans">
      <div className="bg-background/40 overflow-hidden flex border-y-[0.33px] border-panel/40">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-10 bg-foreground/5"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-16"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="w-full">
                <TableCell className="h-80 whitespace-nowrap w-full p-4 font-sans flex">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex px-4 flex-1 grow-0 items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <p className="text-foreground font-dm text-xs whitespace-nowrap">
            Rows per page
          </p>

          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap border-0">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="text-foreground flex text-sm whitespace-nowrap">
          <p
            className="text-foreground font-dm text-xs whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0,
                ),
                table.getRowCount(),
              )}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>
        {/* Pagination buttons */}
        <div className="flex items-center">
          <Pagination>
            <PaginationContent>
              <HyperList
                data={paginations}
                component={PaginationButton}
                container="flex space-x-2 p-0"
                itemStyle="h-6"
              />
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

interface IPaginationButton {
  fn: VoidFunction;
  icon: IconName;
  label: string;
  disabled?: boolean;
}
const PaginationButton = ({ fn, icon, label, disabled }: IPaginationButton) => (
  <PaginationItem>
    <button
      onClick={fn}
      disabled={disabled}
      className="disabled:pointer-events-none cursor-pointer hover:opacity-100 text-panel opacity-50 disabled:opacity-20"
      aria-label={label}
    >
      <Icon name={icon} aria-hidden="true" size={24} />
    </button>
  </PaginationItem>
);
