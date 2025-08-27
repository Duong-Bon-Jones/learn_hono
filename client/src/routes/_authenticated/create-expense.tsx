import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: RouteComponent,
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const createExpense = async (value: { title: string; amount: string }) => {
  const res = await api.expenses.$post({ json: value });

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
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["all-expenses"] }),
        queryClient.invalidateQueries({ queryKey: ["total-spent"] }),
      ]);

      navigate({ to: "/expenses" });
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      amount: "",
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="max-w-xl m-auto space-y-4"
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor="title">Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="Title"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="Amount"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-4">
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Create Expense"}
              </Button>
              <Button
                type="reset"
                variant={"secondary"}
                onClick={(e) => {
                  e.preventDefault();
                  form.reset();
                }}
              >
                Reset
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
}
