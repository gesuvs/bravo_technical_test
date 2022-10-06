import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { AxiosResponse } from "axios";
import { Button } from "./components/button";

type FacilitieResponse = {
  id: number;
  name: string;
};

type PriorityScoreResponse = {
  facility_id: number,
  nurse_id: number,
  priority_score: number
};

function App() {
  const [facilityId, setFacilityId] = useState("");

  const { data: facilitieData } = useQuery<AxiosResponse<FacilitieResponse[]>>(
    ["facilitie"],
    async () => {
      return await api.get("/facilitie");
    },
    {
      retry: false
    }
  );


  const { data: priorityScoredata } = useQuery<AxiosResponse<PriorityScoreResponse[]>>(
    ["priority-score", facilityId],
    async () => {
      return await api.get(`/priority-score/${facilityId}`);
    },
    {
      enabled: Boolean(facilityId),
    }
  );

  const mutateNurse = useMutation((value: string) => {
    return api.get(value)
  }, {
    onSuccess: (data) => {
      console.table(data.data);
    }
  })

  const [inputValue, setInputValue] = useState("");

  const resultsData = useMemo<FacilitieResponse[]>(() => {
    if (inputValue) {
      return facilitieData?.data.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      ) as FacilitieResponse[];
    }
    return [] as FacilitieResponse[];
  }, [inputValue]);


  const isClosedList = Boolean(facilityId);

  return (
    <div className="grid grid-cols-1 h-screen">
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl font-bold">Search Facilitie</p>
        <div className="flex flex-col">
          <div className="relative w-full">
            <input
              type="text"
              className="h-12 border-gray-300 border-[1px] px-4 outline-none mt-4"
              placeholder="search by some facilitie"
              onChange={({ currentTarget: { value } }) => {
                setInputValue(value);
                setFacilityId("")
              }}
            />
            <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
            {resultsData && !isClosedList && resultsData?.length > 0 && (
              <ul className="shadow-lgabsolute max-h-[200px] overflow-y-auto gap-[10px] m-1">
                {resultsData?.map((item: FacilitieResponse) => {
                  return (
                    <li
                      key={item.id}
                      id={String(item.id)}
                      className="cursor-pointer my-2 hover:bg-slate-300 flex items-center justify-center min-h-10 rounded-lg p-4 border-[1px] border-solid border-gray-300"
                      onClick={({ currentTarget: { id } }) => setFacilityId(id)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {priorityScoredata && priorityScoredata?.data?.length > 0 && (
          <ul className="shadow-lgabsolute max-h-[200px] overflow-y-auto gap-[10px] m-1 flex">
            {priorityScoredata.data?.map((item: PriorityScoreResponse) => {
              return (
                <li
                  key={item.nurse_id}
                  id={String(item.nurse_id)}
                  className="my-2 min-h-10 rounded-lg w-full p-4 border-[1px] border-solid border-gray-300"
                >
                  {item.priority_score}
                </li>
              );
            })}
          </ul>
        )}
        <div className="flex mt-8">
          <Button onClick={() => mutateNurse.mutate("/nurse")}>
            Execute Q4 Query
          </Button>
          <Button
            onClick={() => mutateNurse.mutate("/job")}
          >
            Execute Q5 Query
          </Button>
          <Button
            onClick={() => mutateNurse.mutate("/nurse-hired-jobs")}
          >
            Execute Q6 Query
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
