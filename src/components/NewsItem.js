import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date }) => {
	return (
		<div className=" col-md-4 my-4">
			<img
				src={
					imageUrl
						? imageUrl
						: "https://www.reuters.com/resizer/sZ0sTYvTUv_30YoTN374L3S0L5A=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/Z5PKCN6B6BIFTMFVGTATZAIAZI.jpg"
				}
				className="card-img-top"
				alt={title}
			/>
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{description}</p>
				<a
					href={newsUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-sm btn-primary"
				>
					Read More
				</a>
				<p className="card-text">
					<small className="text-muted">
						By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
					</small>
				</p>
			</div>
		</div>
	);
};

export default NewsItem;
