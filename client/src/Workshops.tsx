import * as React from 'react';
import {Col} from 'jsxstyle';
import WorkshopCard from './WorkshopCard';
import * as service from './service';
import {CWorkshop} from './types';
import SsAppBar from './SsAppBar';
import PageHead from './tctsx/PageHead';

export default function (filter: { homePage?: boolean }) {

  const workshops: ReadonlyArray<CWorkshop> = service.loadWorkshopsSync(filter);

  function card(ws: CWorkshop) {
    return <WorkshopCard key={ws.key} workshop={ws}/>;
  }

  return <Col alignItems="center" paddingTop="1rem">
    {workshops.map(card)}
  </Col>;


  return <>
    <SsAppBar title='All Workshops'/>
    <PageHead title='All Workshops'/>
    <Col maxWidth='60rem' backgroundColor='' alignItems={'center'}>
      {/*{testimonials.map(t => <TestimonialCard key={t.id} testimonial={t}/>)}*/}
      {workshops.map(card)}
    </Col>
  </>;
}
