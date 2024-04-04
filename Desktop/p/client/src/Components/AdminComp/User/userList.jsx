import React, { useRef } from 'react';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { DataScroller } from 'primereact/datascroller';
import { Navigate, useNavigate } from 'react-router-dom';

import { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } from './usersApiSlice';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Search from '../../Search/search';
import { useSearchParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import DeleteUser from './deleteUser';
import UpdateUser from './updateUser';

const UserList = () => {

    const [formUpdate, setFormUpdate] = useState(false)
    const [formAdd, setFormAdd] = useState(false)

    const [_id, setId] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState('user')
    const [user, setUser] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const claer = () => {
        setEmail("")
        setPhone("")
        setPassword("")
        setUsername("")
        setName("")
        setRole("user")

    }
    const navigate = useNavigate()
    const q = searchParams.get("q")
    const toast = useRef(null);
    
    const [updatedUser, { isErrorup, isSuccessup, errorup }] = useUpdateUserMutation()
    const handleUpdate = (user) => {
        console.log({ _id, name, username, password, phone, email, role })
        updatedUser({ _id, name, username, password, phone, email, role })
        claer()

    }
    const [addUser, { isErrorAdd, isSuccessAdd, errorAdd }] = useAddUserMutation()
    const handleAdd = () => {
        console.log();
        addUser({ _id, name, username, password, phone, email, role })
        claer()
    }

    const sendToUpdate = (user) => {
        return <UpdateUser user={user} />
    }

    const sendToDelete = (user) => {
        return <DeleteUser _id ={user._id} />
    }
    const getSeverity = (role) => {
        switch (role.role) {
            case 'admin':
                return 'success';

            default:
                return 'danger';
        }
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.role} severity={getSeverity(rowData)}></Tag>
    }
    const {
        data: users,
        isLoading,
        isError,
        error
    } = useGetUsersQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    const filterData = !q ? [...users] : users.filter(u => u.name.indexOf(q) > -1)


    return (

        <div>
            <div align='center'><Button label="Add user" text onClick={() => { navigate('/admin/addUser') }} /></div>
         <Search placeholders={"search by user name"} />
        

        <DataTable value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Name" style={{ width: '25%' }}></Column>
            <Column field="username" header="Username" style={{ width: '25%' }}></Column>
            <Column field="email" header="Email" style={{ width: '25%' }}></Column>
            <Column field="role" header="Role" body={statusBodyTemplate} style={{ width: '25%' }}></Column>
            <Column body={sendToUpdate}></Column>
            <Column body={sendToDelete}></Column>

        </DataTable>
        </div>



    );
};
export default UserList;
