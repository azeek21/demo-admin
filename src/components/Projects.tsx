import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, CircularProgress, Container, IconButton, MenuItem, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { AddOutlined, Delete } from "@mui/icons-material";
import SelectButton from "./SelectButton";
import CustomGrid from "./CustomGrid";
import CustomDialog from "./CustomDialog";
import Fetch from "../lib/lib";
import AddProject from "./AddProject";

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
  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(["projects"], Fetch.getProjects);

  const {
    data: employees,
    isLoading: isEmployeesLoading,
    // isError: isEmployeesError,
  } = useQuery(["employees"], Fetch.getEmployees);

  const additionalColumns: GridColDef[] = [
    {
      field: "employeeIds",
      headerName: "Employees",
      editable: false,
      minWidth: 200,
      flex: 0.5,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <SelectButton mainText={`${params.row.employeeIds.length} employees`}>
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

            {employees && params.row.employeeIds.length > 0 ? (
              employees
                .filter((e) => params.row.employeeIds.includes(e.id))
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
          onClick={async () => {
            await Fetch.deleteProject(params.row);
            queryClient.invalidateQueries(["projects"]);
          }}
        />,
      ],
    },
  ];


 if (isError) {
  return <Typography typography={'h1'} color={'error'}>Something went wrong</Typography>
}

  return (
    <Container sx={{maxWidth: 1000, maxHeight: 800, position: "relative"}}>
      <CustomGrid
        data={projects || []}
        columns={[...columns, ...additionalColumns]}
        isLoading={isLoading}
        onRowEditStop={async (updatedProject: Project) => {
          const res = await Fetch.updateProject(updatedProject);
          queryClient.invalidateQueries(["projects"]);
          return res;
        }}
      />
      <CustomDialog
        isOpen={isDialogOpen}
        fetchData={async () => {
          const employees = await Fetch.getEmployees();
          const project = projects?.find((p) => p.id == projectIdRef.current);
          return employees.filter((e) => !project?.employeeIds.includes(e.id));
        }}
        onCancel={() => {
          if (confirm("Any changes will be discarded. Continue ?")) {
            setIsDialogOpen(false);
            return true;
          }
          return false;
        }}
        onApprove={async (addedIds: number[]) => {
          console.log("ADDED ID`S: ", addedIds);
          const project = projects?.find((p) => p.id == projectIdRef.current);
          if (project) {
            project.employeeIds = [...project.employeeIds, ...addedIds];
            console.log("SENDING: ", project);
            const res = await Fetch.updateProject(project);
            console.log("UPDATE RES: ", res);
            queryClient.invalidateQueries(["projects"]);
          }
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
      <AddProject />
      </Container>
  );
}
