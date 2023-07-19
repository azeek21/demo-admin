import axios from "axios";

class Fetch {
  static async getEmployees(): Promise<Employee[]> {
    const res = await axios.get("http://192.168.1.38:8080/api/v1/employees");
    console.log("FETCHED EMPLOYEES: ", res.data);
    return [];
  }

  static async getProjects(): Promise<Project[]> {
    const res = await axios.get("http://192.168.1.38:8080/api/v1/projects");
    console.log("FETCHED PROJECTS: ", res.data);
    return [];
  }

  static async updateEmployee(employee: Employee): Promise<Employee> {
    const res = await axios.put(
      "http://192.168.1.38:8080/api/v1/employees/" + employee.id,
      employee
    );
    return {
      id: 1,
      name: "azeek",
      rating: 1,
      projectIds: [1],
    };
  }

  static async updateProject(project: Project): Promise<Project> {
    const res = await axios.put(
      "http://192.168.1.38:8080/api/v1/projects/" + project.id,
      project
    );
    return {
      id: 1,
      name: "Front",
      rating: 1,
      code: "ui",
      employeeIds: [1],
    };
  }

  static async deleteProject(project: Project): Promise<void> {
    await axios.delete(
      "http://192.168.1.38:8080/api/v1/projects/" + project.id
    );
  }

  static async deleteEmployee(employee: Employee): Promise<void> {
    await axios.delete(
      "http://192.168.1.38:8080/api/v1/employees/" + employee.id
    );
  }
}

export default Fetch;
