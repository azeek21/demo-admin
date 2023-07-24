import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface ICustomGridProps {
  columns: GridColDef[];
  error: boolean;
  data: any;
  isLoading: boolean;
  onRowEditStop?: (newValue: any) => Promise<any>;
}

const inVisibleIdColumn: GridColDef = {
  field: "id",
  headerName: "",
  renderCell: () => "",
  maxWidth: 1,
  width: 1,
  filterable: false,
  editable: false,
  disableColumnMenu: true,
  hideSortIcons: true,
};

export default function CustomGrid({
  columns,
  data,
  isLoading,
  onRowEditStop,
}: ICustomGridProps) {
  return (
    <>
      <DataGrid
        columns={[inVisibleIdColumn, ...columns]}
        rows={data || []}
        pageSizeOptions={[5, 15, 30, 45, 60, 75, 90, 100]}
        loading={isLoading}
        sx={{ height: "80vh", mt: "20px" }}
        editMode="row"
        processRowUpdate={onRowEditStop}
        columnVisibilityModel={{ id: false }}
        sortModel={[{ field: "id", sort: "asc" }]}
      />
    </>
  );
}
