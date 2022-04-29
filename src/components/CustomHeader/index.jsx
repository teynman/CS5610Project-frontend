import React, { useEffect, useState } from 'react';
import { Avatar, Button, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, saveUser,clear } from '../../utils/storage';
import SearchBar from "../SearchBar/search-bar";
import './index.css';
import { request } from '../../utils/request';

const { Header } = Layout;

function CustomHeader(props) {
  const navigate = useNavigate();
  const [curTab, setCurTab] = useState('dashboard');
  const token = localStorage.getItem('token');
  const user = getUser();
  const handleClick = (item, key) => {
    setCurTab(item);
    console.log(item, key);
  };
  const [profile, setProfile] = useState(null)

  
  useEffect(() => {
    if(user){
      request(
        '/api/users/user/' + user._id,
        {
        },
        'get',
      ).then(res => {
        setProfile(res)
      })
    }
   


  }, [])

  async function logout() {
    clear();
    window.location.href="/signin";
  }
  return (
    <Header>
      <div className="header-left">
        <div className="logo">
          <span>Yelp</span>
        </div>
      </div>
      <div className="w-75">
        <SearchBar/>
      </div>
      <div className="header-right">

        {props.right || (
          <>
            {!profile
              ? (<Button onClick={() => {
                navigate("/signin")
              }} type="primary" danger>
                Signin
              </Button>)
              : (
                <>
                  <Link to="/profile">
                    <Avatar src={profile.userAvatar || '/headimg.png'} />
                  </Link>
                  <Button style={{marginLeft:10}} onClick={() => logout()} type="primary" size='small' danger>
                    Exit
                  </Button>
                </>
              )}
          </>
        )}
      </div>
    </Header>
  );
}

CustomHeader.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

export default CustomHeader;
