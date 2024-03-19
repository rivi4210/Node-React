import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useGetUserQuery } from "./userApiSlice"
import MyMarks from "./myMarks"
import SignOut from "./signOut"
// import UpdateUser from "../../AdminComp/User/updateUser"
import UpdateUserUser from "./updateUser"

const MyAccount = () => {
    const {
        data: user,
        isLoading,
        isError,
        error,
        refetch
    } = useGetUserQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    console.log(user);
    return (
        <>
            {/* {console.log('card',user?.name)} */}

            <div className="col-12">
                <div>
                    <div className="flex flex-column xl:flex-row xl:align-items-center p-4 gap-5">
                        <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                                <div className="flex flex-column gap-1">
                                    <div>
                                        <span className="text-2xl font-bold text-1000">name:  </span>
                                        <span className="text-3xl font-bold  text-1200">{user?.name}</span>
                                    </div>

                                    <span className="text-2xl font-bold text-1000">username: {user?.username}</span>
                                </div>
                                <div className="flex flex-column gap-2">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag product-category-icon"></i>
                                        <span className="text-3xl font-semibold">{user?.email}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <UpdateUserUser user={user} refetch={refetch} />
                        <SignOut />

                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <MyMarks user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default MyAccount