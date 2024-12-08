import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/authSchema";
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
import { loginUser } from "@/api/queries/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
const navigate = useNavigate()
  const onSubmit = async(values) => {
    console.log(values);
    try {
      const response = await loginUser(values)
      console.log(response)
      toast("User login successful")
      navigate("/room")
        
    } catch (error) {
      
    }
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username / Email</FormLabel>
              <FormControl>
                <Input placeholder="username or email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
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
