import React, { useState } from 'react';
import { Form, Input, Button, message, Radio, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { request } from '../../utils/request';

export default function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [admin, setAdmin] = useState(false);
  
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    if(!email){
      message.error("please input correct email");
      return;
    }
    if(!password){
      message.error("please input password");
      return;
    }

    if(!password){
      message.error("please input password");
      return;
    }
    
    let res = await request(
      '/api/signup',
      {
        email: email,
        password: password,
        admin:admin
      },
      'post',
    )
    if(res){
      message.success("Signup success");
      navigate("/signin");
    }
   
  };
  return (
    <div className={style.container}>
      <div className={style.caption}>Sign up</div>

      <Form
        name="normal_register"
        className="register-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          rules={[
            {
              required: true,
              type:"email",
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            type="text"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="UserEmail"
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Item>
        <Checkbox onChange={(e)=>{
          setAdmin(e.target.checked);
         
        }} checked={admin}>Admin</Checkbox>


        <Form.Item style={{marginTop:10}}>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Signup
          </Button>
          <span style={{ margin: '0 8px' }}>Or</span>
          <Link to="/signin">Sign now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

