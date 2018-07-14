import React, {Component} from 'react';
import {Spin} from 'antd';

class Loading extends Component {
  render() {
    return (
      <div>
        <Spin size='large'/>
      </div>
    );
  }
}

export default Loading;
