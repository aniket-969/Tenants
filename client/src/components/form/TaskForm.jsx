import { useForm } from "react-hook-form";
import { createRoomTaskSchema } from "@/schema/taskSchema";
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
import { useTask } from "@/hooks/useTask";
import { useState } from "react";
import ParticipantSelector from "../ParticipantsSelector";
import { Select,SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue, } from "../ui/select";

export const TaskForm = () => {
    const { roomId } = useParams();
    const { createTaskMutation } = useTask();
  
    const [isRecurring, setIsRecurring] = useState(false);
    const [participants, setParticipants] = useState([]);
  
    const onSubmit = async (values) => {
      console.log(values, roomId, participants);
      try {
        const response = await createTaskMutation.mutateAsync({
          data: { ...values, participants },
          roomId,
        });
        toast("Task added successfully!");
        console.log(response);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    };
  
    const form = useForm({
      resolver: zodResolver(createRoomTaskSchema),
      defaultValues: {
        title: "",
        description: "",
        currentAssignee: "",
        dueDate: "",
        participants: [],
        rotationOrder: "",
        priority: "",
        recurring: false,
        recurrencePattern: "",
        customRecurrence: "",
      },
    });
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Add title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Add description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Recurring Toggle */}
          <div className="flex items-center">
            <label className="mr-2">Recurring:</label>
            <Input
              type="checkbox"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
            />
          </div>
  
          {isRecurring && (
            <>
              <FormField
                control={form.control}
                name="recurrencePattern"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recurrence Pattern</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Daily, Weekly" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="customRecurrence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Recurrence</FormLabel>
                    <FormControl>
                      <Input placeholder="Add custom recurrence" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
  
          {/* Participants Selector */}
          <ParticipantSelector
            participants={/* Fetch participants dynamically */ []}
            onChange={(selected) => setParticipants(selected)}
          />
  
          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* End Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
  