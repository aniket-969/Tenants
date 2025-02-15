import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFieldArray, useForm } from "react-hook-form";

const ExpenseParticipantSelector = ({
  participants,
  form,
  disabled = false,
}) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const handleParticipantSelect = (participant) => {
    // Check if participant is already selected
    const isAlreadySelected = fields.some(
      (field) => field.userId === participant._id
    );
    if (isAlreadySelected) return;

    // Add participant to form
    append({
      userId: participant._id,
      additionalCharges: [],
    });
  };

  const handleAddCharge = (participantId) => {
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

  const removeParticipant = (index) => {
    remove(index);
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[14rem] w-full rounded-md border p-4">
        <div className="space-y-4">
          {fields.map((field, index) => {
            const participant = participants.find(
              (p) => p._id === field.userId
            );
            if (!participant) return null;

            return (
              <div
                key={field.id}
                className="flex items-center justify-between space-x-2 bg-card p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={participant.avatar}
                    alt={`${participant.fullName} avatar`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{participant.username}</p>
                    <p className="text-sm text-gray-500">
                      {participant.fullName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddCharge(participant._id)}
                    disabled={disabled}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeParticipant(index)}
                    disabled={disabled}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Participant Selector */}
      <ScrollArea className="h-[14rem] w-full rounded-md border p-4">
        <div className="space-y-2">
          {participants.map((participant) => {
            const isSelected = fields.some(
              (field) => field.userId === participant._id
            );

            return (
              <div
                key={participant._id}
                onClick={() =>
                  !isSelected && handleParticipantSelect(participant)
                }
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-accent ${
                  isSelected ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <img
                  src={participant.avatar}
                  alt={`${participant.fullName} avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{participant.username}</p>
                  <p className="text-sm text-gray-500">
                    {participant.fullName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
