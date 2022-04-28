import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Signup from "./screens/Signup/Signup";
import Signin from "./screens/Signin/Signin";
import Home from "./screens/Home/Home";
import EditProfile from "./screens/EditProfile/EditProfile";
import Profile from "./screens/Profile/Profile";
import CustomHeader from "./components/CustomHeader"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <div className="row">
          <CustomHeader></CustomHeader>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/profile" element={
            <Profile />
          } />
          <Route path="/profile/:id" element={
            <Profile />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
