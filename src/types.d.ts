type Tcontact = {
  id: number;
  firstName: string;
  lastName: string;
  number: string;
  photo: string;
  email: string;
  location: string;
  createdAt: string;
};

type Project = {
  id: number;
  name: string;
  code: string;
  rating: number;
  employeeIds: numer[];
};

type Employee = {
  id: number;
  name: string;
  rating: number;
  projectIds: number[];
};

type Feedback = {
  id: number;
  from: string;
  team: string;
  grade: number;
  content: string;
  employees: number[];
};
