function getProject(projects: Project[], id: number): Project {
  const res = projects.find((p) => p.id == id)!;
  return res;
}
function getEmployee(employees: Employee[], id: number): Employee {
  return employees.find((e) => e.id == id)!;
}
function getUser(users: User[], id: number): User {
  return users.find((u) => u.id == id)!;
}

export { getProject, getEmployee, getUser };
