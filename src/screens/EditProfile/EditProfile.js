import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Radio } from 'antd';
import style from "./style.module.css";
import { request } from '../../utils/request';
import { getUser } from '../../utils/storage';

export default function EditProfile(props) {
  const [user, setUser] = useState({});

  useEffect(() => {

    request(
      '/api/users/user/' + getUser()._id,
      {
      },
      'get',
    ).then(res => {
      setUser(res)
    })
  }, [])


  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    let res = await request(
      '/api/users/user/' + user._id,
      user,
      'put',
    )
    if (res) {
      message.success("Signin success");
      window.location.href = "/profile";
    }

  };
  return (
    <div className={style.container}>
      <div className={style.caption}>Edit Profile</div>
      <Form
        style={{ width: "100%" }}
        name="normal_login"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={user}
        onFinish={onFinish}
      >
        <Form.Item
          label="First name"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            }
          ]}
        >
          <Input
            type="text"
            autoComplete='false'
            value={user.firstName}
            placeholder="First name"
            onChange={(event) => setUser({
              ...user,
              firstName: event.target.value,
            })}
          />
          <br />
        </Form.Item>
        <Form.Item
          label="Last name"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            placeholder="Last name"
            value={user.lastName}

            onChange={(event) => setUser({
              ...user,
              lastName: event.target.value,
            })}
          />
        </Form.Item>

        <Form.Item
          label="LivingIn"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            type="text"
            autoComplete='false'
            placeholder="LivingIn"
            value={user.livingIn}

            onChange={(event) => setUser({
              ...user,
              livingIn: event.target.value,
            })}
          />
          <br />
        </Form.Item>

        <Form.Item
          label="Hometown"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            type="text"
            autoComplete='false'
            value={user.hometown}

            placeholder="hometown"
            onChange={(event) => setUser({
              ...user,
              hometown: event.target.value,
            })}
          />
          <br />
        </Form.Item>

        <Form.Item
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Radio.Group onChange={(event) => setUser({
            ...user,
            gender: event.target.value,
          })} value={user.gender}>
            <Radio value={'male'}>Male</Radio>
            <Radio value={'female'}>Female</Radio>
            
          </Radio.Group>

          <br />
        </Form.Item>

        <Form.Item
          label="Hobby"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            type="text"
            autoComplete='false'
            placeholder="hobby"
            value={user.hobby}

            onChange={(event) => setUser({
              ...user,
              hobby: event.target.value,
            })}
          />
          <br />
        </Form.Item>

        <Form.Item
          label="Signature"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            type="text"
            autoComplete='false'
            placeholder="signature"
            value={user.signature}

            onChange={(event) => setUser({
              ...user,
              signature: event.target.value,
            })}
          />
          <br />
        </Form.Item>

        <Form.Item
          label="userAvatar"
          rules={[
            {
              required: true,
              message: 'Please input your userAvatar!',
            },
          ]}
        >
          <Input
            type="text"
            autoComplete='false'
            placeholder="userAvatar"
            value={user.userAvatar}

            onChange={(event) => setUser({
              ...user,
              userAvatar: event.target.value,
            })}
          />
          <br />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"

          >
            Submit
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
}

