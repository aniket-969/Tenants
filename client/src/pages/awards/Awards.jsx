import AwardCard from "./../../components/awardCard";

const Awards = () => {

    const awardsData = [
        {
          _id: "1",
          title: "Best Performer",
          description: "Awarded for outstanding performance.",
          image: "https://cdn-icons-png.flaticon.com/128/13461/13461118.png",
          criteria: "Consistent top performance in tasks.",
          assignedTo: "John Doe",
        },
        {
          _id: "2",
          title: "Team Player",
          description: "Awarded for excellent teamwork.",
          image: "https://cdn-icons-png.flaticon.com/128/1021/1021218.png",
          criteria: "Helping and supporting team members.",
          assignedTo: "Jane Smith",
        },
      ];

  return (
    <div className=" p-6">
      <h1 className="text-2xl font-bold mb-6">Awards</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {awardsData.map((award) => (
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
