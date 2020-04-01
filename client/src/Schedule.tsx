import React, {useEffect, useState} from 'react';
import {Block, Col, Row} from 'jsxstyle';
import Lnk from './Lnk';

import * as service from './service';
import {CEvent, CWorkshop, Signup, WorkshopKey} from './types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {isPhone} from './device';
import Typography from '@material-ui/core/Typography';
import SsAppBar from './SsAppBar';
import PageHead from './tctsx/PageHead';
import {TcButton} from './tctsx/TcButton';
import WorkshopPicker from './tctsx/WorkshopPicker';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {spaRedir} from './util/ssutil';
import {Urls} from './util/globals';


//workshopKey=null for all
export default function Schedule({workshopKey}: { workshopKey?: string }) {
  const widthGt400 = useMediaQuery('(min-width:400px)');
  // const [workshopKey, setWorkshopKey] = useState<string | undefined>(workshopKeyInit);

  const events = service.loadEventsSync({workshopKey, isComplete: false});

  function Body() {
    if (events.length === 0) return <BodyEmpty/>;
    return <BodyNotEmpty events={events}/>;
  }

  const onFilterChange = ({value}: { value?: WorkshopKey }) => {
    spaRedir(Urls.schedule(value));
  };

  const picker = <WorkshopPicker value={workshopKey} onChange={onFilterChange} label={widthGt400?'Filter':undefined}/>;
  //  <Col backgroundColor='' alignItems={'center'} paddingBottom='1rem' margin={0} padding={0}>
  const workshopTitle = (widthGt400 || true) && !!workshopKey?service.loadWorkshopSync(workshopKey).title:'';
  return <>
    <SsAppBar title='Schedule' actions={picker}/>
    <PageHead title='Schedule' subtitle={`Public ${workshopTitle} workshops`}/>
    <Col maxWidth='60rem' backgroundColor='' alignItems={'center'}>
      <Body/>
    </Col>
  </>;


}

function BodyEmpty() {

  return <Block padding="2rem" textAlign="center">
    <Block>No workshops currently scheduled.</Block>
    <Block paddingTop="1rem">Send us an <Lnk to="/contact">email</Lnk> with your date preferences and we'll add
      one.</Block>
  </Block>;
}


function BodyNotEmpty({events}: { events: ReadonlyArray<CEvent> }) {
  function eventToCard(e: CEvent) {
    return <GridListTile key={e.key}>
      <ScheduleCard e={e}/>
    </GridListTile>;
  }

  return <GridList cellHeight={isPhone() ? 230 : 250} cols={isPhone() ? 1 : 3}>
    {events.map(eventToCard)}
  </GridList>;
}

const cardAction2 = (e: CEvent, signups?: ReadonlyArray<Signup>) => {
  const status = e.computeStatus(signups);
  switch (status) {//fmt-
      case 'SoldOut': return <TcButton style={{flex: 1, marginLeft: '.5rem'}} disabled={true} href={e.urlSignup}>Sold out</TcButton>;
      case 'Loading': return <TcButton style={{flex: 1, marginLeft: '.5rem'}} disabled={true}  href={e.urlSignup} >Loading...</TcButton>;
      case 'Open': return <TcButton style={{flex: 1, marginLeft: '.5rem'}} href={e.urlSignup} >Signup</TcButton>;
      case 'Complete': return <TcButton style={{flex: 1, marginLeft: '.5rem'}} disabled={true} href={e.urlSignup}>Complete</TcButton>;
      default: throw Error();
    }//fmt+
};

function ScheduleCard({e}: { e: CEvent }) {
  const {workshopKey, date} = e;
  const w: CWorkshop = e.workshop;
  const [signups, setSignups] = useState<ReadonlyArray<Signup>>();

  useEffect((() => {
    let mounted = true;
    service.loadSignupsAsync({workshopKey, date}).then(a => mounted && setSignups(a));
    return () => {
      mounted = false;
    };
  }), [workshopKey, date]);

  return (
    <Card style={{maxWidth: '23rem', margin: '1rem', paddingBottom: 10, backgroundColor: ''}}>
      {/*<CardHeader title={w.title} subheader={w.subtitle} style={{backgroundColor: '', padding: '.5rem'}}/>*/}

      <CardContent style={{backgroundColor: ''}}>
        <Col>
          <Typography variant={isPhone() ? 'h6' : 'h5'}>{w.title}</Typography>
          <Typography variant='body1' color={'textSecondary'}>{w.subtitle}</Typography>
          <div style={{display: 'flex', paddingTop: 10}}>
            <Typography color={'textSecondary'}>Date: &nbsp;</Typography>
            <Typography color={'textPrimary'}>{e.startDateFormatted()}</Typography>
          </div>
          <Row>
            <Typography color={'textSecondary'}>Location: &nbsp;</Typography>
            <Typography color={'textPrimary'}>{e.location}</Typography>
          </Row>
        </Col>
      </CardContent>

      {/*<CardActions style={{paddingLeft: '1rem'}}>*/}
      {/*  <TcButton href={w.url}>Details</TcButton>*/}
      {/*  <Row marginRight={10}/>*/}
      {/*  {cardAction2(e, signups)}*/}
      {/*</CardActions>*/}

      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
        padding: '1rem',
        paddingTop: '0rem',
        paddingBottom: '.5rem',
      }}
      >

        <TcButton style={{flex: 1, marginRight: '.5rem'}}  href={w.url}>Details</TcButton>
        {cardAction2(e, signups)}
      </div>
    </Card>
  );
}




