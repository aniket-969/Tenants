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
      queryClient.invalidateQueries(["room", roomId]);
    },
  });
 
  const updateMaintenanceMutation = useMutation({
    mutationFn: ({ maintenanceId, updatedData }) =>
      updateMaintenance(roomId, maintenanceId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["room", roomId]);
    },
  });

  const deleteMaintenanceMutation = useMutation({
    mutationFn: (maintenanceId) => deleteMaintenance(roomId, maintenanceId),
    onSuccess: () => {
      queryClient.invalidateQueries(["room", roomId]);
    },
  });

  return {
    createMaintenanceMutation,
    deleteMaintenanceMutation,
    updateMaintenanceMutation,
  };
};
