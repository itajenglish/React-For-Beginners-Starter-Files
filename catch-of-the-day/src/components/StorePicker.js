import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    console.log("You changed the Url");
    // first grab the text from the box
    // second we're going to transiton from / to /store/:storeId
    console.log(this.storeInput.value)
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

export default StorePicker;
