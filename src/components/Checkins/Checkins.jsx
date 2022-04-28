import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { getUser } from '../../utils/storage';
import { request } from '../../utils/request';
import moment from "moment";
export default function Checkins(props) {
  const navigate = useNavigate();

  const [list, setList] = useState([
    
  ]);
  useEffect(() => {
    let user = getUser();
    request(
      '/api/checkins/user/'+user._id,
      {
      },
      'get',
    ).then(res=>{
      console.log("res====",res)
      setList(res);
    });
  }, [])
  return (
    <div className={style.container}>
      {list.map((item, i) => {
        return <Card title={'checkin at '+item.businessName} key={i}
        className={style.cardItem} extra={<a href="#">More</a>}
        style={{ width: "100%" }}>
        <div className={style.dakaItem}>
          <div>{item.lastName} {item.firstName} at {moment(item.userReviewDate).format("MM-DD-YYYY HH:mm:ss")} checkin</div>
          <div>{item.shop}</div>
        </div>
      </Card>
      })}
    </div>
  );
}
