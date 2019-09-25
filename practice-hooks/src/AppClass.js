import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    counter:0,
    isOn: false,
    x: null,
    y: null
  }

  componentDidMount = () =>{
    document.title = `I have been clicked `+this.state.counter+` times`
    document.addEventListener("mousemove", handleMouseMove)
  }
  componentDidUpdate = () => {
    document.title= `I have been clicked `+this.state.counter+` times`
  }
  incrementCounter = () =>{
    this.setState(prevState => ({counter: prevState.counter + 1}))
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    })
  }

  toggelLight = () =>{
    this.setState(prevState => ({isOn:!prevState.isOn}))
    console.log('isOn',this.state.isOn)
  }

  render(){
    return (
      <>
          <h2>Counter</h2>
          <button onClick={this.incrementCounter}>I am clicked {this.state.counter} times</button>

          <h2>Toggel Light</h2>
          <div style ={{
            width:'50px',
            height:'50px',
            background: this.state.isOn ? 'yellow':'grey'
          }}
          onClick={this.toggelLight}></div>
          <h2>Mouse Position</h2>
          {this.state.x, this.state.y}
      </>
    )
  }
}

export default App;
