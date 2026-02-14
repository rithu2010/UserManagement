import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import "./Table.css";

const Table = ({ data, onDelete, onEdit }) => {

  const columns = [

    {
      header: "S.No",
      cell: ({ row }) => row.index + 1,
    },

    {
      accessorKey: "name",
      header: "👤 Name",
    },

    {
      accessorKey: "email",
      header: "📧 Email",
    },

    {
      header: "✏ Edit",
      cell: ({ row }) => (
        <button
          className="edit-btn"
          onClick={() => onEdit(row.original)}
        >
          ✏ Edit
        </button>
      ),
    },

    {
      header: "🗑 Delete",
      cell: ({ row }) => (
        <button
          className="delete-btn"
          onClick={() => onDelete(row.original.id)}
        >
          🗑 Delete
        </button>
      ),
    },

  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (

    <div className="table-container">

      <table className="custom-table">

        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>

              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}

            </tr>
          ))}
        </thead>

        <tbody>

          {table.getRowModel().rows.map(row => (

            <tr key={row.id}>

              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default Table;