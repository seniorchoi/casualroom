import React, {Component} from 'react';
import {Card, Row, Col, Input, Button } from 'antd';
import io from 'socket.io-client';

const Search = Input.Search;

class Chatroom extends Component {
	state={
		text: []
	};

	componentDidMount() {
		const arr= [];
		this.socket= io('https://issamariochatserver.herokuapp.com/');
		this.socket.on('chat message', (msg)=>{
			arr.push(msg);
			this.setState({text:arr});
			return arr
		});
		console.log(this.state.text);
	}


	handleSubmit = (e) => {
		this.socket.emit('chat message', e);
		console.log(this.state.text);
		return false;
	};


	render() {
		return (
			<div>
				<Card style={{height: '70vh'}}>
					{this.state.text.map(text=>{
						return <div>{text}</div>
					})}
				</Card>
				<Row>
						<Card>
							<Search
								placeholder="input search text"
								enterButton="Send"
								size="large"
								onSearch={value => this.handleSubmit(value)}
							/>
						</Card>
				</Row>
			</div>
		);
	}
}

export default Chatroom;
