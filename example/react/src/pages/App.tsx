import * as React from 'react';
import styles from './style.less';
import { hot } from 'react-hot-loader/root';

const AAA = React.lazy(() => import('./Header'));

export default hot(function App() {
  return (
    <a className={`${styles.ccc} a22aa`}>
      <React.Suspense fallback={() => 'loading'}>
        <AAA />
      </React.Suspense>
      caaaaaacc22211
    </a>
  );
});
