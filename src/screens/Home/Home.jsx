import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getUser,saveUser } from '../../utils/storage';

export default function LoginForm(props) {

  const navigate = useNavigate();
  let user = getUser();
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [])

  return (
    <div className='login-wrapper' style={{ fontSize: 30 }}>
      Home
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func,
};
