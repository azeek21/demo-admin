function getProject(projects: Project[], id: number) {
  const res = projects.find((p) => p.id == id);
  return res;
}
function getEmployee(employees: Employee[], id: number) {
  return employees.find((e) => e.id == id);
}
function getUser(users: User[], id: number) {
  return users.find((u) => u.id == id);
}

export { getProject, getEmployee, getUser };
