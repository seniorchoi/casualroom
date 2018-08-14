import React, {Component} from 'react';
import {Card, Row, Col, Input, Button } from 'antd';
import io from 'socket.io-client';
import moment from 'moment';
import './stupid.css';

const Search = Input.Search;

class Chatroom extends Component {
	state={
		text: [],
		input: '',
		name:'dude',
	};

	componentWillMount() {
		this.setState({name: localStorage.getItem('coolName')})
	}


	componentDidMount() {
		let arr= [];
		// this.socket= io('https://issamariochatserver.herokuapp.com/');
		this.socket= io('http://localhost:3000/');

		this.socket.on('total message', (msg)=>{
			console.log(msg);
			arr=msg;
			this.setState({text:arr});
		});

		this.socket.on('chat message', (msg)=>{
			console.log(msg);
			arr.push(msg);
			this.setState({text:arr});
		});
		this.scrollToBottom();
		if(!localStorage.getItem('coolName')){
			this.getName();
		}
	}


	componentDidUpdate() {
		this.scrollToBottom();
	}

	getName() {
		let coolName = prompt("Please enter your name", "");
		localStorage.setItem('coolName', coolName);
		this.setState({name: coolName});
	}


	handleSubmit = (e) => {
		this.socket.emit('chat message',
			{msg:e,
				time:moment().format('YYYY-MM-DD HH:mm:ss'),
				name:this.state.name
			});
		this.setState({input:''});
		return false;
	};

	handleChange = (e) =>{
		this.setState({input: e.target.value});

	};
	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	};


	render() {
		return (
			<div>

				<Card style={{height: '70vh', overflowY: 'auto'}}>
					{this.state.text.map(text=>{
						return <Card className='stupidCard'><strong>{text.name}:</strong> {text.msg}
							<span style={{float:'right'}}>{text.time}</span>
						</Card>
					})}
					<div style={{ float:"left", clear: "both" }}
							 ref={(el) => { this.messagesEnd = el; }}>
					</div>
				</Card>
						<Card>
							<Search
								placeholder="send message"
								enterButton="Send"
								size="large"
								onSearch={value => this.handleSubmit(value)}
								onChange={e=> this.handleChange(e)}
								value={this.state.input}
							/>
						</Card>
			</div>
		);
	}
}

export default Chatroom;
