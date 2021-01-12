import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loading from '@/component/loading';
import router from './router';

const App = () => {
  return <div className="app">
    <Suspense fallback={Loading}>
      <Switch>
        {router.map(elem => {
          const {path, ...rest} = elem;
          return <Route path={path} {...rest}/>
        })}
      </Switch>
    </Suspense>
  </div>
}

export default App;