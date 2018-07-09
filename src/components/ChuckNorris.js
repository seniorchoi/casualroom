import React, {Component} from 'react';
import {getJoke} from "./actions";
import {Affix, Button} from 'antd';
import PropTypes from "prop-types";

class ChuckNorris extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      current: 'dashboard',
      jokes:[],
      counter:0,
      timer:5000,
      allJokes:[]
    };

  }
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
          this.setState({timer:this.state.timer-500, allJokes:[...this.state.allJokes, this.state.jokes[this.state.counter]]});
          this.weirdCounter(this.state.timer);
        } else if(this.state.timer>10){
          this.setState({timer:this.state.timer-10, allJokes:[...this.state.allJokes, this.state.jokes[this.state.counter]]});
          this.weirdCounter(this.state.timer);
        }
        else if(this.state.timer>1){
          this.setState({timer:this.state.timer-0.1, allJokes:[...this.state.allJokes, this.state.jokes[this.state.counter]]});
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
          this.setState({timer:this.state.timer+5, allJokes:[...this.state.allJokes, this.state.jokes[this.state.counter]]});
          this.weirdPlusCounter(this.state.timer);
        }
        else if(this.state.timer<500){
          this.setState({timer:this.state.timer+50, allJokes:[...this.state.allJokes, this.state.jokes[this.state.counter]]});
          this.weirdPlusCounter(this.state.timer);
        }
        else if(this.state.timer<5500){
          this.setState({timer:this.state.timer+500, allJokes:[...this.state.allJokes, this.state.jokes[this.state.counter]]});
          this.weirdPlusCounter(this.state.timer);
        }
        else{
          this.weirdCounter(time);
        }
        this.setState({counter:this.state.counter+1});
      },time
    )
  }
  backToDash=()=>{
    this.context.router.history.push('/');
  }


  render() {
    const {jokes, counter, allJokes} = this.state;

    return (

      <div>
        {(jokes && counter)?
        <div>
          <Affix offsetTop={700}>
            <Button onClick={this.backToDash} type='primary' style={{marginLeft:'100%'}}>
              Back to Dashboard
            </Button>
          </Affix>
          Product Owners never argue with Chuck Norris after he demonstrates the DropKick feature.Product Owners never argue with Chuck Norris after he demonstrates the DropKick feature.
          {allJokes.map(joke=>{
            window.scrollTo(0,document.body.scrollHeight);
            return(
              <div>{joke}</div>
            );
          })}
        </div>
          :<div/>
        }
      </div>

    );
  }
}

export default ChuckNorris;
