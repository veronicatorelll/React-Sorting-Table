import './App.css';
import React from 'react';

import { SortingTable } from "./Components/SortingTable"
import { FilteringTable } from "./Components/FilteringTable"
import { PaginationTable } from "./Components/PaginationTable"
import { BasicTable } from "./Components/BasicTable"



function App() {
  return (
    <div>
    <BasicTable />
    </div>
  );
}

export default App;
