import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import AllUsers from "./components/AllUsers";
import UpdateUser from "./components/UpdateUser"
import Settings from "./components/Settings"
import DeleteUser from "./components/DeleteUser"
import Error from "./components/Error";
const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<SignUp/>}/>
            <Route path="/home/*" element={<Homepage/>}/>
            <Route path="/allUser" element={<AllUsers/>}/>
            <Route path="/updateUser" element={<UpdateUser/>}/>
            <Route path="/deleteUser" element={<DeleteUser/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
        )
}


export default AppRoutes