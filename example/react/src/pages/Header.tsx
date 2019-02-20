import * as React from 'react';

export class Footer extends React.Component<{}> {
  state = {
    a: '111',
  };
  render() {
    return (
      <div
        onClick={() => {
          this.setState({
            a: '222',
          });
        }}
      >
        22222 {this.state.a}
      </div>
    );
  }
}
export default class Header extends React.Component<{}> {
  state = {
    a: 'ccc',
  };
  render() {
    return (
      <div
        onClick={() => {
          this.setState({
            a: 'ddd',
          });
        }}
      >
        11 {this.state.a}
        <Footer />
      </div>
    );
  }
}
