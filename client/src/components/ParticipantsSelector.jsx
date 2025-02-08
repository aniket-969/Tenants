import { useRoom } from "@/hooks/useRoom";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useParams } from "react-router-dom";

const ParticipantSelector = ({ onChange, participants }) => {
  const [selected, setSelected] = useState([]);
  const { roomId } = useParams();

  //   console.log(participants)
  console.log(selected);
  const toggleSelection = (participant) => {
    const isSelected = selected.includes(participant._id);
    const updated = isSelected
      ? selected.filter((id) => id !== participant._id)
      : [...selected, participant._id];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className="grid gap-2">
      {participants.map((user) => (
        <div
          key={user._id}
          onClick={() => toggleSelection(user)}
          className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-sm ${
            selected.some((id) => id === user._id) ? "bg-card text-card-foreground" : ""
          }`}
        >
          <img
            src={user.avatar}
            alt={`${user.fullName} avatar`}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-card-foreground">{user.fullName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantSelector;
