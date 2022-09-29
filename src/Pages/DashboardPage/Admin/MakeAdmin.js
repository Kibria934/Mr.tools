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
    fetch(`https://mr-tools-server.vercel.app/user`).then((res) => res.json())
  );
  if (isLoading) {
    <Loading></Loading>;
  }

  const handleAdmin = (email) => {
    fetch(`https://mr-tools-server.vercel.app/admin/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
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
    <div className="overflow-x-auto">
      <table className="table w-sm lg:min-w-[700px]">
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
                    className="btn  btn-xs text-center btn-secondary"
                  >
                    Make Admin
                  </button>
                )}
                {u.rol === "admin" && (
                  <span className=" lg:ml-2 text-primary">Admin</span>
                )}
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
