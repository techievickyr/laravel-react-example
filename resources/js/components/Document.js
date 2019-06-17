import React, { Component } from 'react';

export default class Document extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			iframeHeight: '200px',
		};
	}
	
	componentDidMount(){
		this.setState({
			iframeHeight: window.innerHeight - 55 + 'px'
		});
	}
	
	render() {
		return (
			<div className="document" ref={el => (this.container = el)}>
				<div className="title">
					<h3 >Document #{this.props.num}</h3>
				</div>
				<div className="content">
					{
						this.renderIframe()
					}
				</div>
			</div>
		)
	}
	
	renderIframe() {
		const { iframeWidth, iframeHeight } = this.state;
		return (
			<iframe src={this.props.source} width="100%" height={iframeHeight}></iframe>		
		)
	}
}