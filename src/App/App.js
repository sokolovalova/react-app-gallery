
import React from 'react';
import {Favorites} from '../Favorites/Favorites';
import {Gallery} from '../Gallery/Gallery';
import { Route, Link, Switch, Redirect, RouteChildrenProps, RouteComponentProps, withRouter, RouteProps } from 'react-router-dom';
import styles from './App.module.scss';

 class App extends React.Component {
 
 headerMenu(){
   return(
    <header className={styles.head}>
      <div className={styles.headPoints}>
        <Link to="/">gallery</Link>
        <Link to="/favorites">favorites</Link>
      </div>
  </header>
   );
 }
 
 renderPage(){
   return(
     <Switch>
       <Route exact path="/" render={()=><Gallery/>}/>
       <Route exact path="/favorites" render={()=><Favorites/>}/>
       <Redirect  to='/404' />
     </Switch>
   );
 }
 
  render() {
    console.log("App");
    return (
     <div>
       {this.headerMenu()}
       {this.renderPage()}
     </div>
    );

  }

}


export default App;