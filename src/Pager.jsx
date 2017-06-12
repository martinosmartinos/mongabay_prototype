import React, {Component} from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    }
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount() {
    this.setState({
      count: this.state.count + 1
    }, () => {
      this.props.onChangePageNumber(this.state.count);
    });
  }

  decrementCount() {
    this.setState({
      count: this.state.count - 1
    }, () => {
      this.props.onChangePageNumber(this.state.count);
    });
  }

  renderNewer(){
    if (this.state.count == 1) {
      return (
        <button className="btn disabled" onClick={this.decrementCount}>&lt;</button>
      );
    } else {
      return (
        <button className="btn btn-primary" onClick={this.decrementCount}>&lt;</button>
      );
    }
  }

  render(){
    return (
      <div className="counter">
        <div className="row">
          <div className="col-2">
            {this.renderNewer()}
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            <button className="btn btn-primary" onClick={this.incrementCount}>&gt;</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;