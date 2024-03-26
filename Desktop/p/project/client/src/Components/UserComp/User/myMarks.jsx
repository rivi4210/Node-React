import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useGetExamQuery } from '../Exam/examApiSlice';


const MyMarks = ({ user }) => {
    const [products, setProducts] = useState([]);
    console.log(user._id);
    const {
        data: marks,
        isLoading,
        isError,
        error,
        refetch
    } = useGetExamQuery(user._id)

    // useEffect(() => {
    //     ProductService.getProductsMini().then(data => setProducts(data));
    // }, []);

    return (
        <>
            {console.log(marks)}
            {isLoading && <>return(<h1>Loding</h1>)</>}

            <div className="card">

                <DataTable value={marks} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="category" header="Category"></Column>
                    <Column field="level" header="Level"></Column>
                    <Column field="mark" header="Mark"></Column>
                </DataTable>
            </div></>
    )
}
export default MyMarks