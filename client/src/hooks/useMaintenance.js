import {
  createMaintenance,
  deleteMaintenance,
  updateMaintenance,
} from "@/api/queries/maintenance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMaintenance = (roomId) => {
  const queryClient = useQueryClient();

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
