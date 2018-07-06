import React, { Component } from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import {Dashboard } from './components/Dashboard';
import CalendarPage from './components/Calendar';
import Posts from "./components/Posts";
import Vsecret from './components/Vsecret';
import WordCounter from './components/WordCounter';
import Pics from './components/Pics';
import {getJoke} from './components/actions';

import { Menu,Card, Row, Col } from 'antd';




class App extends Component {
  state = {
    current: 'dashboard',
    jokes:[],
    counter:0,
    timer:5000
  };

  componentWillMount() {
    getJoke()
      .then(res=>{
        let jokeArr = (res.data.value.map(({joke})=>{
          return [{joke}.joke].concat([{joke}.joke]);
        }));
        this.setState({jokes : jokeArr });
      });
    this.weirdCounter();
    console.log(this.props.match);
  }

  weirdCounter(time){
    if(this.state.counter>198){
      this.setState({counter:0})
    }
    setTimeout(()=>{
        if(this.state.timer>500){
          this.setState({timer:this.state.timer-500});
          console.log(this.state.timer);
          this.weirdCounter(this.state.timer);
        } else if(this.state.timer>10){
          this.setState({timer:this.state.timer-10});
          console.log(this.state.timer);
          this.weirdCounter(this.state.timer);
        }
          else if(this.state.timer>1){
          this.setState({timer:this.state.timer-0.1});
          console.log(this.state.timer);
          this.weirdCounter(this.state.timer);
        }

        else{
          this.weirdPlusCounter(time);
        }
        this.setState({counter:this.state.counter+1});
      },time
    )
  }

  weirdPlusCounter(time){
    if(this.state.counter>198){
      this.setState({counter:0})
    }
    setTimeout(()=>{
        if(this.state.timer<100){
          this.setState({timer:this.state.timer+5});
          console.log(this.state.timer);
          this.weirdPlusCounter(this.state.timer);
        }
        else if(this.state.timer<500){
          this.setState({timer:this.state.timer+50});
          console.log(this.state.timer);
          this.weirdPlusCounter(this.state.timer);
        }
        else if(this.state.timer<5500){
          this.setState({timer:this.state.timer+500});
          console.log(this.state.timer);
          this.weirdPlusCounter(this.state.timer);
        }
        else{
          this.weirdCounter(time);
        }
        this.setState({counter:this.state.counter+1});
      },time
    )
  }


  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const{ jokes,counter } = this.state;

    return (
      <div className="App">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="dashboard">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="posts">
            <Link to="/posts">Posts</Link>
          </Menu.Item>
          <Menu.Item key="pics">
            <Link to="/pics">Pics</Link>
          </Menu.Item>
          <Menu.Item key="vsecret">
            <Link to="/vsecret">Vsecret</Link>
          </Menu.Item>
          <Menu.Item key="wordcounter">
            <Link to="/wordcounter">Wordcounter</Link>
          </Menu.Item>
          <Menu.Item key="calendar">
            <Link to="/calendar">Calendar</Link>
          </Menu.Item>
        </Menu>
        <Row>
          <Col span={18}>
        <div style={{marginTop:'2%'}}>
          <Route exact path="/" component={Dashboard}/>
          <Route path="/posts" component={Posts}/>
          <Route path="/pics" component={Pics}/>
          <Route path="/vsecret" component={Vsecret}/>
          <Route path="/wordcounter" component={WordCounter}/>
          <Route path="/calendar" component={CalendarPage} />
        </div>
          </Col>
          <Col span={6}>
        <Card style={{marginRight:30}}>
        <p>{counter}. {jokes[counter]}</p>
        </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
