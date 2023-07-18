import employees from "./employees.json";
import projects from "./projects.json";
import feedbacks from "./feedbacks.json";

async function fetchProjects(): Promise<Project[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(projects as any);
    }, 1000);
  });
}

async function fetchEmployees(): Promise<Employee[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(employees as any);
    }, 1000);
  });
}

async function fetchFeedbacks(): Promise<Feedback[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(feedbacks as any);
    }, 1000);
  });
}

export { fetchProjects, fetchFeedbacks, fetchEmployees };
