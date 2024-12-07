import AwardCard from "../../components/awardCard";

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
          _id: "3",
          title: "Team Player",
          description: "Awarded for excellent teamwork.",
          image: "https://media.istockphoto.com/id/1168757141/vector/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition.jpg?s=612x612&w=0&k=20&c=ljsP4p0yuJnh4f5jE2VwXfjs96CC0x4zj8CHUoMo39E=",
          criteria: "Helping and supporting team members.",
          assignedTo: "Jane Smith",
        },
        {
          _id: "2",
          title: "Team Player",
          description: "Awarded for excellent teamwork.",
          image: "https://www.proframanujam.in/img/bg-img/award1.jpg",
          criteria: "Helping and supporting team members.",
          assignedTo: "Jane Smith",
        },
      ];

  return (
    <div className=" p-6 bgr">
        {/* Award heading */}
      <h1 className="text-2xl font-bold mb-6">Awards</h1>
      {/* Awards grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-10 content-center ">
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
