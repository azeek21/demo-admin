import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface ICustomGridProps {
  columns: GridColDef[];
  error: boolean;
  data: any;
  isLoading: boolean;
}

export default function CustomGrid({
  columns,
  data,
  isLoading,
}: ICustomGridProps) {
  return (
    <>
      <DataGrid
        columns={columns}
        rows={data || []}
        pageSizeOptions={[5, 15, 30, 45, 60, 75, 90, 100]}
        loading={isLoading}
        sx={{ height: 600, mt: "20px" }}
        editMode="cell"
      />
    </>
  );
}
