import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
// import sampleFishes from '../sample-fishes'

class App extends React.Component{
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    //getinitialState
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish){
    // update our state
    const fishes = {...this.state.fishes}
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //set state
    this.setState({ fishes })
  }

  loadSamples() {
    this.setState({
      // fishes
    })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea Food Marget" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;
