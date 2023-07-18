import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, fetchProjects } from "../mock/mockFetch";
import {
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import {
  AddOutlined,
  AddTwoTone,
  ArrowDropDown,
  Delete,
} from "@mui/icons-material";
import SelectButton from "./SelectButton";
import CustomGrid from "./CustomGrid";
import CustomDialog from "./CustomDialog";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Team",
    minWidth: 200,
    flex: 1,
    editable: true,
  },
  {
    field: "code",
    headerName: "code",
    minWidth: 100,
    flex: 0.5,
  },
  {
    field: "rating",
    headerName: "Rating",
    minWidth: 120,
  },
];

export default function Projects() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const projectIdRef = useRef(0);

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(["projects"], fetchProjects);

  const {
    data: employees,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useQuery(["employees"], fetchEmployees);

  const additionalColumns: GridColDef[] = [
    {
      field: "employees",
      headerName: "Employees",
      editable: false,
      minWidth: 200,
      flex: 0.5,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <SelectButton mainText={`${params.row.employees.length} employees`}>
            <MenuItem sx={{ position: "sticky" }}>
              <Button
                onClick={() => {
                  projectIdRef.current = params.row.id;
                  setIsDialogOpen(true);
                }}
              >
                Add project <AddOutlined sx={{ ml: 1 }} />
              </Button>
            </MenuItem>

            {employees && params.row.employees.length > 0 ? (
              employees
                .filter((e) => params.row.employees.includes(e.id))
                .map((employee: Employee) => (
                  <MenuItem>
                    {employee.name}
                    <IconButton sx={{ ml: "auto" }}>
                      <Delete />
                    </IconButton>
                  </MenuItem>
                ))
            ) : isEmployeesLoading ? (
              <CircularProgress />
            ) : (
              <MenuItem>No data</MenuItem>
            )}
          </SelectButton>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      minWidth: 80,
      align: "right",
      getActions: (params) => [
        <GridActionsCellItem
          label="Delete"
          icon={<Delete />}
          onClick={() => {
            console.log("delete click", params.row.id);
          }}
        />,
      ],
    },
  ];
  return (
    <>
      <CustomGrid
        data={projects || []}
        columns={[...columns, ...additionalColumns]}
        error={isError}
        isLoading={isLoading}
      />
      <CustomDialog
        isOpen={isDialogOpen}
        fetchData={async () => {
          const employees = await fetchEmployees();
          const project = projects?.find((p) => p.id == projectIdRef.current);
          return employees.filter((e) => !project?.employees.includes(e.id));
        }}
        onCancel={() => {
          if (confirm("Any changes will be discarded. Continue ?")) {
            setIsDialogOpen(false);
            return true;
          }
          return false;
        }}
        onApprove={async (data) => {
          return new Promise((res) => {
            setTimeout(() => {
              res();
            }, 2000);
          });
        }}
        cacheHash={"project-employees" + projectIdRef.current}
        close={() => {
          setIsDialogOpen(false);
        }}
        invalidateCache={async () => {
          return;
        }}
        title="Add Employees"
      />
    </>
  );
}
