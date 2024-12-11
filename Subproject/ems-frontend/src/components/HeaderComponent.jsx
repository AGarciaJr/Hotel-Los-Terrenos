import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-dark'>
                    <Link to="/" className="navbar-brand">
                        Clerk's User Management System
                    </Link>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;