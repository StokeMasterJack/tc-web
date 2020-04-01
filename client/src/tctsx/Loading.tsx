import * as React from 'react';

import {Col} from 'jsxstyle';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (props: {}) {
  return <Col padding="5rem" width="100%" height="100%" alignItems="center" justifyContent="center" backgroundColor="white">
    <CircularProgress variant={'indeterminate'} color={'secondary'} disableShrink={true}/>
  </Col>;
}
