import { LinearProgress, MenuItem, Select, TextField } from "@mui/material";
import AddBase from "./AddBase";
import { ChangeEvent, useState } from "react";
import Fetch from "../lib/lib";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AddEmployee() {
  const [selecteds, setSelecteds] = useState<number[]>([]);
  const [employee, setEmployee] = useState({ name: "" });
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(["projects"], Fetch.getProjects);
  const quertClient = useQueryClient();
  function handleChange(event: ChangeEvent<any>) {
    const {
      target: { value, name },
    } = event;
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
    await Fetch.createEmployee({
      ...employee,
      projectIds: selecteds,
    } as Employee);

    quertClient.invalidateQueries(["employees"]);
  }

  return (
    <AddBase
      title="Add employee"
      onSave={handleCreate}
      onCancel={() => {
        return confirm(
          "Changes you made will be cancelled if you cancel without saving. Are you sure to cancel ?"
        );
      }}
    >
      <TextField
        label="Name"
        required
        value={employee.name}
        name="name"
        onChange={handleChange}
      />
      <Select
        value={selecteds}
        variant="standard"
        renderValue={(selecteds) => {
          if (isLoading) {
            return <LinearProgress />;
          }
          if (isError) {
            return "Failed to laod projects";
          }

          return projects
            .filter((e) => selecteds.includes(e.id))
            .map((e) => e.name)
            .join(", ");
        }}
        multiple
        onChange={handleChange as any}
      >
        {projects ? (
          projects.map((e) => (
            <MenuItem key={e.id} aria-label={e.name} value={e.id}>
              {e.name}
            </MenuItem>
          ))
        ) : (
          <LinearProgress />
        )}
      </Select>
    </AddBase>
  );
}
