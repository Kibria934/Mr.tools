import React from 'react';
import { useParams } from 'react-router-dom';

const Purchase = () => {
    const {id}=useParams();
    console.log(id);
    
    return (
        <div className='lg:m-20'>
            <h4>thi is parchage</h4>
            <h4>thi is parchage</h4>
            <h4>thi is parchage</h4>
            <h4>thi is parchage</h4>
        </div>
    );
};

export default Purchase;