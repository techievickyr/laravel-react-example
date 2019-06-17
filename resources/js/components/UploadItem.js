import React, { Component } from 'react';

export default class UploadItem extends Component {
	render() {
		return (
			<div className="upload">
				<div className="item">
					<h6>Document #{this.props.num}</h6>
					<p>{this.props.item}</p>
				</div>
			</div>
		)
	}
}