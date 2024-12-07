import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"

const AwardCard = ({title,description,image,criteria,assignedTo})=>{
    return(
        <Card className="w-full">
      <img src={image} alt={title} className="h-40 w-full object-cover rounded-t-md" />
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