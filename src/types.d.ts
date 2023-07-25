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
  userId: number;
  projectId: number;
  employeeIds: number[];
  grade: number;
  comment: string;
  created: string;
};

type User = {
  id: number;
  name: string;
  projectId: number;
};

type LoginData = {
  login: string;
  password: string;
};
