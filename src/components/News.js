import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Sppiner from './Sppiner'
import PropTypes from 'prop-types'


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResult] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        // const url = `https://newsapi.org/v2/top-headlines?country = ${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        const url = `https://newsapi.org/v2/top-headlines?country = ${props.country}&category=${props.category}&apiKey=631e3607d8c844c7a2f6a83ebdbb7234&page=${page + 1}&pageSize=${props.pageSize}`;


        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(100);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResults);
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();          // it is use to short the code
    }, [])


    const handlePreviousClick = async () => {
        setPage(page - 1)       // it is use to short the code
        updateNews();
    }

    const handleNextClick = async () => {
        setPage(page + 1)                             // it is use to short the code
        updateNews();
    }

    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country = ${props.country}&category=${props.category}&apiKey=631e3607d8c844c7a2f6a83ebdbb7234&page=1&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
    };

    return (
        <>
            <h1 className='text-center' style={{ margin: '35px 0px', marginTop: "90px" }}> Newsmonkey - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
            {loading && <Sppiner />}

            <div className='container'>
                <div className='row'>
                    {articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>

                    })}
                </div>
            </div>
            <div className='container d-flex justify-content-between'>
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div >
        </>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'sports',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

}

export default News
