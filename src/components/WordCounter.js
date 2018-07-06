import React, {Component} from 'react';

class WordCounter extends Component {

  state={
    text:''
  };

  typeStuff=(e)=>{
    this.setState({text:e.target.value});
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary mb-3">
          <div className="container">
            <div className="navbar-brand">How many words are there?</div>
          </div>
        </nav>
        <div>
          <div>
            <br/>

            <div className="form-group">
              <textarea value={this.state.text} onChange={this.typeStuff} rows="5" id="body" className="form-control" placeholder="Type something">

              </textarea>
               </div>
              <button className="post-submit btn btn-primary btn-block">{this.state.text.length} characters
                <br/>
                {this.state.text.length===0?0:this.state.text.trim().split(/\s+/).length} words
              </button>
          </div>
          <div className="counter-body card card-body card-form mt-5">

          </div>
        </div>

      </div>
    );
  }
}

export default WordCounter;
