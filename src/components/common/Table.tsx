import React from "react";
import { useTheme } from "../../contexts/ThemeContext";


interface TableProps<T> {
  columns: { key: keyof T | string; label: string }[];
  data: T[];
  renderActions?: (item: T) => React.ReactNode;
  emptyMessage?: string
}

export const Table = <T extends { id: number | string }>({
  columns,
  data,
  renderActions,
  emptyMessage = "No data available.",
}: TableProps<T>) => {
  const { theme } = useTheme();

  if (data.length === 0) {
    return (
      <p
        className={`text-center ${theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="transition-colors duration-300 w-full h-full overflow-hidden rounded-2xl">

      <table
        className={`w-full table-fixed rounded-lg shadow-md break-words ${theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
          }`}
      >
        <thead
          className={`${theme === "dark"
            ? "bg-gray-700 text-gray-100"
            : "bg-blue-100 text-gray-700"
            }`}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="text-left py-3 px-4 font-medium truncate"
              >
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th
                className="py-3 px-4 font-semibold text-center tracking-wide 
            text-blue-600 uppercase border-l border-gray-200
            dark:text-blue-400 dark:border-gray-700"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={`border-b transition-colors duration-200 ${theme === "dark"
                ? "border-gray-700 hover:bg-gray-700"
                : "border-gray-200 hover:bg-blue-50"
                }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className="py-3 px-4 truncate align-top"
                >
                  {String((item as any)[col.key])}
                </td>
              ))}
              {renderActions && (
                <td className="py-3 px-4 text-center">{renderActions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};