import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import CustomGrid from "./CustomGrid";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, fetchProjects } from "../mock/mockFetch";
import { Button, CircularProgress, IconButton, MenuItem } from "@mui/material";
import SelectButton from "./SelectButton";
import { AddOutlined, Delete } from "@mui/icons-material";
import { Dispatch, MutableRefObject, useRef, useState } from "react";
import CustomDialog from "./CustomDialog";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 300,
    flex: 1,
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
  } = useQuery(["employees"], fetchEmployees);

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery(["projects"], fetchProjects);

  const additionalColumns: GridColDef[] = [
    {
      field: "projects",
      headerName: "Projects",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <SelectButton
            mainText={`Employee has ${params.row.projects.length} projects`}
          >
            {projects && params.row.projects.length > 0 ? (
              projects
                .filter((p) => params.row.projects.includes(p.id))
                .map((project: Project) => (
                  <MenuItem
                    onClick={() => {
                      console.log("ITEM CLICK: ", project.name);
                    }}
                  >
                    {project.name}
                    <IconButton sx={{ ml: "auto" }}>
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
          onClick={() => {
            console.log("DELETING: ", params.row.id);
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <CustomGrid
        data={employees || []}
        columns={[...columns, ...additionalColumns]}
        error={isError}
        isLoading={isLoading}
      />
    </>
  );
}
