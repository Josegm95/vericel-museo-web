import React from 'react';
import { Home, Order, Specimen } from './Pages/pages';
import { Header, Footer } from './Components/components';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/orden/:order" component={Order} />
        <Route path="/especimen/:specimen" component={Specimen} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
