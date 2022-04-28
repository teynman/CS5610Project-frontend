import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { getUser } from '../../utils/storage';
import { request } from '../../utils/request';
export default function Bookmarks(props) {
  const navigate = useNavigate();

  const [list, setList] = useState([
    
  ]);
  useEffect(() => {
    let user = getUser();
    request(
      '/api/bookmarks/user/' + user._id,
      {
      },
      'get',
    ).then(res => {
      setList(res.bookmarks)
    })
  }, [])
  return (
    <div className={style.container}>
      {list.map((item, i) => {
        return <div className={style.shopItem} key={i} >
          {item}
        </div>
      })}
    </div>
  );
}