import { jsxs, jsx } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/react/jsx-runtime.js';
import { Slot } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@radix-ui/react-slot/dist/index.mjs';
import { cva } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/class-variance-authority/dist/index.mjs';
import { clsx } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/clsx/dist/clsx.mjs';
import { twMerge } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import { useState, useEffect } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/react/index.js';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
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
function Home() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    const getTotalSpent = async () => {
      const res = await fetch(`/api/expenses/total-spent`);
      if (!res.ok) throw new Error("Failed to fetch TotalSpent");
      const data = await res.json();
      setTotalSpent(data.total);
    };
    getTotalSpent();
  }, []);
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm mx-auto", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Total spent" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Total amount you've spent" }),
      /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Sign Up" }) })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: totalSpent })
  ] });
}

export { Home as component };
//# sourceMappingURL=index-BfRLoyiJ.mjs.map
