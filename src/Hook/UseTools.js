import React from "react";
import { useQuery } from "react-query";

const UseTools = () => {
  const { isLoading, data: tools } = useQuery(["repoData"], () =>
    fetch("https://mr-tools-server.vercel.app/get-tools").then((res) =>
      res.json()
    )
  );
  return { isLoading, tools };
};

export default UseTools;
