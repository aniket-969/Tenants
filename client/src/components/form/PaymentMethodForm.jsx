import { useForm } from "react-hook-form";
import { paymentMethodSchema } from "@/schema/authSchema";
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
import { useAuth } from "@/hooks/useAuth";

export const PaymentMethodForm = () => {
  const { addPaymentMutation } = useAuth();
  const onSubmit = async (values) => {
    console.log(values);
    return
    try {
      const response = await addPaymentMutation.mutateAsync(values);
      console.log(response);
      toast("Payment method added successful");
    } catch (error) {
      console.error("Error during adding payment method:", error);
    }
  };

  const form = useForm({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      
          appName: "",
          paymentId: "",
          type: "",
          qrImage: "",
        
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

        {/* app name */}
        <FormField
          control={form.control}
          name="appName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App name</FormLabel>
              <FormControl>
                <Input placeholder="App name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

{/* payment id */}
        <FormField
          control={form.control}
          name="paymentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="PaymentID" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Type" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* QR code */}
        <FormField
  control={form.control}
  name="qrImage"
  render={({ field }) => (
    <FormItem>
      <FormLabel>QR Image</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files[0];
            field.onChange(file); // Pass the file to the form
          }}
        />
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
