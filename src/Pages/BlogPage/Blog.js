import React from 'react';

const Blog = ({children,head}) => {
    return (
        <div class="card lg:mx-auto mt-6 lg:w-[60vw] bg-base-100 shadow-2xl">
        <div class="card-body">
          <h2 class="card-title">{head}</h2>
          <p>{children} </p>
        </div>
      </div>
    );
};

export default Blog;