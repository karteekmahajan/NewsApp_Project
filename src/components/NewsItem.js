import React from 'react'
import {Link} from 'react-router-dom'

    const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
                        {source} </span>
                    <img src={!imageUrl ? "https://images.hindustantimes.com/tech/img/2023/04/16/1600x900/solar_storm_1668155998312_1681614780962_1681614780962.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <Link to={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</Link>
                    </div>
                </div>
            </div>
        )
    }

    export default NewsItem
