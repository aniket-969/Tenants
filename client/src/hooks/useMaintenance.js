import {
  createMaintenance,
  deleteMaintenance,
  updateMaintenance,
} from "@/api/queries/maintenance";
import {
  addUserRequest,
  createRoom,
  getRoomData,
  adminResponse,
  updateRoom,
  deleteRoom,
} from "@/api/queries/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useMaintenance = (roomId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMaintenanceMutation = useMutation({
    mutationFn: (newMaintenanceData) =>
      createMaintenance(roomId, newMaintenanceData),
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "session"]);
    },
  });

  const updateMaintenanceMutation = useMutation({
    mutationFn: ({ maintenanceId, updatedData }) =>
      updateMaintenance(roomId, maintenanceId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "session"]);
    },
  });

  const deleteMaintenanceMutation = useMutation({
    mutationFn: (maintenanceId) => deleteMaintenance(roomId, maintenanceId),
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "session"]);
    },
  });

  return {
    createMaintenanceMutation,
    deleteMaintenanceMutation,
    updateMaintenanceMutation,
  };
};
