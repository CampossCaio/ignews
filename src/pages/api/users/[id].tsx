import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const id = request.query;
  console.log(request.query);
  const users = [
    {
      id: 1,
      name: "Caio Campos",
    },
    {
      id: 2,
      name: "Laura Campos",
    },
    {
      id: 3,
      name: "Cassio Campos",
    },
  ];
  return response.json(users);
};
