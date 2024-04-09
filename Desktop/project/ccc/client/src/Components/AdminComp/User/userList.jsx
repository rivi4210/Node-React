import React, { useRef } from 'react';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
// import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { DataScroller } from 'primereact/datascroller';
// import { ProductService } from './service/ProductService';
import { Navigate, useNavigate } from 'react-router-dom';

// import './Blog.css';
import { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } from './usersApiSlice';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Search from '../../Search/search';
import { useSearchParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';

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
    // useEffect(()=>{
    //     console.log(q);
    // },[searchParams])
    // const [deleteUser, { isErrorDel, isSuccessDel, errorDel }] = useDeleteUserMutation()
    // const handleDelete = (e) => {
    //     console.log(e);
    //     deleteUser(e)
    //     claer()
    // }

    const [updatedUser, { isErrorup, isSuccessup, errorup }] = useUpdateUserMutation()
    const handleUpdate = (user) => {
        // !name && setName(user.name)
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
    
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     users.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    // }, []);

    const getSeverity = (user) => {
        switch (user.role) {
            case 'admin':
                return 'success';

            default:
                return 'danger';
        }
    };
    const {
        data: users,
        isLoading,
        isError,
        error
    } = useGetUsersQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    const filterData = !q ? [...users] : users.filter(u => u.name.indexOf(q) > -1)
    const itemTemplate = (user, index) => {
        return (

            <div className="col-12" >
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{user.name}</div>
                            {/* <Rating value={product.username} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <span className="font-semibold">{user.username}</span>
                                </span>


                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <div className="font-semibold">{user.email}</div>
                                </span>

                            </div>
                            <div><Tag value={user.role} severity={getSeverity(user)}></Tag></div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-2 sm:gap-2" align='right'>
                            {/* <span className="text-2xl font-semibold">${product.price}</span> */}
                            {/* <form onSubmit={handleDelete(product._id)}> */}
                            {/* <Toast ref={toast} /> */}
                            {/* {console.log(toast)} */}
                            {/* <ConfirmPopup /> */}
                            <div className="card flex flex-wrap gap-2 justify-content-center">
                                {/* <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => confirm2(user._id)}></Button> */}
                               <DeleteUser _id={user._id}/>
                               <UpdateUser user={user}/>
                                {/* <Button icon="pi pi-trash" className="p-button-rounded" onClick={()=>{<DeleteUser _id={user._id}/>;console.log(user._id)}}></Button> */}
                                {/* <span><Button icon="pi pi-user-edit" className="p-button-rounded" onClick={() => { setUser(user); setFormUpdate(true); setId(user._id) }}></Button></span> */}
                            </div>
                            <form>
                                <Dialog
                                    visible={formUpdate}
                                    modal
                                    onHide={() => setFormUpdate(false)}
                                    content={({ hide }) => (
                                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                                            </svg>

                                            <div className="inline-flex flex-column gap-2">
                                                <InputText placeholder='Name' id="name" label="Name" defaultValue={user.name} className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setName(e.target.value)} ></InputText>
                                            </div>

                                            <div className="inline-flex flex-column gap-2">
                                                {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Username
                            </label> */}
                                                <InputText placeholder='Username' defaultValue={user.username} id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setUsername(e.target.value)}></InputText>
                                            </div>
                                            <div className="inline-flex flex-column gap-2">
                                                {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Password
                            </label> */}
                                                <InputText placeholder='Password' defaultValue={user.password} id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" onChange={(e) => setPassword(e.target.value)}></InputText>
                                            </div>
                                            <div className="inline-flex flex-column gap-2">
                                                {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label> */}
                                                <InputText placeholder='Email' id="email" defaultValue={user.email} label="Email" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setEmail(e.target.value)}></InputText>
                                            </div>

                                            <div className="inline-flex flex-column gap-2">
                                                {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label> */}
                                                <InputText placeholder='Phone' defaultValue={user.phone} id="phone" label="Phone" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setPhone(e.target.value)}></InputText>
                                            </div>
                                            <div className="inline-flex flex-column gap-2">
                                                {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label> */}
                                                <InputText placeholder='Role' id="role" defaultValue={user.email} label="Role" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setRole(e.target.value)}></InputText>
                                            </div>
                                            <div></div>

                                            <div className="flex align-items-center gap-2">
                                                <Button label="Update" onClick={(e) => { hide(e); handleUpdate(user) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                                <Button label="Cancel" onClick={(e) => { hide(e); claer(); console.log(username); }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                            </div>
                                        </div>
                                    )}
                                ></Dialog></form>
                            <Dialog
                                visible={formAdd}
                                modal
                                onHide={() => setFormAdd(false)}
                                content={({ hide }) => (
                                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                                        </svg>

                                        <div className="inline-flex flex-column gap-2">
                                            <InputText placeholder='Name' id="name" label="Name" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setName(e.target.value)} ></InputText>
                                        </div>

                                        <div className="inline-flex flex-column gap-2">
                                            {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Username
                            </label> */}
                                            <InputText placeholder='Username' id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setUsername(e.target.value)}></InputText>
                                        </div>
                                        <div className="inline-flex flex-column gap-2">
                                            {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Password
                            </label> */}
                                            <InputText placeholder='Password' id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" onChange={(e) => setPassword(e.target.value)}></InputText>
                                        </div>
                                        <div className="inline-flex flex-column gap-2">
                                            {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label> */}
                                            <InputText placeholder='Email' id="email" label="Email"
                                                //  aria-invalid={errors.mail ? "true" : "false"}
                                                className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setEmail(e.target.value)}></InputText>
                                        </div>
                                        <div className="inline-flex flex-column gap-2">
                                            {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label> */}
                                            <InputText placeholder='Phone' id="phone" label="Phone" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setPhone(e.target.value)}></InputText>
                                        </div>
                                        <div className="inline-flex flex-column gap-2">
                                            {/* <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label> */}
                                            <InputText placeholder='Role' id="role" label="Role" defaultValue='user' className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setRole(e.target.value)}></InputText>
                                        </div>


                                        <div className="flex align-items-center gap-2">
                                            <Button label="Add" onClick={(e) => { hide(e); handleAdd() }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                            <Button label="Cancel" onClick={(e) => { hide(e); claer(); console.log(username); }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                        </div>
                                    </div>
                                )}
                            ></Dialog>


                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // const listTemplate = (items) => {
    //     if (!items || items.length === 0) return null;

    //     let list = items.map((users, index) => {
    //         return itemTemplate(users, index);
    //     });

    //     return <div className="grid grid-nogutter">{list}</div>;
    // };

    return (
       
            <div className="card">
            <div align='center'><Button label="Add user" text onClick={() => { navigate('/admin/addUser') }} /></div>
            <Search placeholders={"search by user name"} />
            {/* <Search placeholder="search by user name"/> */}
            <DataScroller value={filterData} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />
        </div>




        // // {console.log(users)}
        //     {/* {users?users.map((user) => (
        //         <div className="card">
        //     <DataView value={users} listTemplate={listTemplate} />
        // </div>
        //     )):""} */}



    );
};
export default UserList;
