import React, {Component} from 'react';
import YTSearch from "youtube-api-search";
import './Vsecret.css';
import {Spin, Row, Col} from 'antd';

const API_KEY = 'AIzaSyDfqHbdWdMzB_UOH9XJLN1db9qboWEw3us';


class VideoButton extends Component {
  constructor(props) {
    super(props);

    this.state = { term : '' };

  }
  render() {

    return (
      <div className="container">
        <button onClick={(e) => {this.clickRandom(e)}} className="btn btn-primary btn-lg col-md-4">
          Next!
        </button>
      </div>
    );
  }

  clickRandom(){
    const modelNum = {
      1 : 'Candice Swanepoel',
      2 : 'Alessandra Ambrosio',
      3 : 'Adriana Lima',
      4 : 'Miranda Kerr',
      5 : 'Bar Refaeli',
      6 : 'Brooklyn Decker',
      7 : 'Marisa Miller',
      8 : 'Doutzen Kroes',
      9 : 'Erin Heatherton',
      10 : 'Rosie Huntington-Whiteley'
    };
    let randomNum;
    let max =10;
    let min =1;
    randomNum = Math.floor(Math.random()*(max-min+1)+ min);
    let modelName = modelNum[randomNum];
    this.setState({term : modelName});

    this.props.onSearchTermChange(modelName);



  }
}


const VideoDetail = ({video}) => {
  if (!video) {
    return <Spin size='large'/>
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-12">
      <div className="embed-responsive embed-responsive-16by9 mt-10">
        <iframe src={url} className="embed-responsive-item">
        </iframe>
      </div>

      <div className="details">
        <div>{video.snippet.title}</div>
      </div>
    </div>
  );
};




class Vsecret extends Component {

  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('Barbara Palvin');
  };

  videoSearch(term) {
    let randomNum;
    let max =4;
    let min =0;
    randomNum = Math.floor(Math.random()*(max-min+1)+ min);
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[randomNum]
      });
    });
  }



  render(){

    const videoSearch = (term) =>{ this.videoSearch(term)};
    return (
      <div>
        <Row>
          <Col span={16}>
          <h1>&nbsp;&nbsp;Random Victoria's Secret model</h1>
          </Col>
            <Col span={8}>
          <VideoButton
            onSearchTermChange={videoSearch}/>
            </Col>
        </Row>
        <VideoDetail video = {this.state.selectedVideo}/>
      </div>
    );
  }

}

export default Vsecret;
