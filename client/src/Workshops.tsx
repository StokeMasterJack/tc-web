import * as React from 'react';
import {Col} from 'jsxstyle';
import WorkshopCard from './WorkshopCard';
import * as service from './service';
import {CWorkshop} from './types';

export default function (filter: { homePage?: boolean }) {

  const workshops: ReadonlyArray<CWorkshop> = service.loadWorkshopsSync(filter);

  function card(ws: CWorkshop) {
    return <WorkshopCard key={ws.key} workshop={ws}/>;
  }

  return <Col alignItems="center" paddingTop="1rem">
    {workshops.map(card)}
  </Col>;

}
