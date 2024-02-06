import { useQuery } from "@tanstack/vue-query";
import CovidService from "./CovidService";

export function useGetContries() {
    return useQuery({
        queryKey: ['covidContries'],
        queryFn:() => CovidService.findAll(),
    })
}