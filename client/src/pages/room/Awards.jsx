import { useParams } from "react-router-dom";
import AwardCard from "../../components/awardCard";
import { useAward } from "@/hooks/useAwards";
import { Spinner } from "@/components/ui/spinner";
import { AwardsForm } from "@/components/form/AwardsForm";
import { useEffect, useState } from "react";
import { getSocket } from "@/socket";

const Awards = () => {
  const { roomId } = useParams();
  const { awardsQuery } = useAward();
  const [awards, setAwards] = useState([]);
  const { isLoading, data, isError } = awardsQuery(roomId);

  useEffect(() => {
    if (data) {
      setAwards(data);
    }
  }, [data]);


  const socket = getSocket();
  
    useEffect(() => {
      const handleCreateAward = (newAward) => {
        console.log("create it");
        setAwards((prevAward) => [...prevAward, newAward]);
      };
      socket.on("createAward", handleCreateAward);
  
      return () => {
        socket.off("createAward", handleCreateAward);
      };
    }, [socket]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div> Something went wrong. Please refresh or login again</div>;
  }

  return (
    <div className=" p-6 ">
      {/* Award heading */}
      <h1 className="text-2xl font-bold mb-6">Awards</h1>
      {/* Awards grid */}
      <div className="flex justify-center">
        <AwardsForm />
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-10 content-center ">
        {awards.map((award) => (
          <AwardCard
            key={award._id}
            title={award.title}
            description={award.description}
            image={award.image}
            criteria={award.criteria}
            assignedTo={award.assignedTo}
          />
        ))}
      </div>
    </div>
  );
};

export default Awards;
