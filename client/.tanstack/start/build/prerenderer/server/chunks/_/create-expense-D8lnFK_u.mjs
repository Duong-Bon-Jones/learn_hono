import { jsx, jsxs, Fragment } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/react/jsx-runtime.js';
import { B as Button } from './button-MwCcueRe.mjs';
import { a as api, c as cn } from './api-CNsel9bJ.mjs';
import * as LabelPrimitive from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@radix-ui/react-label/dist/index.mjs';
import { useNavigate } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@tanstack/react-router/dist/esm/index.js';
import { FormApi, functionalUpdate, FieldApi } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@tanstack/form-core/dist/esm/index.js';
import { useStore } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@tanstack/react-store/dist/esm/index.js';
import { useState, useEffect, useMemo } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/react/index.js';
import { useQueryClient, useMutation } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@tanstack/react-query/build/modern/index.js';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/@radix-ui/react-slot/dist/index.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/class-variance-authority/dist/index.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/clsx/dist/clsx.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import 'file://C:/Users/WBPC.VN/me/hono_fs/node_modules/hono/dist/client/index.js';

function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const useIsomorphicLayoutEffect = useEffect;
function useField(opts) {
  const [fieldApi] = useState(() => {
    const api2 = new FieldApi({
      ...opts,
      form: opts.form,
      name: opts.name
    });
    const extendedApi = api2;
    extendedApi.Field = Field;
    return extendedApi;
  });
  useIsomorphicLayoutEffect(fieldApi.mount, [fieldApi]);
  useIsomorphicLayoutEffect(() => {
    fieldApi.update(opts);
  });
  useStore(
    fieldApi.store,
    opts.mode === "array" ? (state) => {
      var _a;
      return [
        state.meta,
        Object.keys((_a = state.value) != null ? _a : []).length
      ];
    } : void 0
  );
  return fieldApi;
}
const Field = ({
  children,
  ...fieldOptions
}) => {
  const fieldApi = useField(fieldOptions);
  const jsxToDisplay = useMemo(
    () => functionalUpdate(children, fieldApi),
    /**
     * The reason this exists is to fix an issue with the React Compiler.
     * Namely, functionalUpdate is memoized where it checks for `fieldApi`, which is a static type.
     * This means that when `state.value` changes, it does not trigger a re-render. The useMemo explicitly fixes this problem
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, fieldApi, fieldApi.state.value, fieldApi.state.meta]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: jsxToDisplay });
};
function LocalSubscribe({
  form,
  selector,
  children
}) {
  const data = useStore(form.store, selector);
  return functionalUpdate(children, data);
}
function useForm(opts) {
  const [formApi] = useState(() => {
    const api2 = new FormApi(opts);
    const extendedApi = api2;
    extendedApi.Field = function APIField(props) {
      return /* @__PURE__ */ jsx(Field, { ...props, form: api2 });
    };
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ jsx(
        LocalSubscribe,
        {
          form: api2,
          selector: props.selector,
          children: props.children
        }
      );
    };
    return extendedApi;
  });
  useIsomorphicLayoutEffect(formApi.mount, []);
  useIsomorphicLayoutEffect(() => {
    formApi.update(opts);
  });
  return formApi;
}
function FieldInfo({
  field
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    field.state.meta.isTouched && !field.state.meta.isValid ? /* @__PURE__ */ jsx("em", { children: field.state.meta.errors.join(",") }) : null,
    field.state.meta.isValidating ? "Validating..." : null
  ] });
}
const createExpense = async (value) => {
  const res = await api.expenses.$post({
    json: value
  });
  if (!res.ok) {
    throw new Error("server error");
  }
};
function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries({
        queryKey: ["all-expenses"]
      }), queryClient.invalidateQueries({
        queryKey: ["total-spent"]
      })]);
      navigate({
        to: "/expenses"
      });
    }
  });
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0
    },
    onSubmit: ({
      value
    }) => {
      mutation.mutate(value);
    }
  });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, className: "max-w-xl m-auto space-y-4", children: [
    /* @__PURE__ */ jsx(form.Field, { name: "title", children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Title" }),
      /* @__PURE__ */ jsx(Input, { id: field.name, name: field.name, value: field.state.value, placeholder: "Title", onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value) }),
      /* @__PURE__ */ jsx(FieldInfo, { field })
    ] }) }),
    /* @__PURE__ */ jsx(form.Field, { name: "amount", children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "amount", children: "Amount" }),
      /* @__PURE__ */ jsx(Input, { id: field.name, name: field.name, value: field.state.value, type: "number", placeholder: "Amount", onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.valueAsNumber) }),
      /* @__PURE__ */ jsx(FieldInfo, { field })
    ] }) }),
    /* @__PURE__ */ jsx(form.Subscribe, { selector: (state) => [state.canSubmit, state.isSubmitting], children: ([canSubmit, isSubmitting]) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !canSubmit, children: isSubmitting ? "..." : "Create Expense" }),
      /* @__PURE__ */ jsx(Button, { type: "reset", variant: "secondary", onClick: (e) => {
        e.preventDefault();
        form.reset();
      }, children: "Reset" })
    ] }) })
  ] }) });
}

export { RouteComponent as component };
//# sourceMappingURL=create-expense-D8lnFK_u.mjs.map
