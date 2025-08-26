import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: RouteComponent,
});

const getAllExpenses = async () => {
  const res = await api.expenses.$get();

  if (!res.ok) throw new Error("Failed to fetch TotalSpent");
  return await res.json();
};

const getTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();

  if (!res.ok) throw new Error("Failed to fetch TotalSpent");
  return await res.json();
};

function RouteComponent() {
  const { data: expensesData, isFetching } = useQuery({
    queryKey: ["all-expenses"],
    queryFn: getAllExpenses,
    staleTime: 5 * 60 * 1000,
  });

  const { data: totalSpentData } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
    staleTime: 5 * 60 * 1000,
  });

  if (isFetching) {
    return "Loading...";
  }

  return (
    <Table className="max-w-3xl m-auto">
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expensesData?.expenses.map(({ amount, id, title }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell className="font-medium">{title}</TableCell>
            <TableCell>{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{totalSpentData?.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
