import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const ExpenseParticipantSelector = ({ participants, onChange }) => {
  const [selected, setSelected] = useState([]);
  const [additionalCharges, setAdditionalCharges] = useState({});

  const toggleSelection = (participant) => {
    setSelected((prev) =>
      prev.includes(participant._id)
        ? prev.filter((id) => id !== participant._id)
        : [...prev, participant._id]
    );
  };

  const handleChargeChange = (id, key, value) => {
    setAdditionalCharges((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));

    onChange(
      Object.entries(additionalCharges).map(([userId, data]) => ({
        userId,
        ...data,
      }))
    );
  };

  return (
    <ScrollArea>
      <div className="grid gap-2 h-[14rem] py-2">
        {participants.map((user) => (
          <div
            key={user._id}
            className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-lg ${
              selected.includes(user._id) ? "bg-card text-card-foreground" : ""
            }`}
            onClick={() => toggleSelection(user)}
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
            {selected.includes(user._id) && (
              <div className="flex flex-col">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={additionalCharges[user._id]?.amount || ""}
                  onChange={(e) =>
                    handleChargeChange(
                      user._id,
                      "amount",
                      Number(e.target.value)
                    )
                  }
                />
                <Input
                  type="text"
                  placeholder="Reason"
                  value={additionalCharges[user._id]?.reason || ""}
                  onChange={(e) =>
                    handleChargeChange(user._id, "reason", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ExpenseParticipantSelector;
