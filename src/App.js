import React from 'react';
import { Home, Family } from './Pages/pages';
import { Header, Footer } from './Components/components';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/:family"
          render={routerProps => <Family match={routerProps.match} />}
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
