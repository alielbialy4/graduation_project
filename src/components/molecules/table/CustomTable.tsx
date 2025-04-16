import { Loader } from "@mantine/core";
import React from "react";

type RowData = Record<string, any>; // Replace with specific type if known

type CustomTable_TP = {
  isLoading: boolean;
  isSuccess: boolean;
  isError?: boolean;
  errorMessage?: string;
  columns: {
    accessorKey: string;
    header: string;
    cell: (info: { row: { original: RowData } }) => React.ReactNode;
  }[];
  data: RowData[];
};

function CustomTable({
  isLoading,
  isSuccess,
  isError,
  errorMessage,
  columns,
  data = [],
}: CustomTable_TP) {
  return (
    <div className="w-full">
      {isError && (
        <p className="text-center text-red-500 py-4">
          {errorMessage || "Failed to load data."}
        </p>
      )}
      {isSuccess && (
        <div className="relative w-full overflow-auto max-h-[420px] border border-gray-200 rounded-lg shadow-sm">
          <table
            className="w-full text-sm text-gray-700"
            aria-label="Data table"
          >
            <thead className="bg-gray-300 text-gray-900 font-semibold uppercase tracking-wide sticky top-0 z-10">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessorKey}
                    className="py-3 px-4 text-left"
                    scope="col"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="py-4 text-center">
                    <div className="flex justify-center items-center h-20">
                      <Loader
                        height={400}
                        width={400}
                        color={"#875a7b"}
                      />
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className="border-t border-gray-100 hover:bg-gray-200 bg-gray-100 transition-colors duration-150 ease-in-out cursor-pointer"
                  >
                    {columns.map((column) => (
                      <td key={column.accessorKey} className="py-2 px-4">
                        {column.cell({ row: { original: row } })}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && !isSuccess && !isError && (
        <p className="text-center text-gray-500 py-4">No data available.</p>
      )}
    </div>
  );
}

export default CustomTable;