import React, {Component} from 'react';

import {Card, DatePicker, Row, Col, Input, Select, Icon } from 'antd';
import {getDates, createDate} from "./actions";
import PropTypes from "prop-types";
import {notification} from "antd/lib/index";

var moment = require('moment-timezone');


const Search = Input.Search;
const Option = Select.Option;

const openNotification = (type) => {
  notification[type]({
    message: 'Posted Successfully',
  });
};

class CalendarPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      date:[],
      posts:[],
      activity:'',
      toggle:true
    };

  }

  componentWillMount() {
    getDates()
      .then(post=>{this.setState({posts: post.data})});
  }

  onOk(value) {
    console.log('onOk: ', value);
    let times=[];
    let krt = moment(value._d);
    times.push(krt.format('YYYY-MM-DD HH:MM'));
    times.push('Korean time');
    times.push(krt.clone().tz("America/Los_Angeles").format('YYYY-MM-DD HH:MM'));
    times.push('Los Angeles time');
    times.push(krt.clone().tz("America/New_York").format('YYYY-MM-DD HH:MM'));
    times.push('New York time');
    times.push(krt.clone().tz("Europe/Madrid").format('YYYY-MM-DD HH:MM'));
    times.push('Madrid time');
    times.push('Which is');
    times.push(moment(krt).fromNow());
    this.setState({date:times.join(' '), toggle:false});
  }


  handleChange(value) {
    this.setState({activity:value});
  }

  postValue=(value)=>{
    console.log(this.state, value);
    let obj={title: value,
            categories: this.state.activity,
            content: this.state.date
        };
    createDate(obj);
    openNotification('success');
    (this.context.router.history.push('/'), setTimeout(()=>{ this.context.router.history.push('/calendar'); }, 500));
  };


  render() {
    return (
      <div>
        <Card style={{width:'99%'}}>
          <Row type="flex" justify="start" align="middle">
            <Col span={7}>
              <div style={{fontSize:'1.5em'}}>
                Set the date and time
              </div>
                <DatePicker
                  showTime ={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder='Select time'
                  onOk={(e)=>this.onOk(e)}
                  style={{ width: '90%' }}
                />
              <div>
                {this.state.toggle?
                  <span style={{fontSize: 12, color: 'red'}}>(please select the time at the bottom of calendar)</span>:<span> </span>
                }
              </div>
            </Col>
            <Col span={7}>
              <Select defaultValue="pickOne" style={{ width: '90%' }} onChange={(e)=>this.handleChange(e)}>
                <Option value="pickOne">Choose an activity</Option>
                <Option value="to chill">To Chill</Option>
                <Option value="play games">Play Games</Option>
                <Option value="upload gayP ics">Upload Gay Pics</Option>
              </Select>
            </Col>
            <Col span={7}>
              <Search
                placeholder="Name"
                enterButton="Post"
                onSearch={(e)=>{this.postValue(e)}}
              />
            </Col>
          </Row>
        </Card>
        <Col span={24}>
          {this.state.posts.map(post => {
            return (
              <Card
                    title={
                    <div>
                      <Icon style={{marginRight:5, color:'blue'}} type="global" />
                    {post.title} will be online to {post.categories} {String(post.content).slice(132)}
                    </div>}
                    key={post.content}
                    style={{width: '98%', margin: 10}}>
                <div>different timezones</div>
                <div className='postContent'>{String(post.content).slice(0,29)}</div>
                <div className='postContent'>{String(post.content).slice(29,63)}</div>
                <div className='postContent'>{String(post.content).slice(63,93)}</div>
                <div className='postContent'>{String(post.content).slice(93,122)}</div>
              </Card>
            );
          })
          }
        </Col>



      </div>
    );
  }
}

export default CalendarPage;
