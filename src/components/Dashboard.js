import React, {Component } from 'react';
import {Icon,Modal, Affix} from 'antd';


function info() {
  Modal.info({
    title: 'Here are some updates',
    content: (
      <div>
        Added the following...
        <ul>
          <li style={{color:'red'}}>calendar page</li>
          <li>chuck norris jokes page</li>
          <li>etc for small projects</li>
        </ul>
        Improved following...
        <ul>
          <li>on post page, you can now post longer than 100 characters</li>
          <li style={{color:'red'}}>improved UI design on pics page</li>
        </ul>
      </div>
    ),
    onOk() {},
  });
}

export class Dashboard extends Component {

  componentWillMount() {
    if(!localStorage.getItem('myCat')) {
      info();
      localStorage.setItem('myCat', 'Tom');
    }
  }

  render() {
    return (
      <div style={{fontSize:25}}>
        <ul>
          <li>
            Made this to share with you guys
          </li>
          <li>
            post on message board
          </li>
          <li>
            and random anime pics
          </li>
          <li>
            get chuck norris jokes!
          </li>
          <li>
            will probably add more shit
          </li>
          <li>
            You can share when you'll be online at the calendar page.
          </li>
        </ul>
        <Affix offsetBottom={10}>
          <div style={{fontSize:22}}>
          <a href='https://github.com/seniorchoi/smartkidsclub' style={{marginLeft:25}}><Icon type='github'>Github</Icon></a>
          <a href='https://www.facebook.com/brian.choi.129' style={{marginLeft:25}}><Icon type='facebook'>Facebook</Icon></a>
          <a href='https://www.instagram.com/youngempresar/' style={{marginLeft:25}}><Icon type='instagram'>Instagram</Icon></a>
          <a href='https://discord.gg/35MSWcJ'><Icon type='credit-card' style={{marginLeft:25}}>Discord</Icon></a>
          <a href='http://thefuckclub.dokupe.xyz/' style={{marginLeft:25}}><Icon type="usergroup-add">FuckClub</Icon></a>
          <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' style={{marginLeft:25}}><Icon type="youtube">Youtube</Icon></a>
          </div>
        </Affix>
      </div>
    );
  }
}

