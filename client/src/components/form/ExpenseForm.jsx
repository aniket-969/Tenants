import { useForm } from "react-hook-form";
import { createExpenseSchema } from "@/schema/expenseSchema";
import { zodResolver } from "./../../../node_modules/@hookform/resolvers/zod/src/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useExpense } from "@/hooks/useExpense";
import { useParams } from "react-router-dom";
import ParticipantSelector from "../ParticipantsSelector";
import { useRoom } from "@/hooks/useRoom";
import { Spinner } from "../ui/spinner";

export const ExpenseForm = () => {
  const { roomId } = useParams();
  const { createExpenseMutation } = useExpense();
  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>;
  }
  const participants = [
    ...(data.tenants || []),
    ...(data.landlord ? [data.landlord] : []),
  ];
  const onSubmit = async (values) => {
    console.log(values);
    return;
    try {
      const response = await createExpenseMutation.mutateAsync(values, roomId);
      console.log(response);
      toast("Expense issue added");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
 
  const form = useForm({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      name: "",
      totalAmount: "",
      imageUrl: "",
      dueDate: "",
      userExpense: [{
        userId:"",
        amountOwed:"",
      }],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="add title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="add total amount"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense Provider</FormLabel>
              <FormControl>
                <Input placeholder="add link of expense" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input  {...field} type="date" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userExpense"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Add Participants</FormLabel>
              <ParticipantSelector
                participants={participants}
                onChange={(selected) => form.setValue("userExpense", selected)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
