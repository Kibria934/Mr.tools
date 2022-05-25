import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Loading from "../../../SharedPage/Loading";

const MakeAdmin = () => {
  const {
    isLoading,
    error,
    refetch,
    data: user,
  } = useQuery("user", () =>
    fetch(`http://localhost:5000/user`).then((res) => res.json())
  );
  if (isLoading) {
    <Loading></Loading>;
  }

  const handleAdmin = (email) => {
    console.log(email);
    fetch(`http://localhost:5000/admin/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Successfully made admin");
        } else {
          toast.error("Failed to make admin");
        }
        return res.json();
      })
      .then((data) => {
        refetch();
      });
  };

  return (
    <div class="overflow-x-auto">
      <table class="table lg:min-w-[700px]">
        <thead>
          <tr>
            <th></th>
            <th>Email</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((u, index) => (
            <tr key={u._id}>
              <th>{index + 1}</th>
              <td>{u?.email}</td>
              <td>
                {u.rol !== "admin" && (
                  <button
                    type=""
                    onClick={() => handleAdmin(u.email)}
                    className="btn btn-xs btn-secondary"
                  >
                    Make Admin
                  </button>
                )}
                <button
                  type=""
                  className="btn btn-xs ml-2 text-white bg-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {/* <!-- row 1 --> */}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
