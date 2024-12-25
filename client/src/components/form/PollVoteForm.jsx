import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePoll } from "@/hooks/usePoll";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const PollVoteForm = ({ poll }) => {
    
  const form = useForm();
  const {castVoteMutation} = usePoll()

  const onSubmit = async(values) => {
    const payload = {
        pollId:poll._id,
        optionId:values.optionId
    }
    console.log(payload);
    
    try {
        const response = await castVoteMutation.mutateAsync(payload);
        console.log(response);
        toast("Vote added successful");
      } catch (error) {
        console.error("Error during adding payment method:", error);
      }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="optionId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{poll.title}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {poll.options.map((option) => (
                    <FormItem
                      key={option._id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option._id} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.optionText}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Vote</Button>
      </form>
    </Form>
  );
};

export default PollVoteForm;
