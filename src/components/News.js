import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import spinner from "./loading-spinner.gif";
import "./News.css";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";

const News = (props) => {
	const [articles, setArticles] = useState([]);
	const [progress, setProgress] = useState(0);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const fetchMoreData = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=${
			props.country
		}&pageSize=${props.pageSize}&page=${page + 1}&category=${
			props.category
		}&apiKey=${props.apiKey}`;
		await setPage(page + 1);
		let data = await (await fetch(url)).json();
		setArticles(articles.concat(data.articles));
		setTotalResults(data.totalResults);
	};

	const updateNews = async () => {
		setArticles(articles);
		setProgress(20);
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&page=${page}&category=${props.category}&apiKey=${props.apiKey}`;
		setProgress(70);
		let data = await (await fetch(url)).json();
		setArticles(data.articles);
		setProgress(100);
		setTotalResults(data.totalResults);
	};

	useEffect(() => {
		updateNews();
		document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
	}, []);

	return (
		<InfiniteScroll
			dataLength={articles.length}
			next={fetchMoreData}
			hasMore={articles.length < totalResults}
			loader={
				<div className="container">
					<div className="text-center">
						<img
							src={spinner}
							alt="Loading"
							style={{ height: 250, width: 250 }}
						/>
					</div>
				</div>
			}
		>
			<LoadingBar
				color="#f11946"
				progress={progress}
				onLoaderFinished={() => setProgress(100)}
			/>
			<div className="container ">
				<div className="row text-center">
					<h2 className="h" style={{ margin: "35px 0px" }}>
						NewsMonkey - Top Headlines From:
						{capitalizeFirstLetter(props.category)} Category
					</h2>
				</div>

				<div className="row">
					{articles.map((article, index) => {
						return (
							<NewsItem
								key={index}
								title={article.title ? article.title : ""}
								description={article.description ? article.description : ""}
								imageUrl={article.urlToImage}
								newsUrl={article.url}
								author={article.author}
								date={article.publishedAt}
							/>
						);
					})}
				</div>
			</div>
		</InfiniteScroll>
	);
};

News.defaultProps = {
	country: "us",
	pageSize: 10,
	category: "general",
};

News.propTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string,
};

export default News;
