import React, { useEffect, useState } from 'react';
import { Rate, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { getUser } from '../../utils/storage';
import { request } from '../../utils/request';
import moment from "moment";

export default function Ratings(props) {
  const navigate = useNavigate();

  const [list, setList] = useState([

  ]);
  useEffect(() => {
    let user = getUser();
    request(
      '/api/reviews/user/' + user._id,
      {
      },
      'get',
    ).then(res => {
      console.log("res====", res)
      setList(res)
    });
  }, [])
  return (
    <div className={style.container}>
      {list.map((item, i) => {
        return <Card className={style.cardItem} title={item.businessName} key={i} extra={<a href="#">More</a>} style={{ width: "100%" }}>
          <div className={style.shopItem}>
            <Rate allowHalf defaultValue={item.userReviewRating} />
            <div style={{ marginTop: 10,fontSize:18 }}>{item.userReview}</div>
            <div style={{ color: "#888", marginTop: 10 }}>
              {moment(item.userReviewDate).format("MM-DD-YYYY HH:mm:ss")}
            </div>
          </div>
        </Card>

      })}
    </div>
  );
}