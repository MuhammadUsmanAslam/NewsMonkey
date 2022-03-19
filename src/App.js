import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export class App extends Component {
	pageSize = 15;
	render() {
		return (
			<div className="app">
				<Router>
					<NavBar />

					<Switch>
						<Route exact path="/">
							<News
								key="general"
								pageSize={this.pageSize}
								country="us"
								category="general"
							/>
						</Route>
						<Route exact path="/business">
							<News
								key="business"
								pageSize={this.pageSize}
								country="us"
								category="business"
							/>
						</Route>
						<Route exact path="/entertainment">
							<News
								key="entertainment"
								pageSize={this.pageSize}
								country="us"
								category="entertainment"
							/>
						</Route>
						<Route exact path="/health">
							<News
								key="health"
								pageSize={this.pageSize}
								country="us"
								category="health"
							/>
						</Route>
						<Route exact path="/science">
							<News
								key="science"
								pageSize={this.pageSize}
								country="us"
								category="science"
							/>
						</Route>
						<Route exact path="/sports">
							<News
								key="sports"
								pageSize={this.pageSize}
								country="us"
								category="sports"
							/>
						</Route>
						<Route exact path="/technology">
							<News
								key="technology"
								pageSize={this.pageSize}
								country="us"
								category="technology"
							/>
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
