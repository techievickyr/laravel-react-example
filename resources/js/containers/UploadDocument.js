import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import axios from 'axios';

import UploadBar from '../components/UploadBar';
import UploadItem from '../components/UploadItem';
import Document from '../components/Document';

export default class UploadDocument extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			documents: []
		}
		
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}
	
    render() {
		const { documents } = this.state;
		
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="item_0">
                <Row>
                    <Col sm={3}>
						<UploadBar onChange={this.onChangeHandler} />
                        <Nav variant="pills" className="flex-column">
                        {
							documents.map( (doc, i) => {
								return (
									<Nav.Item key={i}>
										<Nav.Link key={i} eventKey={ `item_${i}` }>
											<UploadItem key={i} num={i+1} item={doc.file} />
										</Nav.Link>
									</Nav.Item>
								)
							})
						}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
						{
							documents.map( (doc, i) => {
								return (
									<Tab.Pane key={i} eventKey={ `item_${i}` }>
										<Document key={i} num={i+1} source={doc.path}  />
									</Tab.Pane>
								)
							})
						}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
    
    onChangeHandler(event) {
		const data = new FormData() 
		data.append('document', event.target.files[0]);
		axios.post('/api/upload', data)
			.then(res => {
				const documents = [].concat(this.state.documents, [res.data]);
				this.setState({
					documents: documents
				}, () => {
					event.target.value = null;
				});
			});
	}
}

if (document.getElementById('app')) {
    ReactDOM.render(<UploadDocument />, document.getElementById('app'));
}
