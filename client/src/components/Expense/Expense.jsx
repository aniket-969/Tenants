import React from "react";
import { ExpenseForm } from "../form/ExpenseForm";
import { Spinner } from "../ui/spinner";
import { useRoom } from "@/hooks/useRoom";
import { useExpense } from "@/hooks/useExpense";
import { useParams } from "react-router-dom";
import FormWrapper from "../ui/formWrapper";

const Expense = () => {
    const { roomId } = useParams();
      const { createExpenseMutation } = useExpense(roomId);
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
  return (
    <div className="flex flex-col gap-6 w-full items-center ">
      <h2 className="font-bold text-xl">Create Task</h2>

      <FormWrapper>
        <ExpenseForm />
      </FormWrapper>
    </div>
  );
};

export default Expense;
