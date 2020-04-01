import SsAppBar from './SsAppBar';
import PageHead from './tctsx/PageHead';
import {Col} from 'jsxstyle';
import * as React from 'react';

export function Envelope({title, subtitle, children}: { title?: string, subtitle?: string, children: JSX.Element[] | JSX.Element }) {
  return <>
    <SsAppBar title={title}/>
    <PageHead title={title} subtitle={subtitle}/>
    <Col maxWidth='60rem' backgroundColor='' alignItems={'center'}>
      {children}
    </Col>
  </>;
}