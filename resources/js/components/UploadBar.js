import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default class UploadBar extends Component {
	render() {
		return (
			<div className="upload-bar">
				<strong>Files</strong>
				<label className="upload-btn">Upload <FontAwesomeIcon icon={faUpload} />
					<input className="input-file-hidden" type="file" name="document" onChange={this.props.onChange} />
				</label>
			</div>
		)
	}
}