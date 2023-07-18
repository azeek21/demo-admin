import { Link, useLocation } from "react-router-dom";

const routes = [
  { path: "/projects", name: "Projects" },
  { path: "/employees", name: "Employees" },
  { path: "/feedbacks", name: "Feddback" },
];

interface ICustomLinkProps {
  path: string;
  name: string;
  currentLocation: string;
}

function CustomLink({ path, name, currentLocation }: ICustomLinkProps) {
  const active = currentLocation == path;

  return (
    <Link
      to={path}
      style={{
        fontSize: "1.5rem",
        color: active ? "white" : "lightgrey",
        textDecoration: "none",
        textTransform: "capitalize",
        borderBottom: active ? "1px solid white" : "none",
      }}
    >
      {name}
    </Link>
  );
}

export default function Navigation() {
  const currentLocation = useLocation();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {routes.map((route) => (
        <CustomLink {...route} currentLocation={currentLocation.pathname} />
      ))}
    </div>
  );
}
