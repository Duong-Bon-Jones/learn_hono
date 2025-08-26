import { jsxs, Fragment, jsx } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/react/jsx-runtime.js';
import { B as Button } from './button-MwCcueRe.mjs';
import { a as api, c as cn } from './api-CNsel9bJ.mjs';
import { useQuery } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@tanstack/react-query/build/modern/index.js';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@radix-ui/react-slot/dist/index.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/class-variance-authority/dist/index.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/clsx/dist/clsx.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/node_modules/hono/dist/client/index.js';

function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const getTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("Failed to fetch TotalSpent");
  return await res.json();
};
function Home() {
  const {
    data,
    isFetching
  } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
    staleTime: 5 * 60 * 1e3
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { children: "Hello there the angels from my nightmares" }),
    /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Total spent" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Total amount you've spent" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Sign Up" }) })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: isFetching ? "Loading..." : data == null ? void 0 : data.total })
    ] })
  ] });
}

export { Home as component };
//# sourceMappingURL=index-CbgpFXsC.mjs.map
