import React, {useState} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './rootRedux/store';

import Login from './login/login';
import UserHome from './user/user';

const Index = () => {
  
  const [view, setView] = useState('login');
  return(
    <Provider store={store}>
      {view === "login" ?
        (<Login setView={setView}/>) :
        (<UserHome setView={setView}/>)
      }
    </Provider>
  );

};

render(<Index />, document.getElementById('root'));
