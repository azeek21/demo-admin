import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

interface ICustomGridProps {
  columns: GridColDef[];
  data: any;
  isLoading: boolean;
  gridHash: string;
  onRowEditStop?: (newValue: any) => Promise<any>;
}

export default function CustomGrid({
  columns,
  data,
  isLoading,
  onRowEditStop,
  gridHash,
}: ICustomGridProps) {
  const [initialState] = useState(() => {
    const cache = localStorage.getItem("datagrid" + gridHash);
    if (cache) {
      return JSON.parse(cache);
    }
    return null;
  });
  return (
    <>
      <DataGrid
        onStateChange={(params) => {
          try {
            localStorage.setItem("datagrid" + gridHash, JSON.stringify(params));
          } catch (error) {}
        }}
        initialState={initialState}
        columns={[...columns]}
        rows={data || []}
        pageSizeOptions={[5, 15, 30, 45, 60, 75, 90, 100]}
        loading={isLoading}
        sx={{ height: "80vh", mt: "20px" }}
        editMode="row"
        processRowUpdate={onRowEditStop}
        columnVisibilityModel={{ id: false }}
      />
    </>
  );
}
