import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/")({
  component: Home,
  // loader: async () => await getTotalSpent(),
});

// export const getTotalSpent = createServerFn().handler(async () => {
//   const res = await fetch(`/api/expenses/total-spent`);
//   console.log(res, "res");
//   if (!res.ok) throw new Error("Failed to fetch TotalSpent");
//   return res.json();
// });

const getTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();

  if (!res.ok) throw new Error("Failed to fetch TotalSpent");
  return await res.json();
};

function Home() {
  const { data, isFetching } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <p>Hello there the angels from my nightmares</p>

      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>{isFetching ? "Loading..." : data?.total}</CardContent>
      </Card>
    </>
  );
}
