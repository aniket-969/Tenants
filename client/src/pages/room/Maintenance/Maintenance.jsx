import { MaintenanceForm } from "@/components/form/MaintenanceForm";
import FormWrapper from "@/components/ui/formWrapper";
import { getSocket } from "@/socket";
import { useEffect, useState } from "react";

const Maintenance = ({ maintenance }) => {
  console.log(maintenance);
  const [maintenances, setMaintenances] = useState(maintenance);
  const socket = getSocket();

  useEffect(() => {
    const handleCreateMaintenance = (newMaintenance) => {
      console.log("create it");
      setMaintenances((prevMaintenance) => [
        ...prevMaintenance,
        newMaintenance,
      ]);
    };
    const handleUpdateMaintenance = (data) => {
      console.log(data);
    };
    socket.on("createMaintenance", handleCreateMaintenance);

    socket.on("updateMaintenance", handleUpdateMaintenance);

    return () => {
      socket.off("createMaintenance", handleCreateMaintenance);
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center m-5">
      {/* <div className="flex flex-col gap-3">
        {maintenances.map((data) => (
          <div key={data._id}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>{data.maintenanceProvider}</p>
            <p>{data.status}</p>
            <p>{data.costEstimate}</p>
          </div>
        ))}
      </div> */}
      <FormWrapper>
        <MaintenanceForm />
      </FormWrapper>
    </div>
  );
};

export default Maintenance;
