import * as React from 'react';
import {Col} from 'jsxstyle';
import Workshops from './Workshops';
import SsAppBar from './SsAppBar';
import PageHead from './tctsx/PageHead';

export default function () {
  // return <Col>
  //   <CardHeader title="Workshops"/>
  //   <Workshops/>
  // </Col>


  return <>
    <SsAppBar title='Workshops'/>
    <PageHead title='Workshops'/>
    <Col maxWidth='60rem' backgroundColor='' alignItems={'center'}>
      <Workshops/>
    </Col>
  </>;
}
