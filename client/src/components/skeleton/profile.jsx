import { Skeleton } from "@/components/ui/skeleton"

const Profile = ()=>{
    return (
        
        <div className="flex flex-col items-center gap-3">
        <div className="w-[5rem]">
          <Skeleton className="rounded-[2.4rem]"/>
        </div>
        <div className="flex gap-5">
          <h2>{data.fullName}</h2>
          <p>{data.username}</p>
        </div>
      </div>
    )
}