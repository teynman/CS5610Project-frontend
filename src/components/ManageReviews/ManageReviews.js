import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import { request } from '../../utils/request';
import * as reviewService from "../../services/review-service";
import moment from "moment";
export default function AllReviews(props) {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const deleteReview = async (reviewId) => {
        await reviewService.deleteReview(reviewId);
        window.location.reload(false);
    }
    useEffect(() => {
        request(
            '/api/reviews',
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
                if (!item.userReviewRating) {
                    return;
                }
                return <Card title={item.userReviewRating + ' star review at '+item.businessName} key={i}
                             className={style.cardItem} extra={<a href="#">More</a>}
                             style={{ width: "100%" }}>
                    <div className={style.dakaItem}>
                        <div>
                            {item.firstName} {item.lastName} reviewed {item.businessName} on {moment(item.userReviewDate).format("MM-DD-YYYY HH:mm:ss")}
                            <button
                                onClick={() => deleteReview(item._id)}
                                className="btn btn-primary float-end"> Delete </button>
                        </div>
                        <div>{item.shop}</div>
                    </div>
                </Card>
            })}
        </div>
    );
}