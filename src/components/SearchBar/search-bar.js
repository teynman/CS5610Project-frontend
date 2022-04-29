import React, {useRef, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSearch} from "../../context/search-context";
import axios from "axios";
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const SearchBar = () => {
    const termSearchRef = useRef();
    const locationSearchRef = useRef();
    const {businessSearch} = useParams();
    const {locationSearch} = useParams();
    const {updateBusinesses} = useSearch();
    const nav = useNavigate();
    const searchBy = async () => {
        const locationString = locationSearchRef.current.value || locationSearch;
        const searchString = termSearchRef.current.value || businessSearch;
        if (locationString && searchString) {
            const response = await axios.get(`${BASE_URL}?term=${searchString}&location=${locationString}`,
                {headers: {
                        Authorization: `Bearer ${YELP_API_KEY}`,
                        Origin: 'localhost',
                    }})
            updateBusinesses(response.data.businesses);
        }
    }
    const searchButtonHandler = () => {
        const locationString = locationSearchRef.current.value || locationSearch || 'boston';
        const searchString = termSearchRef.current.value || businessSearch || 'starbucks';
        searchBy();
        nav(`/search/${locationString}/${searchString}`);
        termSearchRef.current.value = searchString;
        locationSearchRef.current.value = locationString;
    }
    useEffect(()=>{
        searchBy();
    }, [locationSearch, businessSearch]);
    return (
        <div className="row bg-danger" style={{height: 64}}>
            <div className="col-5" style={{height: 64}}>
                <label className="me-3 ms-4" style={{height: 64}} form="search-term">
                    Find
                </label>
                <input
                    ref={termSearchRef}
                    placeholder="Starbucks"
                    className="col-6 ps-2"
                    style={{height: 48}}
                    id="search-term"/>
            </div>
            <div className="col-5">
                <label className="me-3" form="search-location">
                    Near
                </label>
                <input
                    ref={locationSearchRef}
                    placeholder="Boston, MA"
                    className="col-6 ps-2"
                    style={{height: 48}}
                    id="search-location"/>
            </div>
            <button
                onClick={searchButtonHandler}
                className="btn btn-primary col-1 float-end mt-2"
                style={{height: 48}}>
                <i className="fas fa-search"/>
            </button>
        </div>
    );
};

export default SearchBar;