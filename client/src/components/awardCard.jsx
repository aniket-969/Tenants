

const AwardCard = ({title,description,image,criteria,assignedTo})=>{
    return(
        <div className="award-card border rounded shadow-md p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        {description && <p className="text-gray-600 mb-2">{description}</p>}
        {criteria && (
          <p className="text-sm text-gray-500 italic mb-2">Criteria: {criteria}</p>
        )}
        {assignedTo && (
          <p className="text-sm text-gray-500">Assigned To: {assignedTo}</p>
        )}
      </div>
    )
}

export default AwardCard