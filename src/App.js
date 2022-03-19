import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	let apiKey = process.env.REACT_APP_NEWS_API;
	let pageSize = 15;
	return (
		<div className="app">
			<Router>
				<NavBar />

				<Switch>
					<Route exact path="/">
						<News
							key="general"
							pageSize={pageSize}
							country="us"
							apiKey={apiKey}
							category="general"
						/>
					</Route>
					<Route exact path="/business">
						<News
							key="business"
							pageSize={pageSize}
							country="us"
							apiKey={apiKey}
							category="business"
						/>
					</Route>
					<Route exact path="/entertainment">
						<News
							key="entertainment"
							pageSize={pageSize}
							country="us"
							apiKey={apiKey}
							category="entertainment"
						/>
					</Route>
					<Route exact path="/health">
						<News
							key="health"
							pageSize={pageSize}
							country="us"
							apiKey={apiKey}
							category="health"
						/>
					</Route>
					<Route exact path="/science">
						<News
							key="science"
							pageSize={pageSize}
							country="us"
							apiKey={apiKey}
							category="science"
						/>
					</Route>
					<Route exact path="/sports">
						<News
							key="sports"
							pageSize={pageSize}
							country="us"
							apiKey={apiKey}
							category="sports"
						/>
					</Route>
					<Route exact path="/technology">
						<News
							key="technology"
							pageSize={pageSize}
							country="us"
							apiKey={apiKey}
							category="technology"
						/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
