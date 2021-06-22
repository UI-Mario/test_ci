import React from 'react';

import './test.scss';

/**
 * https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
 * unsafe: componnetWillMount, componentWillUpdate, componentWillReceiveProps
 */

interface childState {
  child: string;
}

export default class child extends React.Component<any, childState> {
  constructor(props: any) {
    super(props);
    console.log('this is child constructor');
    this.state = {
      child: 'child',
    };
  }

  componentDidMount() {
    console.log('this is child componentDidMount');
  }

  componentDidUpdate(_prevProps: any, _prevState: any) {
    console.log(_prevProps);
    console.log(_prevState);
    console.log('this is child componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('this is componentWillUnmount');
  }

  render() {
    const { child } = this.state;
    console.log('this is child render');
    return (
      <div>
        <span>{child}</span>
        <button
          type="button"
          onClick={() => {
            this.setState({
              child: `child${child.length + 1}`,
            });
          }}
        >
          button
        </button>
      </div>
    );
  }
}
