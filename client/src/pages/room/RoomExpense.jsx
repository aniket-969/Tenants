import { ExpenseForm } from '@/components/form/ExpenseForm'
import { getSocket } from '@/socket';
import { useEffect } from 'react';

const RoomExpense = ({data}) => {

  const socket = getSocket();

  useEffect(() => {
    const handleCreateExpense = (newExpense) => {
      console.log("create it");
    };

    socket.on("createdExpense", handleCreateExpense);

    return () => {
      socket.off("createdExpense", handleCreateExpense);
    };
  }, [socket]);


  return (
    <div className='flex justify-center flex-col items-center'>
      RoomExpense
      <ExpenseForm />
      </div>
  )
}

export default RoomExpense