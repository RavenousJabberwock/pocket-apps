import { createFileRoute, redirect } from "@tanstack/react-router";

// The actual product is a static collection of self-contained HTML apps that
// live in /public/apps/. TanStack owns the site root ("/"), so we redirect the
// root straight to the static launcher page at /apps/.
export const Route = createFileRoute("/")({
  loader: () => {
    throw redirect({ href: "/apps/index.html" });
  },
  component: () => null,
});
