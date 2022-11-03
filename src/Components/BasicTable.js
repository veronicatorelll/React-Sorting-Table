import React, { useMemo, useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { GlobalFilter } from './GlobalFilter'
import {SortingTable} from "./SortingTable"
import { FilteringTable } from './FilteringTable'
import { PaginationTable } from './PaginationTable'
import { COLUMNS } from './Columns'
import MOCK_DATA from './MOCK_DATA.json'
import "./table.css"






export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const sortingtable = useMemo(() => SortingTable, [])
    const filteringtable = useMemo(() => FilteringTable, [])
    const paginationtable = useMemo(() => PaginationTable, [])

   

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        rows, 
        state,
        setGlobalFilter,
        prepareRow,
    } = useTable({
        columns,
        data,
        sortingtable,
        filteringtable,
        paginationtable,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
    )

    const { globalFilter } = state
    const { pageIndex, pageSize } = state


  return (

    <>   
     <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
    <th {...column.getHeaderProps(column.getSortByToggleProps())}> {column.render('Header')}
    <span className='column-sorting'>
        {column.isSorted ? (column.isSortedDesc ? ' 🔼 ' : ' 🔽 ') : ''}

    </span>
     </th>
                    ))}

                    </tr>
))}

            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row)
                    return (
            <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                     return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>

                })}
                </tr>
                    )
                })}
                
            </tbody>
           
        </table>
        <div>
            <span className='page'>
                Page { ' '}
                <strong>
                    {pageIndex +1} of {pageOptions.length}
                </strong> {' '}
            </span>

            <span className='gotopage'>
            | Go to page: {''}
                <input className='gotopage-input' type= 'number'
                defaultValue={pageIndex +1}
                onChange={(e) => {
                    const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
                    gotoPage(pageNumber)
                }}
                ></input>
            </span>

            <select className='select-page'
            value={pageSize} 
            onChange={(e) => setPageSize(Number(e.target.value))}
            > 
            {[20, 50, 100, 200].map((pageSize) => (
                <option key={pageSize} value ={pageSize}>
                {pageSize}

                </option>

            ))}
            </select>
<span className='previous-button'>
            <button className='first-page' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
             {'<<'} 
             </button>

            <button className='previous' onClick={() => previousPage()} disabled={!canPreviousPage}> 
            Previous 
            </button>
            </span>

<span className='next-button'>
            <button className='next' onClick={() => nextPage()} disabled={!canNextPage}>
             Next 
             </button>

             <button className='last-page' onClick={() => gotoPage(pageCount -1)} disabled={!canNextPage}>
             {'>>'}
             </button>
             </span>
        </div>
        </>


  )
}