import { useForm } from "react-hook-form";
import { createRoomSchema } from "@/schema/roomSchema";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
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
import { Textarea } from "../ui/textarea";

export const RoomForm = () => {
 
  const onSubmit = (values) => {
    console.log(values);
  };

  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
      role: "",
    },
  });

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name of room" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description of room" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Enter description of room" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />



        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
