
import Layout from './components/Layout/Layout'
import React from 'react' ;
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import {Route} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
function App() {
  return (

    <div >
  <Layout>

<Route path="/" exact component={BurgerBuilder}/>
<Route path="/orders" component = {Orders} />
<Route path="/checkout" component={Checkout}/>


  </Layout>
    </div>

  );
}

export default App;
