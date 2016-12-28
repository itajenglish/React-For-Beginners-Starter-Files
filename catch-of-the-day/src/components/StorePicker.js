import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // first grab the text from the box
  // second we're going to transiton from / to /store/:storeId
  goToStore(event) {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
    console.log("You changed the Url");
    console.log(`Going to ${storeId}`)
  }
  render() {
    return(
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      <h2>Please Enter A Store</h2>
      <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
      <button type="submit">Vist Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
