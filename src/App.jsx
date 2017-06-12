import React, {Component} from 'react';
import Counter from './Pager.jsx';
import format from 'date-fns/format';

class App extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			page: 1,
			posts: [],
			loaded: false	
		};
		this.loadPosts = this.loadPosts.bind(this);
	}
	componentDidMount() { 
		this.loadPosts(1);
	}

	loadPosts(pageNumber) { 
		this.setState({
			loaded: false,	
		}, () => {
			this.getPost(pageNumber);
		});
	}

	getPost(pageNumber) {
		var page = '&page=' + pageNumber;
		var that = this;
		this.serverRequest = 
		axios.get(this.props.source + page)
			.then(function(result) {    
				that.setState({
				page: pageNumber,
				posts: result.data,
				loaded: true
			});
		})
	}

	renderLoadingView(){
	    return (
			<div className="loader">
				<img src="build/img/loader.gif" />
			</div>
	    );
  	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	render() {
		return (
			<div className="posts">
				{!this.state.loaded ? (
					<div className="loader-wrapper">
						<div className="loader">
							<img src="build/img/loader.gif" />
						</div>
					</div>
				) : (
					<div className="post-wrapper">
						{this.state.posts.map(function(post) {
						const datehuman = format(post.date, 'D MMMM YYYY');
						return (
							<article key={post.link} className="post">
									{post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"] ?
										<div className="hidden-md-up"><a href={post.link}><img src={post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url} /></a></div>
									: null}
									<h2 className="post-title"><a href={post.link}
									dangerouslySetInnerHTML={{__html:post.title.rendered}}
									/></h2>
									<div className="entry-meta">
									{post._embedded['wp:term'][3][0] ?
										<span>BY <a href={post._embedded['wp:term'][3][0].link} dangerouslySetInnerHTML={{__html:post._embedded['wp:term'][3][0].name}}/></span>
									: null}
										<span> {datehuman}</span>
									</div>
									{post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"] ?
										<div className="thumbnail hidden-md-down"><a href={post.link}><img src={post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url} /></a></div>
									: null}
									{post.excerpt.rendered ?
										<div className="excerpt" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}} />
									: null}
							</article>
						);
						})}
					</div>
				)}
			<div className="pager-wrapper">
				<Counter onChangePageNumber={this.loadPosts}/> 
			</div>
			</div>
		)
	}
}
export default App;