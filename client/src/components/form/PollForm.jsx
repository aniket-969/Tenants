import { useForm } from "react-hook-form";
import { pollSchema } from "@/schema/PollSchema";
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
import { usePoll } from "./../../hooks/usePoll";
import { useParams } from "react-router-dom";
import { OptionSelector } from "../ui/OptionsField";

export const PollForm = () => {
  const { roomId } = useParams();
  const { createPollMutation } = usePoll();
  const onSubmit = async (values) => {
    console.log(values, roomId);
    return;
    try {
      const response = await createPollMutation.mutateAsync(values, roomId);
      console.log(response);
      toast("Poll issue added");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const form = useForm({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      title: "",
      voteEndTime: "",
      options: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Add Poll Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voteEndTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vote End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <OptionSelector control={form.control} name="options" />

        <Button type="submit">Create Poll</Button>
      </form>
    </Form>
  );
};
