import React, {Component } from 'react';
import {Icon} from 'antd';


export class Dashboard extends Component {
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
        <div style={{fontSize:22, marginTop: '30%'}}>
        <a href='https://github.com/seniorchoi/smartkidsclub' style={{marginLeft:25}}><Icon type='github'>Github</Icon></a>
        <a href='https://www.facebook.com/brian.choi.129' style={{marginLeft:25}}><Icon type='facebook'>Facebook</Icon></a>
        <a href='https://www.instagram.com/youngempresar/' style={{marginLeft:25}}><Icon type='instagram'>Instagram</Icon></a>
        <a href='https://discord.gg/35MSWcJ'><Icon type='credit-card' style={{marginLeft:25}}>Discord</Icon></a>
        <a href='http://thefuckclub.dokupe.xyz/' style={{marginLeft:25}}><Icon type="usergroup-add">FuckClub</Icon></a>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' style={{marginLeft:25}}><Icon type="youtube">Youtube</Icon></a>
        </div>
      </div>
    );
  }
}

