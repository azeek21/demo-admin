import { MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import AddBase from "./AddBase";
import { ChangeEvent, useState } from "react";
import Fetch from "../lib/lib";

const projects = [
  {
    id: 0,
    name: "Lena Mathis",
    rating: 0.5746,
    projectIds: [19, 31, 46, 23, 12, 26, 42, 16, 21, 38],
  },
  {
    id: 1,
    name: "Margret Monroe",
    rating: 1.189,
    projectIds: [48, 6, 4, 7, 32, 24, 43, 35, 13, 14],
  },
  {
    id: 2,
    name: "Harmon Sloan",
    rating: 4.0467,
    projectIds: [8, 24, 15, 9, 49, 39, 34, 26, 15, 32],
  },
  {
    id: 3,
    name: "Tricia Vargas",
    rating: 3.4528,
    projectIds: [31, 6, 10, 15, 12, 31, 23, 31, 16, 26],
  },
  {
    id: 4,
    name: "Valencia Glover",
    rating: 3.5504,
    projectids: [27, 8, 27, 23, 42, 1, 26, 5, 18, 17],
  },
];

export default function AddEmployee() {
  const [selecteds, setSelecteds] = useState<number[]>([]);
  const [employee, setEmployee] = useState({ name: "" });

  function handleChange(event: ChangeEvent<any>) {
    const {
      target: { value, name },
    } = event;
    console.log("CHANGE: ", value, name);
    if (typeof value == "string") {
      setEmployee((old) => ({
        ...old,
        [name]: value,
      }));
    } else {
      setSelecteds(value);
    }
    return;
  }

  async function handleCreate() {
    console.log("PROJECT: ", { ...employee, employeeIds: selecteds });
    return await Fetch.createEmployee({
      ...employee,
      projectIds: selecteds,
    } as Employee);
  }

  return (
    <AddBase title="Add employee" onSave={handleCreate} onCancel={() => {
     return; 
    }}>
      <TextField
        label="Name"
        required
        value={employee.name}
        name="name"
        onChange={handleChange}
      />
      <Select
        value={selecteds}
        renderValue={(selecteds) => {
          return projects
            .filter((e) => selecteds.includes(e.id))
            .map((e) => e.name)
            .join(", ");
        }}
        input={<OutlinedInput label="Select employees" />}
        multiple
        onChange={handleChange as any}
      >
        {projects.map((e) => (
          <MenuItem key={e.id} aria-label={e.name} value={e.id}>
            {e.name}
          </MenuItem>
        ))}
      </Select>
    </AddBase>
  );
}
