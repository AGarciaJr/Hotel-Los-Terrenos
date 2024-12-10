import React, {useState} from "react";
import RoomSearch from "../common/RoomSearch";
import RoomResult from "../common/RoomResult";

const HomePage = () =>{

    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    }

    return(
        <div className="home">
            {/* Header / Banner Room Section */}
            <section>
                <header className="header-banner">
                    <img src="" alt="" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Bienvenidos a <span className="terrenos-color">Hotel Los Terrenos</span>
                        </h1><or/>
                        <h3>Start your journey.</h3>
                    </div>
                </header>
            </section>

            {/* Search/Find available rooms. */}
            <RoomSearch handleSearchResult={handleSearchResult}/>
            <RoomResult roomSearchResults={roomSearchResults}/>

            <h4><a className="view-rooms-home" href="/rooms">All Rooms</a></h4>

            <h2 className="home-services">Services at <span className="terrenos-color">Hotel Los Terrenos</span></h2>

            {/* Services Section */}

            <section className="service-section">
                <div className="service-card">
                    <img src="" alt="" />
                    <div className="service-details">
                    <h3 className="service-title">Service</h3>
                    <p className="service-description">Describe the service</p>
                    </div>
                </div>

                <div className="service-card">
                    <img src="" alt="" />
                    <div className="service-details">
                    <h3 className="service-title">Service</h3>
                    <p className="service-description">Describe the service</p>
                    </div>
                </div>

                <div className="service-card">
                    <img src="" alt="" />
                    <div className="service-details">
                    <h3 className="service-title">Service</h3>
                    <p className="service-description">Describe the service</p>
                    </div>
                </div>

                <div className="service-card">
                    <img src="" alt="" />
                    <div className="service-details">
                    <h3 className="service-title">Service</h3>
                    <p className="service-description">Describe the service</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;