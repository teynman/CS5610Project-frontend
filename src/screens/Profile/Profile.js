import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.css";
import { Button, Menu, message, Rate, Space, Upload } from 'antd';
import RecentActivities from "../../components/RecentActivities/RecentActivities";
import Friends from "../../components/Friends/Friends";
import Ratings from "../../components/Ratings/Ratings";
import Bookmarks from "../../components/Bookmarks/Bookmarks";
import Checkins from "../../components/Checkins/Checkins";

import { request } from '../../utils/request';
import { getUser } from '../../utils/storage';

const Profile = (props) => {
  const navigate = useNavigate();

  let user = getUser();

  let userId = useParams().id;

  const otherUser = userId && userId !== user._id;

  if (!userId) {
    userId = user._id;
  }
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    sign: "",
    sex: ""
  })
  const [rates, setRates] = useState([
    {
      value: 5,
      count: 0,
    },
    {
      value: 4,
      count: 0,
    },
    {
      value: 3,
      count: 0,
    },
    {
      value: 2,
      count: 0,
    },
    {
      value: 1,
      count: 0,
    },
    {
      value: 0,
      count: 0,
    },
  ])
  
  const [menus, setMenus] = useState([
    {
      key: "recentActivities",
      label: "Recent Activities",
      component: <RecentActivities></RecentActivities>
    },
    {
      key: "friends",
      label: "Friends",
      component: <Friends></Friends>
    },
    {
      key: "rates",
      label: "Rates",
      component: <Ratings></Ratings>
    },
    {
      key: "checkins",
      label: "Checkins",
      component: <Checkins></Checkins>
    }
  ]);

  if (!otherUser && menus.length == 4) {
    menus.splice(2, 0, {
      key: "bookmarks",
      label: "Bookmarks",
      component: <Bookmarks></Bookmarks>
    });
  }
  const [menuKey, setMenuKey] = useState("recentActivities")

  useEffect(() => {
    request(
      '/api/users/user/' + userId,
      {
      },
      'get',
    ).then(res => {
      setProfile(res)
    })

    let user = getUser();
    request(
      '/api/reviews/user/'+user._id,
      {
      },
      'get',
    ).then(res=>{
      res.forEach(item => {
        if(item.userReviewRating===5){
          rates[0].count = rates[0].count+1;
        }else if(item.userReviewRating===4){
          rates[1].count = rates[1].count+1;
        }else if(item.userReviewRating===3){
          rates[2].count = rates[2].count+1;
        }else if(item.userReviewRating===2){
          rates[3].count = rates[3].count+1;
        }else if(item.userReviewRating===1){
          rates[4].count = rates[4].count+1;
        }else if(item.userReviewRating===0){
          rates[5].count = rates[5].count+1;
        }
      });
    });

  }, [])

  console.log("menuKey", menuKey);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <img alt='' className={style.heading} src={profile.userAvatar || '/headimg.png'}></img>
        <div className={style.topCenter}>
          <div className={style.row}>
            <div className={style.rowLabel}>
              Name
            </div>
            <div className={style.rowValue}>
              {!profile.firstName ? <span className={style.unknown}>unknown</span> : profile.lastName + ' ' + profile.firstName}
            </div>
          </div>
          <div className={style.row}>
            <div className={style.rowLabel}>
            LivingIn
            </div>
            <div className={style.rowValue}>
              {!profile.livingIn ? <span className={style.unknown}>unknown</span> : profile.livingIn}
            </div>
          </div>
          <div className={style.row}>
            <div className={style.rowLabel}>
            Signature
            </div>
            <div className={style.rowValue}>
              {!profile.signature ? <span className={style.unknown}>unknown</span> : profile.signature}
            </div>
          </div>
          <div className={style.row}>
            <span className={style.num}>0 friends</span>
            <span className={style.num}>0 favs</span>
            <span className={style.num}>0 comments</span>
          </div>

        </div>
        <div className={style.topRight}>
          {otherUser ? <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Button type='primary' onClick={()=>{
              request(
                '/api/followings/' + user._id+"/"+userId,
                {
                },
                'post',
              ).then(res => {
                message.success("add friend success")
              });
            }}>add friend</Button>

            <Button type='primary'  onClick={()=>{
              request(
                '/api/followings/' + user._id+"/"+userId,
                {
                },
                'post',
              ).then(res => {
                message.success("follow success")
              });
            }}>follow he</Button>
          </Space> : <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            

            <Button type='primary' onClick={() => {
              navigate("/editProfile");
            }}>Edit Profile</Button>
          </Space>}

        </div>
      </div>
      <div className={style.content}>
        <div className={style.contentLeft}>
          <Menu
            onClick={(e) => {
              console.log("e", e)
              setMenuKey(e.key)
            }}
            style={{ width: "100%" }}
            defaultSelectedKeys={['recentActivities']}
            mode="inline"

          >
            {menus.map((menu) => {
              return (<Menu.Item key={menu.key}>
                {menu.label}
              </Menu.Item>
              )
            })}
          </Menu>
        </div>
        <div className={style.contentCenter}>
          {
            menus.filter((it) => it.key === menuKey).map((item) => item.component)
          }
        </div>
        <div className={style.contentRight}>
          <div className={style.caption}>about me</div>
          <div className={style.row}>
            <div className={style.rowLabel}>
            LivingIn
            </div>
            <div className={style.rowValue}>
              {!profile.livingIn ? <span className={style.unknown}>unknown</span> : profile.livingIn}
            </div>
          </div>
          <div className={style.row}>
            <div className={style.rowLabel}>
            Hobby
            </div>
            <div className={style.rowValue}>
              {!profile.hobby ? <span className={style.unknown}>unknown</span> : profile.hobby}
            </div>
          </div>
          <div className={style.rowLabel}>
            Rate
          </div>
          <div className={style.rowValue} style={{display:"flex",flexDirection:"column"}}>
            {
              rates.map((item)=><div style={{display:"flex",alignItems:"center"}}>
              <Rate allowHalf defaultValue={item.value}  /> <span style={{color:"#888",marginLeft:5}}>{item.count}times</span></div>)
             
            }
          </div>
          <div className={style.row}>
            <div className={style.rowLabel}>
             Gender
            </div>
            <div className={style.rowValue}>
              {!profile.gender ? <span className={style.unknown}>unknown</span> : profile.gender}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Profile;