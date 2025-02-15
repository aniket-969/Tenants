import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";

const ExpenseParticipantSelector = ({
  participants,
  form,
  disabled = false,
}) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectionOrder, setSelectionOrder] = useState({});

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const getParticipantsList = () => {
    // Get selected participants
    const selectedParticipants = participants.filter((participant) =>
      fields.some((field) => field.userId === participant._id)
    );

    // Sort selected participants by selection order
    selectedParticipants.sort(
      (a, b) => selectionOrder[a._id] - selectionOrder[b._id]
    );

    // Get unselected participants
    const unselectedParticipants = participants.filter(
      (participant) => !fields.some((field) => field.userId === participant._id)
    );

    return [...selectedParticipants, ...unselectedParticipants];
  };

  const handleParticipantSelect = (participant) => {
    const isSelected = fields.some((field) => field.userId === participant._id);

    if (isSelected) {
      // Remove participant
      const index = fields.findIndex(
        (field) => field.userId === participant._id
      );
      remove(index);

      // Remove from selection order
      setSelectionOrder((prev) => {
        const newOrder = { ...prev };
        delete newOrder[participant._id];
        return newOrder;
      });
    } else {
      // Add participant
      append({
        userId: participant._id,
        additionalCharges: [],
      });

      // Add to selection order
      setSelectionOrder((prev) => ({
        ...prev,
        [participant._id]: Date.now(),
      }));
    }
  };

  const handleAddCharge = (participantId, e) => {
    e.stopPropagation(); // Prevent triggering participant selection
    setSelectedParticipant(participantId);
    setIsDialogOpen(true);
  };

  const handleChargeSubmit = (data) => {
    const participantIndex = fields.findIndex(
      (p) => p.userId === selectedParticipant
    );
    if (participantIndex === -1) return;

    const currentParticipant = fields[participantIndex];
    const updatedCharges = [
      ...(currentParticipant.additionalCharges || []),
      {
        amount: Number(data.amount),
        reason: data.reason,
      },
    ];

    form.setValue(
      `participants.${participantIndex}.additionalCharges`,
      updatedCharges
    );
    setIsDialogOpen(false);
  };

  const removeParticipant = (index, e) => {
    e.stopPropagation(); // Prevent triggering participant selection
    const participant = fields[index];
    remove(index);

    // Remove from selection order
    setSelectionOrder((prev) => {
      const newOrder = { ...prev };
      delete newOrder[participant.userId];
      return newOrder;
    });
  };

  return (
    <div className="space-y-2">
      <ScrollArea className="h-[14rem] w-full rounded-md border p-2">
        {getParticipantsList().map((participant, index) => {
          const isSelected = fields.some(
            (field) => field.userId === participant._id
          );
          const fieldIndex = fields.findIndex(
            (field) => field.userId === participant._id
          );
          const field = isSelected ? fields[fieldIndex] : null;

          return (
            <div
              key={participant._id}
              onClick={() => handleParticipantSelect(participant)}
              className={`flex items-center justify-between space-x-2 p-2 rounded-lg cursor-pointer hover:bg-accent/50 mb-2 ${
                isSelected ? "bg-card text-card-foreground" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={participant.avatar}
                  alt={`${participant.fullName} avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{participant.username}</p>
                  <p
                    className={`text-sm ${isSelected ? "text-card-foreground" : "text-gray-500"}`}
                  >
                    {participant.fullName}
                  </p>
                  {field?.additionalCharges?.length > 0 && (
                    <p className="text-xs text-blue-500">
                      {field.additionalCharges.length} additional charge(s)
                    </p>
                  )}
                </div>
              </div>
              {isSelected && (
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleAddCharge(participant._id, e)}
                    disabled={disabled}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => removeParticipant(fieldIndex, e)}
                    disabled={disabled}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </ScrollArea>

      {/* Additional Charges Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Additional Charge</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleChargeSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Amount"
                {...form.register("amount")}
              />
              {form.formState.errors.amount && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Reason"
                {...form.register("reason")}
              />
              {form.formState.errors.reason && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.reason.message}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Charge</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseParticipantSelector;
