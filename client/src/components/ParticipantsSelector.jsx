import { useRoom } from "@/hooks/useRoom";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useParams } from "react-router-dom";

const ParticipantSelector = ({ onChange, participants }) => {
  const [selected, setSelected] = useState([]);
  const { roomId } = useParams();

  //   console.log(participants)
  const toggleSelection = (participant) => {
    const isSelected = selected.some((p) => p.userId === participant._id);
    const updated = isSelected
      ? selected.filter((p) => p.userId !== participant._id)
      : [...selected, { userId: participant._id, amountOwed: 10 }];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className="grid gap-2">
      {participants.map((user) => (
        <div
          key={user._id}
          onClick={() => toggleSelection(user)}
          className={`flex items-center space-x-2 cursor-pointer ${
            selected.some((p) => p.userId === user._id) ? "bg-blue-100" : ""
          }`}
        >
          <img
            src={user.avatar}
            alt={`${user.fullName} avatar`}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-gray-500">{user.fullName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantSelector;