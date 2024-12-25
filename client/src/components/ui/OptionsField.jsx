import { useFieldArray, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export const OptionSelector = ({ control, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <FormLabel>Options</FormLabel>

      {/* Render the input fields for each option */}
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-center space-x-2">
          <FormItem>
            <FormControl>
              <Input
                placeholder={`Option ${index + 1}`}
                {...control.register(`${name}[${index}].value`)} // register the option's value
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* Remove button */}
          <Button type="button" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}

      {/* Add option button (only allows up to 6 options) */}
      {fields.length < 6 && (
        <Button type="button" onClick={() => append({ value: "" })}>
          Add Option
        </Button>
      )}

      {/* Optional: Show a message when max options (6) is reached */}
      {fields.length >= 6 && (
        <p className="text-sm text-gray-500 mt-2">
          You can only add up to 6 options.
        </p>
      )}
    </div>
  );
};
