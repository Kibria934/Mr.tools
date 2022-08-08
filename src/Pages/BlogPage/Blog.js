import React from "react";

const Blog = ({ children, head }) => {
  return (
    <div className="card lg:mx-auto mt-6 lg:w-[60vw] bg-base-100 shadow-2xl">
      <div className="card-body">
        <h2 className="card-title">{head}</h2>
        <p>{children} </p>
      </div>
    </div>
  );
};

export default Blog;
