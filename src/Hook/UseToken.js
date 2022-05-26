import { useEffect, useState } from "react";

const UseToken = (user) => {
  console.log(user);
  
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (user) {
      
      const email = user?.user?.email;
      const currentUser = { email: email };
      console.log(currentUser);
      
      fetch(`https://peaceful-ridge-28382.herokuapp.com/user/${email}`, {
        method: "PUT",
        Headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
        const token = data.token;
        console.log(data.token);
        
        setToken(token)
        localStorage.setItem('accessToken',token)
        });
    }
    
  }, [user]);

  return [token];
};

export default UseToken;