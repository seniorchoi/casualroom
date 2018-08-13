import React, { Component } from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import {Dashboard } from './components/Dashboard';
import CalendarPage from './components/Calendar';
import Posts from "./components/Posts";
import Vsecret from './components/Vsecret';
import WordCounter from './components/WordCounter';
import Pics from './components/Pics';
import Videos from './components/videos';
import ChuckNorris from './components/ChuckNorris';
import Loading from './components/loading';
import Chatroom from './components/Chatroom';
import {getJoke, getPics} from './components/actions';


import { Menu, Card, Row, Col, Affix, Modal } from 'antd';

var moment = require('moment-timezone');


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function info() {
  Modal.info({
    title: 'Here are some updates',
    content: (
      <div>
        Added the following...
        <ul>
          <li>changed order of tabs</li>
          <li>added delete button for every page</li>
        </ul>
        {/*Improved following...*/}
        {/*<ul>*/}
          {/*<li>on post page, you can now post longer than 100 characters</li>*/}
          {/*<li style={{color:'red'}}>improved UI design on pics page</li>*/}
        {/*</ul>*/}
      </div>
    ),
    onOk() {},
  });
}


class App extends Component {
  state = {
    posts:[],
    posts2:[],
    current: 'chatroom',
    jokes:[],
    counter:0,
    timer:5000
  };

  componentWillMount() {
    if(!localStorage.getItem('dog')) {
      info();
      localStorage.setItem('dog', 'Doggy');
    }
    // getJoke()
    //   .then(res=>{
    //     let jokeArr = (res.data.value.map(({joke})=>{
    //       return [{joke}.joke].concat([{joke}.joke]);
    //     }));
    //     this.setState({jokes : jokeArr });
    //   });
    // this.weirdCounter();
    // console.log(this.props.match);
    getPics()
      .then(res=>{
        this.setState({posts:res.data, loading: false});

      });

  }


  handleDaClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {

    return (
      <div className="App">
        <Menu
          onClick={this.handleDaClick}
          // selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="chatroom">
            <Link to="/chatroom">Chatroom</Link>
          </Menu.Item>
          <Menu.Item key="calendar">
            <Link to="/calendar">Calendar</Link>
          </Menu.Item>
          <Menu.Item key="videos">
            <Link to="/videos">Videos</Link>
          </Menu.Item>
          <Menu.Item key="posts">
            <Link to="/posts">Posts</Link>
          </Menu.Item>
          <Menu.Item key="pics">
            <Link to="/pics">Pics</Link>
          </Menu.Item>
          <Menu.Item key="dashboard">
            <Link to="/updates">Updates</Link>
          </Menu.Item>
          <SubMenu title={<span>Etc</span>}>
            <MenuItemGroup title="PROJECTS">
              <Menu.Item key="vsecret">
                <Link to="/vsecret">Vsecret</Link>
              </Menu.Item>
              <Menu.Item key="chucknorris">
                <Link to="/chucknorris">ChuckNorris Jokes</Link>
              </Menu.Item>
              <Menu.Item key="wordcounter">
                <Link to="/wordcounter">Wordcounter</Link>
              </Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="CLASSIFIED">
              <Menu.Item key="setting:3" disabled='true'>secret shit</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
        <Row>
          <Col span={20}>
        <div style={{marginTop:'2%'}}>
          <Route exact path="/" component={Chatroom}/>
          <Route path="/updates" component={Dashboard}/>
          <Route path="/chatroom" component={Chatroom}/>
          <Route path="/videos" component={Videos}/>
          <Route path="/posts" component={Posts}/>
          <Route path="/pics" component={Pics}/>
          <Route path="/vsecret" component={Vsecret}/>
          <Route path="/wordcounter" component={WordCounter}/>
          <Route path="/calendar" component={CalendarPage} />
          <Route path="/chucknorris" component={ChuckNorris} />
          <Route path="/loading" component={Loading} />
        </div>
          </Col>
          <Col span={4}>
						<Card style={{margin:5}}>
							America LA {moment().tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm')}
						</Card>
						<Card style={{margin:5}}>
							America NY {moment().tz("America/New_York").format('YYYY-MM-DD HH:mm')}
						</Card>
						<Card style={{margin:5}}>
							Korea {moment().tz("Asia/Seoul").format('YYYY-MM-DD HH:mm')}
						</Card>
						<Card style={{margin:5}}>
							Spain {moment().tz("Europe/Madrid").format('YYYY-MM-DD HH:mm')}
						</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
