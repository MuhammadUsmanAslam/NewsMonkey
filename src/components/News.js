import React, { Component } from "react";
import NewsItem from "./NewsItem";
import spinner from "./loading-spinner.gif";
import "./News.css";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";

export class News extends Component {
	// articles = [
	// 	{
	// 		source: {
	// 			id: "news24",
	// 			name: "News24",
	// 		},
	// 		author: "Khanyiso Tshwaku",
	// 		title: "Elgar confident novice Dewald Brevis can adapt to Pro cricket",
	// 		description:
	// 			"Proteas Test captain Dean Elgar said he's looking forward to seeing Titans batting tyro Dewald Brevis making the step up to professional cricket.",
	// 		url: "https://www.news24.com/sport/Cricket/Proteas/elgar-confident-novice-dewald-brevis-can-adapt-to-pro-cricket-20220224",
	// 		urlToImage:
	// 			"https://cdn.24.co.za/files/Cms/General/d/3071/17b65de00a1349bd8aa301b1d3f96d5f.jpg",
	// 		publishedAt: "2022-02-24T21:11:25+00:00",
	// 		content:
	// 			"<ul><li>Proteas Test captain Dean Elgar said he's excited to see Dewald Brevis making the step up to the professional level.</li><li>Brevis was the top scorer at the Under-19 World Cup and broke Shik… [+2146 chars]",
	// 	},
	// 	{
	// 		source: {
	// 			id: "abc-news-au",
	// 			name: "ABC News (AU)",
	// 		},
	// 		author: "ABC News",
	// 		title:
	// 			"Australian cricket great Rod Marsh in hospital after suffering heart attack",
	// 		description:
	// 			"Australian cricket icon Rod Marsh has suffered a major heart attack and is recovering in a Queensland hospital.",
	// 		url: "http://www.abc.net.au/news/2022-02-24/australian-cricket-great-rod-marsh-suffers-heart-attack/100858500",
	// 		urlToImage:
	// 			"https://live-production.wcms.abc-cdn.net.au/6653f9d3d18c404c8ea795de894c48e1?impolicy=wcms_crop_resize&cropH=2531&cropW=4500&xPos=0&yPos=342&width=862&height=485",
	// 		publishedAt: "2022-02-24T05:21:34Z",
	// 		content:
	// 			"Australian cricket legend Rod Marsh is in a Queensland hospital after suffering a serious heart attack.\r\n<ul><li>Rod Marsh was reportedly rushed to hospital while in Bundaberg for a Bulls Masters cha… [+2156 chars]",
	// 	},
	// 	{
	// 		source: {
	// 			id: "espn-cric-info",
	// 			name: "ESPN Cric Info",
	// 		},
	// 		author: null,
	// 		title:
	// 			"PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
	// 		description:
	// 			"Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
	// 		url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
	// 		urlToImage:
	// 			"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
	// 		publishedAt: "2020-04-27T11:41:47Z",
	// 		content:
	// 			"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
	// 	},
	// 	{
	// 		source: {
	// 			id: "espn-cric-info",
	// 			name: "ESPN Cric Info",
	// 		},
	// 		author: null,
	// 		title:
	// 			"What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
	// 		description:
	// 			"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
	// 		url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
	// 		urlToImage:
	// 			"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
	// 		publishedAt: "2020-03-30T15:26:05Z",
	// 		content:
	// 			"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
	// 	},
	// ];

	articles = [];

	constructor(props) {
		super(props);
		this.state = {
			articles: this.articles,
			loading: false,
			progress: 0,
			page: 1,
		};
		document.title = `${this.capitalizeFirstLetter(
			this.props.category
		)} - NewsMonkey`;
	}

	static defaultProps = {
		country: "us",
		pageSize: 10,
		category: "general",
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	};

	capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	fetchMoreData = async () => {
		this.setState({
			page: this.state.page + 1,
			//  progress: 20
		});
		// this.setState({ articles: this.articles });
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
		// this.setState({ progress: 70 });
		let data = await (await fetch(url)).json();
		this.setState({
			articles: this.state.articles.concat(data.articles),
			totalResults: data.totalResults,
			// progress: 100,
		});
	};

	async componentDidMount() {
		this.updateNews();
	}

	render() {
		console.log("render");
		return (
			<InfiniteScroll
				dataLength={this.state.articles.length}
				next={this.fetchMoreData}
				hasMore={this.state.articles.length !== this.state.totalResults}
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
					progress={this.state.progress}
					onLoaderFinished={() => this.setState({ progress: 100 })}
				/>
				<div className="container ">
					<div className="row text-center">
						<h2 className="h" style={{ margin: "35px 0px" }}>
							NewsMonkey - Top Headlines From:
							{this.capitalizeFirstLetter(this.props.category)} Category
						</h2>
					</div>

					<div className="row">
						{this.state.articles.map((article, index) => {
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
					{/* {this.state.articles.length <= 0 ? (
						<div className="text-center">
							<img
								src={spinner}
								alt="Loading"
								style={{ height: 250, width: 250 }}
							/>
						</div>
					) : (
						<div className="row">
							{this.state.articles.map((article, index) => {
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
					)} */}

					{/* <div className="container d-flex justify-content-between">
						<button
							type="button"
							className="btn btn-success m-2"
							disabled={this.state.page <= 1 ? true : false}
							onClick={async () => {
								await this.setState({
									page: this.state.page - 1,
								});
								this.updateNews();
							}}
						>
							&larr; Previous
						</button>
						<button
							type="button"
							className="btn btn-success m-2"
							disabled={
								this.state.page + 1 >
								Math.ceil(this.state.totalResults / this.props.pageSize)
									? true
									: false
							}
							onClick={async () => {
								await this.setState({
									page: this.state.page + 1,
								});
								this.updateNews();
							}}
						>
							Next &rarr;
						</button>
					</div> */}
				</div>
			</InfiniteScroll>
		);
	}

	updateNews = async () => {
		this.setState({ articles: this.articles, progress: 20 });
		// this.setState({ page: this.state.page + 1, progress: 20 });

		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
		this.setState({ progress: 70 });
		let data = await (await fetch(url)).json();
		this.setState({
			articles: data.articles,
			totalResults: data.totalResults,
			progress: 100,
		});
	};
}

export default News;
