import { LinearProgress, MenuItem, Select, TextField } from "@mui/material";
import AddBase from "./AddBase";
import { ChangeEvent, useState } from "react";
import Fetch from "../lib/lib";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AddProject() {
  const [selecteds, setSelecteds] = useState<number[]>([]);
  const [project, setProject] = useState({ name: "", code: "" });
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery(["employees"], Fetch.getEmployees);
  const quertClient = useQueryClient();

  function handleChange(event: ChangeEvent<any>) {
    const {
      target: { value, name },
    } = event;
    if (typeof value == "string") {
      setProject((old) => ({
        ...old,
        [name]: value,
      }));
    } else {
      setSelecteds(value);
    }
    return;
  }

  async function handleCreate() {
    await Fetch.createProject({
      ...project,
      employeeIds: selecteds,
    } as Project);
    quertClient.invalidateQueries(["projects"]);
  }

  return (
    <AddBase
      title="Add project"
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
        value={project.name}
        name="name"
        onChange={handleChange}
      />
      <TextField
        label="Code"
        required
        value={project.code}
        name="code"
        onChange={handleChange}
      />
      <Select
        value={selecteds}
        variant="standard"
        placeholder="Select Employees"
        renderValue={(selecteds) => {
          if (isLoading) {
            return <LinearProgress />;
          }

          if (isError) {
            return "Failed to load employees";
          }

          return employees
            .filter((e) => selecteds.includes(e.id))
            .map((e) => e.name)
            .join(", ");
        }}
        // input={<TextField label="Select employees" />}
        multiple
        onChange={handleChange as any}
      >
        {employees &&
          employees.map((e) => (
            <MenuItem key={e.id} aria-label={e.name} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
      </Select>
    </AddBase>
  );
}
