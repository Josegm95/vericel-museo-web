import React from 'react';
import { Home, Order } from './Pages/pages';
import { Header, Footer } from './Components/components';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/orden/:orden"
          render={routerProps => <Order match={routerProps.match} />}
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
