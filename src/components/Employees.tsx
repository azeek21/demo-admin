import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import CustomGrid from "./CustomGrid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircularProgress, Container, IconButton, MenuItem, Typography } from "@mui/material";
import SelectButton from "./SelectButton";
import { Delete } from "@mui/icons-material";
import Fetch from "../lib/lib";
import AddEmployee from "./AddEmployee";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 300,
    flex: 1,
    editable: true,
  },
  {
    field: "rating",
    headerName: "Rating",
    minWidth: 100,
  },
];

export default function Employees() {
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery(["employees"], Fetch.getEmployees);

  const {
    data: projects,
    isLoading: isProjectsLoading,
    // isError: isProjectsError,
  } = useQuery(["projects"], Fetch.getProjects);

  const queryClient = useQueryClient();

  const additionalColumns: GridColDef[] = [
    {
      field: "projectIds",
      headerName: "Projects",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <SelectButton
            mainText={`Employee has ${params.row.projectIds.length} projects`}
          >
            {projects && params.row.projectIds.length > 0 ? (
              projects
                .filter((p) => params.row.projectIds.includes(p.id))
                .map((project: Project) => (
                  <MenuItem
                    onClick={() => {
                      console.log("ITEM CLICK: ", project.name);
                    }}
                  >
                    {project.name}
                    <IconButton sx={{ ml: "auto" }} onClick={() => {
                      // Fetch.deleteEmployee()
                    }}>
                      <Delete />
                    </IconButton>
                  </MenuItem>
                ))
            ) : isProjectsLoading ? (
              <CircularProgress />
            ) : (
              <MenuItem>User has no projects</MenuItem>
            )}
          </SelectButton>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          label="Delete"
          icon={<Delete />}
          onClick={async () => {
            await Fetch.deleteEmployee(params.row);
            queryClient.invalidateQueries(["employees"]);
          }}
        />,
      ],
    },
  ];

  if (isError) {
    return <Typography typography={'h1'} color={'error'}>Something went wrong</Typography>
  }

  return (
    <Container sx={{maxWidth: 1000, maxHeight: 800, position: 'relative'}}>
      <CustomGrid
        data={employees || []}
        columns={[...columns, ...additionalColumns]}
        isLoading={isLoading}
        onRowEditStop={async (updatedEmployee: Employee) => {
          const res = await Fetch.updateEmployee(updatedEmployee);
          return res;
        }}
      />
      <AddEmployee />
      </Container>
);
}
