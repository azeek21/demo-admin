import { GridColDef } from "@mui/x-data-grid"
import CustomGrid from "./CustomGrid"
import { useQueries, useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";

const users = [
    {
      "id": 0,
      "name": "Edwards"
    },
    {
      "id": 1,
      "name": "Mccullough"
    },
    {
      "id": 2,
      "name": "Berry"
    },
    {
      "id": 3,
      "name": "Leta"
    },
    {
      "id": 4,
      "name": "Logan"
    },
    {
      "id": 5,
      "name": "Jones"
    },
    {
      "id": 6,
      "name": "Lily"
    },
    {
      "id": 7,
      "name": "Nadia"
    },
    {
      "id": 8,
      "name": "Tia"
    },
    {
      "id": 9,
      "name": "Robyn"
    }
  ];


const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "User",
        editable: true,
        minWidth: 200,
        flex: 1,
        sortable: true,
        filterable: true,
    },
]

const fetchUsers = async () => {
    return users;
}

export default function Users() {
    const {data: users, isLoading, isError} = useQuery(['users'], fetchUsers);

    if (isError) {
        return <Typography typography={'h1'}>Something went wrong</Typography>
      }
    return (
        <>
        <CustomGrid 
        columns={columns}
        data={users}
        isLoading={isLoading}
        />
        </>
    )
}