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
import { LogCtx } from "@/app/_ctx/log";
import { Log } from "@/lib/firebase/add-log";

export const LogsTable = () => {
  const { logs } = use(LogCtx)!;
  useEffect(() => {
    if (logs.length === 0) {
      console.log("Fetching affiliates data...");
      // Fetch affiliates data from API or other source
    }
  }, [logs]);
  return (
    // <div className="bg-gradient-to-b lg:size-full w-full dark:from-hot-dark/20 from-super-fade dark:via-hot-dark/40 dark:to-neutral-400/40 via-ultra-fade to-super-fade">
    <LogsDataTable data={logs} />
    // </div>
  );
};

interface DataTableProps<T> {
  data: T[];
}

export default function LogsDataTable({ data }: DataTableProps<Log>) {
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

  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Log>[] = [
    {
      header: "Activity",
      accessorKey: "name",
      cell: ({ row }) => (
        <button
          onClick={() => row.toggleSelected()}
          className="font-medium hover:underline underline-offset-4 decoration-dotted decoration-neutral-400 tracking-tight cursor-pointer"
        >
          {row.getValue("name")}
        </button>
      ),
      size: 60,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => {
        const action = row.getValue("action") as string;
        return (
          <div className="flex justify-start uppercase text-[10px] font-sans">
            {action}
          </div>
        );
      },
      size: 60,
    },
    {
      header: "Ref",
      accessorKey: "ref",
      cell: ({ row }) => {
        const ref = row.getValue("ref") as string;
        return (
          <div className="flex justify-start text-[10px] font-quick">
            {ref.toString().split("-").shift()}
          </div>
        );
      },
      size: 60,
    },
    {
      header: "",
      accessorKey: "id",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end text-xs font-sans opacity-40">
            {row.id}
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

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length > 0) {
      const selectedRowData = selectedRows[0].original;
      console.log("Selected affiliate:", selectedRowData);
    }
  }, [rowSelection, table]);

  return (
    <div className="flex flex-col justify-between h-full font-sans">
      <div className="bg-background/40 overflow-hidden h-full flex">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-8 bg-foreground/5"
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
                  className="h-8 border-b-[0.33px] dark:border-zark border-zark/20 dark:hover:bg-zark/60"
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
      <div className="flex px-4 py-2 border-t-[0.33px] border-gray-400/80 dark:border-zark flex-1 grow-0 items-center justify-between gap-8">
        {/* Page number information */}
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
