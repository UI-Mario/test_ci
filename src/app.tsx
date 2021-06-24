import React from 'react';
// import { renderRoutes } from 'react-router-config';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Counter from './components/counter/Counter';
import TestHook from './components/testHook/testHook';
import Parent from './components/testLifeCircle/Parent';

import { Page1 } from './view/testRouterView/Page1';
import { Page2 } from './view/testRouterView/Page2';
import { Child } from './view/testRouterView/Child';

import { TestRef } from './components/testRef/testRef';
import { TestPreLoadComponent } from './components/testPreLoad/testPreLoad';
import { TreeMap } from './components/treemap/treemap';

// import { routes } from './router/router';

function App() {
  return (
    // <IntlProvider locale={usersLocale} messages={trans}>
    <BrowserRouter>
      <div>123</div>
      <TestPreLoadComponent />
      {/* HashRouter里面一定要有一个根节点，不能直接写Route */}
      <div>
        <TreeMap />
        <h3>============================redux=============================</h3>
        <Counter />
        <h3>============================hook=============================</h3>
        <TestHook />
        <h3>============================ref:目前挂在一个react组件里=============================</h3>
        <TestRef />
        {}
        <h3>============================parent-child=============================</h3>
        <Parent />
        <h3>============================router=============================</h3>
        <ul>
          <li>
            <Link to="/">page1</Link>
          </li>
          <li>
            <Link to="/page2">page2</Link>
          </li>
          <li>
            <Link to="/child">child</Link>
          </li>
        </ul>

        <hr />

        {/* exact 精准匹配 */}
        <Route exact path="/" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/child" component={Child} />
        <h3>============================intl=============================</h3>
        <p>TODO</p>
        <h3>============================react-css-modules=============================</h3>
        <p>TODO</p>
      </div>
    </BrowserRouter>
    // </IntlProvider>
  );
}

export default App;
