import Navbar from "../../components/user/UserNavbar";
import Footer from "../../components/user/UserFooter";
import { Outlet } from 'react-router-dom';

function UserMainPage() {
    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
export default UserMainPage;
