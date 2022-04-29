import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Signup from "./screens/Signup/Signup";
import Signin from "./screens/Signin/Signin";
import Home from "./screens/Home/Home";
import EditProfile from "./screens/EditProfile/EditProfile";
import Profile from "./screens/Profile/Profile";
import Search from "./screens/Search/search";
import YelpDetails from "./screens/Details/yelp-details";
import CustomHeader from "./components/CustomHeader"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {SearchProvider} from "./context/search-context";
import {ProfileProvider} from "./context/profile-context";
import HomeScreen from "./screens/Home/HomeScreen";

function App() {
  return (
    <div className="container">
      <ProfileProvider>
      <SearchProvider>
      <BrowserRouter>
        <div className="row">
          <CustomHeader></CustomHeader>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeScreen/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/profile" element={
            <Profile />
          } />
          <Route path="/profile/:id" element={
            <Profile />
          } />
          <Route path="/search/:locationSearch/:businessSearch" element={<Search/>}/>
          <Route path="/details/:businessId" element={<YelpDetails/>}/>
        </Routes>
      </BrowserRouter>
      </SearchProvider>
      </ProfileProvider>
    </div>
  );
}

export default App;
