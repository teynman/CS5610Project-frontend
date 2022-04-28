import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { getUser } from '../../utils/storage';
import { request } from '../../utils/request';
export default function Friends(props) {
  const navigate = useNavigate();
  const [list, setList] = useState([
    
  ]);
  useEffect(() => {
    let user = getUser();
    request(
      '/api/followings/user/' + user._id,
      {
      },
      'get',
    ).then(res => {
      console.log("user===",user);
      res.following.forEach((item)=>{
        request(
          '/api/users/user/' + item,
          {
          },
          'get',
        ).then(res2 => {
          list.push(res2);
          setList([...list])
        })
      })
    })
  }, [])
  return (
    <div className={style.container}>
      {list.map((item, i) => {
        return <div title="checkin"
          key={i}
          className={style.user} onClick={()=>{
            window.location.href=("/profile/"+item._id)
          }}>
          <Avatar size={60} src={item.userAvatar || '/headimg.png'} />
          <div className={style.right}>
            <div className={style.name}>{item.lastName}{item.firstName}</div>
            <div className={style.hometown}>{item.hometown}</div>
          </div>
        </div>

      })}
    </div>
  );
}
