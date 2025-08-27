import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    return { user: true };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <div>You have to login</div>;
  }

  return <Outlet />;
}
