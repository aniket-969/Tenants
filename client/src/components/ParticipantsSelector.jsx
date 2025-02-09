import { useRoom } from "@/hooks/useRoom";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"

const ParticipantSelector = ({ onChange }) => {
  const [selected, setSelected] = useState([]);
  const { roomId } = useParams();
const participants = [
  {
      "_id": "6755933c7314896238c01d6e",
      "username": "sae@rer",
      "fullName": "Frontend developer",
      "avatar": "https://avatar.iran.liara.run/public/5"
  },
  {
      "_id": "67549ddf41800bca7286c7d3",
      "username": "test",
      "fullName": "me",
      "avatar": "https://avatar.iran.liara.run/public/60"
  },
  {
      "_id": "6769b27be51080a39035dec6",
      "username": "koala",
      "fullName": "Beear",
      "avatar": "https://avatar.iran.liara.run/public/37"
  },
  {
      "_id": "6769b27be51080a39035dec6",
      "username": "koala",
      "fullName": "Beear",
      "avatar": "https://avatar.iran.liara.run/public/37"
  },
  {
      "_id": "6769b27be51080a39035dec6",
      "username": "koala",
      "fullName": "Beear",
      "avatar": "https://avatar.iran.liara.run/public/37"
  },
]
    console.log(participants)
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
    <ScrollArea>
 <div className="grid gap-2 h-[12rem] py-1">
      {participants.map((user) => (
        <div
          key={user._id}
          onClick={() => toggleSelection(user)}
          className={`flex items-center space-x-2 cursor-pointer px-2 py-1 ${
            selected.some((id) => id === user._id)
              ? "bg-card text-card-foreground"
              : ""
          }`}
        >
          <img
            src={user.avatar}
            alt={`${user.fullName} avatar`}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold">{user.username}</p>
            <p
              className={`text-sm  ${
                selected.some((id) => id === user._id)
                  ? "bg-card text-card-foreground"
                  : "text-gray-500"
              }`}
            >
              {user.fullName}
            </p>
          </div>
        </div>
      ))}
    </div>
    </ScrollArea>
   
  );
};

export default ParticipantSelector;
