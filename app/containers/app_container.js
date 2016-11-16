import React, { Component } from 'react';
import { connect } from 'react-redux';


// Containers / Components
import Footer from '../components/footer';

class App extends Component {


  render () {
    return (
      <div className='appContainer'>
        <div className="page-wrap">
        {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect()(App);
