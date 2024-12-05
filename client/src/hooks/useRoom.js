import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useRoom = ()=>{
    const queryClient = useQueryClient()

    const roomQuery = useQuery(["room"])
}