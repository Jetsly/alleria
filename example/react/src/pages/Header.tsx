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
    a: 'cccs4s444s2224442',
  };
  render() {
    return (
      <div
        onClick={() => {
          this.setState({
            a: 'ddd111',
          });
        }}
      >
        11 {this.state.a}
        <Footer />
      </div>
    );
  }
}
