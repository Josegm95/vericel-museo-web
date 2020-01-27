import React from 'react';
import { Home, Order, Specimen } from './Pages/pages';
import { Header, Footer } from './Components/components';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/orden/:order"
          render={routerProps => <Order match={routerProps.match} />}
        />
        <Route
          path="/especimen/:specimen"
          render={routerProps => <Specimen match={routerProps.match} />}
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
