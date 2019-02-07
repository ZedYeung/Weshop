import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import '../styles/App.css';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { ProductList } from './ProductList';
import { Product } from './Product';
import { Login } from './Login';
import { Register } from './Register';
import { Member } from './Member';
import { Footer } from './Footer';
import { TOKEN_KEY } from '../.env'


class App extends Component {
  state = {
    isLoggedIn: !! localStorage.getItem(TOKEN_KEY),
  }

  handleLogin = (res) => {
    console.log(res);
      localStorage.setItem(TOKEN_KEY, res.data.token);
      this.setState({isLoggedIn:true});
  }

  handleLogout = () =>{
      localStorage.removeItem(TOKEN_KEY);
      this.setState({isLoggedIn: false});
  }

  getLogin = (props) => {
    console.log(props);
    return this.state.isLoggedIn ? <Redirect to="/"/> : <Login {...props} handleLogin={this.handleLogin}/>;
  }

  getProduct = (props) => {
      return <Product productID={props.match.params && props.match.params.productID }/>
  }

  render() {
    return (
      <section className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
        <Navbar/>
        <Switch>
            {/* <Route exact path="/" render={this.getMain} /> */}
            <Route exact path="/" component={ProductList} />
            <Route path="/register" component={Register}/>
            <Route path="/login" render={this.getLogin}/>
            <Route path="/member" component={Member} /> 
            <Route path="/product/:productID" render={this.getProduct} /> 
            <Route component={ProductList} />
        </Switch>
        <Footer/>
      </section>
    );
  }
}

export default App;
