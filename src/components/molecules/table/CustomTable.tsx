import React from "react";

type CustomTable_TP = {
  isLoading: boolean;
  isSuccess: boolean;
  columns: {
    accessorKey: string;
    header: string;
    cell: (info: { row: { original: any } }) => React.ReactNode;
  }[];
  data: any[];
};

function CustomTable({ isLoading, isSuccess, columns, data }: CustomTable_TP) {
  return (
    <div className="w-full">
      {isLoading && <p className="text-center text-gray-500 py-4">Loading...</p>}
      {isSuccess && (
        <div className="relative w-full overflow-auto max-h-[420px] border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-900 font-semibold uppercase tracking-wide sticky top-0 z-10">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessorKey}
                    className="py-3 px-4 text-left"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-gray-100 hover:bg-blue-50 transition-colors duration-150 ease-in-out cursor-pointer"
                >
                  {columns.map((column) => (
                    <td
                      key={column.accessorKey}
                      className="py-2 px-4"
                    >
                      {column.cell({ row: { original: row } })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && !isSuccess && (
        <p className="text-center text-gray-500 py-4">No data available.</p>
      )}
    </div>
  );
}

export default CustomTable;