import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { getUser } from '../../utils/storage';
import { request, request2 } from '../../utils/request';
import { Rate } from 'antd';
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
      res.bookmarks.forEach((item) => {
        request2(
            '/businesses/' + item,
            {
            },
            'get',
        ).then(res2 => {
          console.log("res2===", res2);
          list.push(res2);
          setList([...list])
        })
      })

    })
  }, [])

  console.log("list===", list);
  return (
      <div className={style.container}>
        {list.map((item, i) => {
          return <div className={style.shopItem} key={i} >

            <div style={{display:"flex"}}>
              <img alt='' src={item.image_url} className={style.image}></img>

            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <span style={{color:"#333"}}>{item.name}</span>
              <Rate style={{marginTop:10}} value={item.rating}></Rate>
              <span style={{marginTop:10,color:"#666"}}>phone:{item.phone}</span>
              <span style={{marginTop:10,color:"#666"}}>location:{item.location && item.location.address1}</span>
              <span style={{marginTop:10,color:"#666"}}>price:{item.price}</span>
            </div>
          </div>
        })}
      </div>
  );
}