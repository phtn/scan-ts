import { use, useEffect, useMemo, useState } from "react";
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

import { cn } from "@/lib/utils";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon, IconName } from "@/lib/icons";
import { HyperList } from "@/ui/hyper-list";
import { Sub } from "@/lib/firebase/add-sub";
import { SubsCtx } from "@/app/_ctx/subs";
import { AffiliateId } from "@/app/types";
import { usePathname } from "next/navigation";

export const SubsTable = () => {
  const { subs } = use(SubsCtx)!;
  useEffect(() => {
    if (subs.length === 0) {
      console.log("Fetching subs data...", subs.length);
    }
  }, [subs]);
  return <SubsDataTable data={subs ?? []} />;
};

interface DataTableProps<T> {
  data: T[];
}

export default function SubsDataTable({ data }: DataTableProps<Sub>) {
  const pathname = usePathname();
  const route = pathname.split("/").pop();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: route === "scans" ? 20 : 4,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Sub>[] = [
    {
      accessorFn: (row) => row.user.name, // Use accessorFn instead
      id: "name", // Unique identifier
      header: "Name",
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        return (
          <button
            onClick={() => row.toggleSelected()}
            className="font-semibold hover:underline underline-offset-4 decoration-dotted decoration-neutral-400 tracking-tight cursor-pointer"
          >
            {name}
          </button>
        );
      },
      size: 70,
    },
    {
      accessorFn: (row) => row.user.email,
      id: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <div className="flex justify-start text-sm font-sans">{email}</div>
        );
      },
      size: 70,
    },
    {
      accessorFn: (row) => row.user.tel,
      id: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const phone = row.getValue("phone") as string;
        return (
          <div className="flex justify-start text-sm font-quick">{phone}</div>
        );
      },
      size: 60,
    },
    {
      accessorFn: (row) => row.user.inquiry,
      id: "inquiry",
      header: "Inquiry",
      cell: ({ row }) => {
        const inquiry = row.getValue("inquiry") as string;
        return (
          <div className="flex justify-start text-[10px] uppercase font-quick">
            {inquiry}
          </div>
        );
      },
      size: 40,
    },
    {
      header: "Affiliate ID",
      accessorKey: "affiliateId",
      id: "affiliateId",
      cell: ({ row }) => {
        const affiliate = row.getValue("affiliateId") as AffiliateId;
        return (
          <div className="flex justify-start uppercase text-xs font-sans opacity-40">
            {affiliate?.["grp"].substring(0, 8)}
          </div>
        );
      },
      size: 40,
      enableHiding: true,
    },
    {
      header: "Device",
      accessorFn: (row) => row.device?.fingerprintId,
      id: "device",
      cell: ({ row }) => {
        const device = row.getValue("device") as string;
        return (
          <div className="flex justify-start uppercase text-xs font-sans opacity-40">
            {device.substring(0, 6)}
          </div>
        );
      },
      size: 30,
      enableHiding: true,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    enableMultiRowSelection: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
  });

  const canNext = useMemo(() => {
    const index = pagination.pageIndex;
    return index <= table.getPageCount() - 2;
  }, [pagination, table]);
  const canPrevious = useMemo(() => {
    const index = pagination.pageIndex;
    return index > 0;
  }, [pagination]);

  const paginations = useMemo(
    () =>
      [
        {
          label: "Go to First Page",
          icon: "square-double-arrow-left-bold",
          fn: table.firstPage,
          disabled: !canPrevious,
        },
        {
          label: "Go to Previous Page",
          icon: "square-arrow-left-bold",
          fn: table.previousPage,
          disabled: !canPrevious,
        },
        {
          label: "Go to Next Page",
          icon: "square-arrow-right-bold",
          fn: table.nextPage,
          disabled: !canNext,
        },
        {
          label: "Go to Last Page",
          icon: "square-double-arrow-right-bold",
          fn: table.lastPage,
          disabled: !canNext,
        },
      ] as IPaginationButton[],
    [canNext, canPrevious, table],
  );

  return (
    <div className="flex flex-col justify-between h-full font-sans">
      <div
        className={cn(
          "dark:bg-zinc-800 bg-background/40 overflow-hidden h-[27.5vh] flex",
          { "h-full": route === "scans" },
        )}
      >
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-8 dark:bg-zinc-900 bg-super-fade border-y-[0.33px] border-gray-400/80 dark:border-zark"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer text-xs items-center justify-between gap-2 select-none",
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
                              <Icon
                                name="arrow-down-bold-duotone"
                                className="shrink-0 text-teal-500 dark:text-teal-400 opacity-80 rotate-180"
                                size={18}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <Icon
                                name="arrow-down-bold-duotone"
                                className="shrink-0 text-indigo-400 opacity-100"
                                size={18}
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
                  className="h-14 border-b-[0.33px] dark:border-zark border-zark/20"
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
      <div className="flex px-4 border-t-[0.33px] py-2 border-gray-400/80 dark:border-zark flex-1 grow-0 items-center justify-between gap-8">
        <div className="text-foreground font-sans tracking-tight flex whitespace-nowrap">
          <p
            className="text-foreground space-x-2 font-dm text-xs whitespace-nowrap"
            aria-live="polite"
          >
            <span className="font-semibold">Page</span>
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
              )}{" "}
              of {table.getRowCount().toString()}
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
                container="flex space-x-2 p-0 overflow-clip"
                itemStyle="h-8"
                delay={0.6}
                direction="left"
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
  disabled: boolean;
}
const PaginationButton = ({ fn, icon, label, disabled }: IPaginationButton) => (
  <button
    onClick={fn}
    disabled={disabled}
    className="disabled:pointer-events-none cursor-pointer hover:text-teal-500/80 hover:opacity-100 text-panel/40 dark:hover:text-teal-300 dark:text-white disabled:opacity-20"
    aria-label={label}
  >
    <Icon name={icon} solid aria-hidden="true" size={24} />
  </button>
);
