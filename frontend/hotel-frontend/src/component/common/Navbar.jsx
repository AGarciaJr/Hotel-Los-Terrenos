import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import serviceAPI from "../../service/serviceAPI";

function Navbar({ onHomeClick }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isClerk, setIsClerk] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const auth = await serviceAPI.isAuthenticated();
            const admin = await serviceAPI.isAdmin();
            const clerk = await serviceAPI.isClerk();
            const user = await serviceAPI.isUser();

            setIsAuthenticated(auth);
            setIsAdmin(admin);
            setIsClerk(clerk);
            setIsUser(user);
        }
        checkAuth();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm("Logout?");
        if (isLogout) {
            serviceAPI.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home" onClick={onHomeClick}>Hotel Los Terrenos</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" onClick={onHomeClick} activeClass="active">Home</NavLink></li>

                { isUser && <li><NavLink to="/rooms" activeClass="active">Rooms</NavLink></li> }
                { isUser && <li><NavLink to="/vacations" activeClass="active">Vacations</NavLink></li> }
                { isUser && <li><NavLink to="/find-reservation" activeClass="active">Find My Reservations</NavLink></li> }
                { isUser && <li><NavLink to="/profile" activeClass="active">Profile</NavLink></li> }

                { isClerk && <li><NavLink to="/clerk" activeClass="active">Clerk</NavLink></li> }
                { isClerk && <li><NavLink to="/clerk/rooms" activeClass="actice">All Rooms</NavLink></li>}

                { isAdmin && <li><NavLink to="/admin" activeClass="active">Admin</NavLink></li> }

                {!isAuthenticated && <li><NavLink to="/login" activeClass="active">Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/register" activeClass="active">Register</NavLink></li>}

                {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
