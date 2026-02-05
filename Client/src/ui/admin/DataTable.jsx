import { useState } from "react";

import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid/internals";
import { Ban, BanIcon, SquareArrowOutUpRight } from "lucide-react";

import TransitionsModal from "../../components/Modal";
import { useTheme } from "../../lib/hooks/useTheme";

const DataTable = () => {
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex h-full w-full items-center justify-start">
            <img
              className="h-7 w-7 rounded-full"
              src={
                params.row.img ||
                "https://images.unsplash.com/photo-1768517296837-2457934c92fb?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
        );
      },
    },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "profile",
      headerName: "Profile",
      width: 100,
      renderCell: () => {
        return (
          <div className="flex h-full items-center justify-start">
            <button>
              <SquareArrowOutUpRight width={18} strokeWidth={1.5} />
            </button>
          </div>
        );
      },
    },
    {
      field: "block",
      headerName: "Block",
      width: 100,
      renderCell: () => {
        return (
          <div className="flex h-full items-center justify-start">
            {/* <BanIcon width={18} strokeWidth={1.5} /> */}
            <TransitionsModal icon={BanIcon} width={18} strokeWidth={1.5} />
          </div>
        );
      },
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 24 },
    { id: 6, lastName: "Stark", firstName: "Tony", age: 25 },
    { id: 8, lastName: "Paulson", firstName: "Donna", age: 36 },
    { id: 9, lastName: "Specter", firstName: "Harvey", age: 20 },
  ];

  const paginationModel = { page: 0, pageSize: 15 };

  return (
    <div className="h-screen w-screen bg-white">
      {showModal && <TransitionsModal />}
      <Paper sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            border: 0,
            backgroundColor: theme === "dark" ? "#0e0e0e" : "",
            color: theme === "dark" ? "white" : "",

            // Header styling
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"} !important`,
              color: `${theme === "dark" ? "white" : "black"} !important`,
              borderColor: `${theme === "dark" ? "#333" : "#e0e0e0"} !important`,
            },

            // Header text styling
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },

            // Border styling
            "& .MuiDataGrid-cell": {
              borderColor: theme === "dark" ? "#333" : "#e0e0e0",
            },

            // Row hover effect
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#f9f9f9",
            },

            // Checkbox styling
            "& .MuiCheckbox-root": {
              color: theme === "dark" ? "white" : "black",
            },

            "MuiDataGrid-filler": {
              backgroundColor: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
              color: theme === "dark" ? "white" : "black",
              borderColor: theme === "dark" ? "#333" : "#e0e0e0",
            },

            "& MuiToolbar-root": {
              color: `${theme === "dark" ? "red" : "#e0e0e0"} !important`,
            },
          }}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
                size: "small",
                variant: "outlined",
              },
            },
          }}
        />
      </Paper>
    </div>
  );
};
export default DataTable;
