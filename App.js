import React, { Component } from "react";

import Splash from "./view/Splash/Splash";
import Map from "./view/Map/Map";

export default class Betty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: <Splash />
    };
  } 
  componentDidMount() {
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({ component: <Map /> });
    }, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }
  render() {
    return this.state.component;
  }
}
