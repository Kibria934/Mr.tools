import { useEffect, useState } from "react";

const UseToken = (user) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (user) {
      const email = user?.user?.email;
      const currentUser = { email: email };

      fetch(`https://mr-tools-server.vercel.app/user/${email}`, {
        method: "PUT",
        Headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const token = data.token;

          setToken(token);
          localStorage.setItem("accessToken", token);
        });
    }
  }, [user]);

  return [token];
};

export default UseToken;

// https://mr-tools-server.vercel.app/
