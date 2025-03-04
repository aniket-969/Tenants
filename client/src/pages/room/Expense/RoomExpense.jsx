import { ExpenseForm } from "@/components/form/ExpenseForm";
import FormWrapper from "@/components/ui/formWrapper";
import { Spinner } from "@/components/ui/spinner";
import { useExpense } from "@/hooks/useExpense";
import { useRoom } from "@/hooks/useRoom";
import { getSocket } from "@/socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomExpense = () => {
  
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
      <h2 className="font-bold text-xl">Split Expense</h2>

      <FormWrapper>
        <ExpenseForm participants={participants} />
      </FormWrapper>
    </div>
  );
};

export default RoomExpense;
