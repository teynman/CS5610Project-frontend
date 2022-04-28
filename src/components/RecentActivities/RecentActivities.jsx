import React, { useEffect, useState } from 'react';
import { Rate, Card } from 'antd';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { getUser } from '../../utils/storage';
import { request } from '../../utils/request';
import moment from "moment";

export default function RecentActivities(props) {
  const navigate = useNavigate();

  const [list, setList] = useState([
    
  ]);
  useEffect( () => {
    let user = getUser();
    request(
      '/api/reviews/user/'+user._id,
      {
      },
      'get',
    ).then(res=>{
      console.log("res====",res)
      res.forEach(element => {
        element.type=0;
      });
      request(
        '/api/checkins/user/'+user._id,
        {
        },
        'get',
      ).then(res2=>{
        res2.forEach(element => {
          element.type=1;
        });
        let all = [...res,...res2];
        all.sort((a,b)=>{
          return a.userReviewDate.localeCompare(b.userReviewDate)
        })
        console.log("res====",res)
        setList(all)
      })
    })
  }, [])
  return (
    <div className={style.container}>
      {list.map((item, i) => {
        if (item.type === 0) {
          return <Card className={style.cardItem} title={item.businessName} key={i} extra={<a href="#">More</a>} style={{ width: "100%" }}>
            <div className={style.shopItem}>
              <Rate allowHalf defaultValue={item.userReviewRating} />
              <div style={{marginTop:10,fontSize:18}}>{item.userReview}</div>
              <div style={{color:"#888",marginTop:10}}>
              {moment(item.userReviewDate).format("MM-DD-YYYY HH:mm:ss")} 
              </div>
            </div>
          </Card>
        } else {
          return <Card title={'checkin at '+item.businessName} key={i}
            className={style.cardItem} extra={<a href="#">More</a>}
            style={{ width: "100%" }}>
            <div className={style.dakaItem}>
              <div>{item.lastName} {item.firstName} at {moment(item.userReviewDate).format("MM-DD-YYYY HH:mm:ss")} checkin</div>
              <div>{item.shop}</div>
            </div>
          </Card>
        }
      })}
    </div>
  );
}

RecentActivities.propTypes = {
  login: PropTypes.func,
};
