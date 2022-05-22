import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h3>This is dashboard</h3>
            <h3>This is dashboard</h3>
            <h3>This is dashboard</h3>
            <h3>This is dashboard</h3>
            <h3>This is dashboard</h3>
            <h3>This is dashboard</h3>
            <h3>This is dashboard</h3>
            <button type="" ><Link to='/dashboard/myProfile'>myProfile</Link></button>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;