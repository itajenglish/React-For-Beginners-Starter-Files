import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    //getinitialState
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    //This runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
    {context: this,
      state: 'fishes'
    });

    //Checks if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if(localStorageRef){
    //update our App component's order state
    this.setState({
      order: JSON.parse(localStorageRef)
    })
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);

  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
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

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  removeFish(key) {
    const fishes = {...this.state.fish};
    fishes[key] = null;
    this.setState({ fishes })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    //Take copy of state
    const order = {...this.state.order};
    //update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // Updae our state
    this.setState({ order })
  }

  removeFromOrder(key){
    const order = {...this.state.order}
    delete order[key];
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea Food Marget"/>
          <ul className="list-of-fishes">
            {
              Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order removeFromOrder={this.removeFromOrder} params={this.props.params} fishes={this.state.fishes} order={this.state.order} />
        <Inventory storeId={this.props.params.storeId} removeFish={this.removeFish} updateFish={this.updateFish} fishes={this.state.fishes} loadSamples={this.loadSamples} addFish={this.addFish} />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}
export default App;
