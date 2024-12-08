
import './App.css'
import ListRoomComponent from "./components/ListRoomComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RoomComponent from "./components/RoomComponent.jsx";

function App() {


  return (
    <>

      <BrowserRouter>
      <HeaderComponent/>
          <Routes>

              {/* // http://localhost:3000 */}
              <Route path='/' element = {<ListRoomComponent/>}></Route>

              {/* // http://localhost:3000/rooms */}
              <Route path='/rooms' element = {<ListRoomComponent/>}></Route>

              {/* // http://localhost:3000/add-room */}
              <Route path='/add-room' element = {<RoomComponent/>}> </Route>

              {/* // http://localhost:3000/edit-room/1 */}
              <Route path ='edit-room/:id' element = {<RoomComponent/>}> </Route>
          </Routes>

      <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
