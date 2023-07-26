import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ENDPOINT = {
  employees: BASE_URL + "employees",
  projects: BASE_URL + "projects",
  feedbacks: BASE_URL + "feedbacks",
  users: BASE_URL + "users",
};

class Fetch {
  static async getEmployees(): Promise<Employee[]> {
    const res = await axios.get(ENDPOINT.employees);
    return res.data;
  }

  static async getProjects(): Promise<Project[]> {
    const res = await axios.get(ENDPOINT.projects);
    return res.data;
  }

  static async getUsers(): Promise<User[]> {
    const res = await axios.get(ENDPOINT.users);
    return res.data;
  }

  static async getFeedbacks(): Promise<Feedback[]> {
    const res = await axios.get(ENDPOINT.feedbacks);
    return res.data;
  }

  static async updateEmployee(employee: Employee): Promise<Employee> {
    const res = await axios.put(
      ENDPOINT.employees + "/" + employee.id,
      employee
    );
    return res.data;
  }

  static async updateProject(project: Project): Promise<Project> {
    const res = await axios.put(ENDPOINT.projects + "/" + project.id, project);
    return res.data;
  }

  static async deleteProject(project: Project): Promise<void> {
    await axios.delete(ENDPOINT.projects + "/" + project.id);
  }

  static async deleteEmployee(employee: Employee): Promise<void> {
    await axios.delete(ENDPOINT.employees + "/" + employee.id);
  }

  static async createProject(project: Project) {
    const resp = await axios.post(ENDPOINT.projects, project);
    return resp.data;
  }

  static async createEmployee(employee: Employee) {
    const resp = await axios.post(ENDPOINT.employees, employee);
    return resp.data;
  }

  static async deleteFeedback(id: number) {
    await axios.delete(ENDPOINT.feedbacks + "/" + id);
    return true;
  }

  static async deleteUser(user: User) {
    await axios.delete(ENDPOINT.users + "/" + user.id);
    return true;
  }
}

export default Fetch;
