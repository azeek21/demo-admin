import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ENDPOINT = {
  employees: BASE_URL + "employees",
  projects: BASE_URL + "projects/",
  feedbacks: BASE_URL + "feedbacks/",
  users: BASE_URL + "users/",
};

class Fetch {
  static async getEmployees(): Promise<Employee[]> {
    console.log("URL: ", ENDPOINT.employees);
    const res = await axios.get(ENDPOINT.employees);
    console.log("FETCHED EMPLOYEES: ", res.data);
    return res.data;
  }

  static async getProjects(): Promise<Project[]> {
    const res = await axios.get(ENDPOINT.projects);
    console.log("FETCHED PROJECTS: ", res.data);
    return [];
  }

  static async updateEmployee(employee: Employee): Promise<Employee> {
    await axios.put(ENDPOINT.employees + employee.id, employee);
    return {
      id: 1,
      name: "azeek",
      rating: 1,
      projectIds: [1],
    };
  }

  static async updateProject(project: Project): Promise<Project> {
    await axios.put(ENDPOINT.projects + project.id, project);
    return {
      id: 1,
      name: "Front",
      rating: 1,
      code: "ui",
      employeeIds: [1],
    };
  }

  static async deleteProject(project: Project): Promise<void> {
    await axios.delete(ENDPOINT.projects + project.id);
  }

  static async deleteEmployee(employee: Employee): Promise<void> {
    await axios.delete(ENDPOINT.employees + employee.id);
  }

  static async createProject(project: Project) {
    console.log("CREATING PROJECTS: ", project);
    const resp = await axios.post<Project>(ENDPOINT.projects);
    return resp.data;
  }

  static async createEmployee(employee: Employee) {
    console.log("CREATING EMPLOYESS: ", employee);
    const resp = await axios.post(ENDPOINT.employees);
    return resp.data;
  }
}

export default Fetch;
