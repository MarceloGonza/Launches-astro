import { type Doc, type APISpaceXResponse } from "../types/api";

export const getLaunchBy = async ({ id }: { id: string }) => {
  const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);

  const launch = (await res.json()) as Doc;
  return launch;
};

export const getLatestLaunches = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
    //el query es para limitar y no traer todo
    method: "POST", //se usa asi por el query
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //llamada a la api. Javascript nativo
      query: {},
      options: {
        sort: {
          date_unix: "asc",
        },
        limit: 12,
      },
    }),
  });

  const { docs: launches } = (await res.json()) as APISpaceXResponse;
  return launches;
};
