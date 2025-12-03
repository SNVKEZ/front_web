import { Outlet } from "react-router-dom";

export default function ViewTransitionLayout() {
  return (
    <div style={{ viewTransitionName: "page" }}>
      <Outlet />
    </div>
  );
}
