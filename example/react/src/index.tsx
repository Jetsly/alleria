import * as React from 'react';
import { render } from 'react-dom';
import App from './pages/App';
import gql from 'graphql-tag';
import './global.less';

fetch('v2/5185415ba171ea3a00704eed');

render(<App />, document.getElementById('root'));
const receiptDataQuery = gql`
  query receiptDataQuery {
    result(input: $values)
      @rest(
        type: "RsetResp"
        path: "/doku/disburseRecord/list"
        method: "POST"
      ) {
      content
      metadata
      isSucc
    }
  }
`;
console.log(receiptDataQuery);
