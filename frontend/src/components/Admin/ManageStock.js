// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import AdminBloodStock from './AdminBloodStock';
import AdminStatistics from './AdminStatistics';
import Navbar from '../Navbar';
import BloodStock from './BloodStock';

function ManageStock() { 

  return (
    <div>
      <Navbar name = 'Blood Bank Admin' route='admin-dashboard' />
      <AdminBloodStock />
      <BloodStock />
      <AdminStatistics />
    </div>
  );
}

export default ManageStock;
