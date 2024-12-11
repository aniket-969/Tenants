import { useForm } from "react-hook-form";
import { createCalendarEventSchema } from "@/schema/eventSchema";
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
import { useParams } from "react-router-dom";
import { useEvent } from "@/hooks/useEvent";

export const EventsForm = () => {
  const { roomId } = useParams();
  console.log(roomId)
  const { createEventMutation } = useEvent();
  const onSubmit = async (values) => {
    console.log(values,roomId);
    try {
      const response = await createEventMutation.mutateAsync({data:values,roomId});
      console.log(response);
      toast(" Events added");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const form = useForm({
    resolver: zodResolver(createCalendarEventSchema),
    defaultValues: {
        title: "",
        description: "",
        recurrencePattern: "",
        startDate: "",
        endDate: "",
      },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* title */}
        <FormField
          control={form.control}
          name="title"
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

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* recurrence pattern */}
        <FormField
          control={form.control}
          name="recurrencePattern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeats every-</FormLabel>
              <FormControl>
                <Input placeholder="add  " {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* start date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="add start date " {...field} type="date" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* end date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input placeholder="add end date" {...field} type="date" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
