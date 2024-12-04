import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const AvatarSelector = ({ onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const avatars = Array.from({ length: 50 }, (_, i) => `https://avatar.iran.liara.run/public/${2 * i + 1}`);

  const handleConfirm = () => {
    if (selectedAvatar) {
      onSelect(selectedAvatar);
      setIsDialogOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Select Avatar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <VisuallyHidden>Choose an avatar</VisuallyHidden>
        </DialogTitle>
        <div className="grid grid-cols-5 gap-4 max-h-48 overflow-y-auto">
          {avatars.map((url) => (
            <Card
              key={url}
              onClick={() => setSelectedAvatar(url)}
              className={`cursor-pointer p-2 ${
                selectedAvatar === url ? "border-2 border-blue-500" : ""
              }`}
            >
              <img src={url} alt={`Avatar ${url.split('/').pop()}`} className="w-full h-full rounded-full" />
            </Card>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
