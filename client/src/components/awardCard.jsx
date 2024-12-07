import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"

const AwardCard = ({title,description,image,criteria,assignedTo})=>{
    return(
        <Card className="w-full relative overflow-hidden bg-white group br">
      {/* Image */}
      <div className="relative flex justify-center ">
        <img src={image} alt={title} className="  object-cover rounded-t-md max-w-[50rem] h-[15rem] bb" />
      </div>

      {/* Star Sparkle Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sparkle-container">
          {/* Sparkles */}
          {[...Array(10)].map((_, index) => (
            <div key={index} className="sparkle" />
          ))}
        </div>
      </div>

      {/* Card Content */}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {criteria && <CardDescription>Criteria: {criteria}</CardDescription>}
      </CardHeader>
      <CardContent>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {assignedTo && (
          <p className="text-sm text-gray-500 mt-2">Assigned To: {assignedTo}</p>
        )}
      </CardContent>
    </Card>
    )
}

export default AwardCard