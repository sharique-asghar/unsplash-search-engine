import React, { useState, useEffect } from 'react';
import {getAllPhotos, searchAllPhotos} from "../api/services";

const initialPageQuery = {
    page: 1,
    per_page: 9
}

const initialSearchQuery = {
    page: 1,
    per_page: 9,
    query: ""
}

const Home = (props) => {
    const [searchText, setSearchText] = useState("");
    const [imageList, setImageList] = useState([]);
    const [queryParam, setQueryParam] = useState(initialPageQuery);
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

    useEffect(() => {
        fetchPhotos(queryParam);
    }, [queryParam]);

    useEffect(() => {
        if (searchQuery.query) {
            searchPhotos(searchQuery);
        }
    }, [searchQuery]);

    const fetchPhotos = async (query) => {
        const response = await getAllPhotos(query);
        if (response && response.length) {
            setImageList((images) => [...images, ...response]);
        } else {
            console.log("Failed to load photos");
            alert("Failed to load photos");
        }
    };

    const searchPhotos = async (query) => {
        const response = await searchAllPhotos(query);
        if (response && response.results) {
            setImageList((images) => [...images, ...response.results]);
        } else {
            console.log("Failed to load photos");
            alert("Failed to load photos");
        }
    };

    const handleInput = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = (event) => {
        event.persist();
        if (event.key === "Enter") {
            setImageList([]);
            setSearchQuery((queryObj) => ({
                ...queryObj,
                query: event.target.value
            }));
        }
    }

    const handleLoadMoreClick = (event) => {
        if (searchQuery.query) {
            setSearchQuery((queryObj) => ({
                ...queryObj,
                page: queryObj.page + 1
            }));
        } else {
            setQueryParam((queryObj) => ({
                ...queryObj,
                page: queryObj.page + 1
            }))
        }
    }



    return (
        <div className="container">
            <div className="page-content">
                <div className="searchbar-container">
                    <input type="text" id="search" name="Search" defaultValue={searchText} placeholder="Search for images here.."
                        onChange={handleInput} onKeyPress={handleSearch}/>
                </div>
                <div className="images-container">
                    {
                        imageList && imageList.map((image) => (
                            <div className="card" key={image.id} onClick={() => props.handleImageClick(image)}>
                                <img src={image.urls.regular} alt="card pic" />
                                <div className="image-content">
                                    <img src={image.user.profile_image.medium}  className="profileImage" alt="profile pic" />
                                    <span className="image-text">Image by</span>
                                    <span className="user-name">{image.user.name}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="buttonContainer">
                    <button id="loadMore" type="button" onClick={handleLoadMoreClick}>Load More</button>
                </div>
            </div>
        </div>
    );
}

export default Home;