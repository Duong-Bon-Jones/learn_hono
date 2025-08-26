import { jsxs, jsx } from 'react/jsx-runtime';
import { a as api, c as cn } from './api-CNsel9bJ.mjs';
import { useQuery } from '@tanstack/react-query';
import 'clsx';
import 'tailwind-merge';
import 'hono/client';

function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCaption({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("text-muted-foreground mt-4 text-sm", className),
      ...props
    }
  );
}
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
  const {
    data: expensesData,
    isFetching
  } = useQuery({
    queryKey: ["all-expenses"],
    queryFn: getAllExpenses,
    staleTime: 5 * 60 * 1e3
  });
  const {
    data: totalSpentData
  } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
    staleTime: 5 * 60 * 1e3
  });
  if (isFetching) {
    return "Loading...";
  }
  return /* @__PURE__ */ jsxs(Table, { className: "max-w-3xl m-auto", children: [
    /* @__PURE__ */ jsx(TableCaption, { children: "A list of your recent expenses." }),
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: "ID" }),
      /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsx(TableHead, { children: "Amount" })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: expensesData == null ? void 0 : expensesData.expenses.map(({
      amount,
      id,
      title
    }) => /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: id }),
      /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: title }),
      /* @__PURE__ */ jsx(TableCell, { children: amount })
    ] }, id)) }),
    /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: "Total" }),
      /* @__PURE__ */ jsx(TableCell, { children: totalSpentData == null ? void 0 : totalSpentData.total })
    ] }) })
  ] });
}

export { RouteComponent as component };
//# sourceMappingURL=expenses-BIOC5_u_.mjs.map
