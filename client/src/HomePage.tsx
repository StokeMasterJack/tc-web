import * as React from 'react';
import {CSSProperties} from 'react';
import {Block, Col, Row} from 'jsxstyle';
import Workshops from './Workshops';
import './HomePage.css';
import logo2 from './images/ss-logo-transparent-2.png';
import {isPhone} from './device';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {Theme, Typography} from '@material-ui/core';
import SsAppBar from './SsAppBar';
import PageHead from './tctsx/PageHead';
import {TcButton} from './tctsx/TcButton';
import TableRow from '@material-ui/core/TableRow';
import {TableCellProps} from '@material-ui/core/TableCell';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {Urls} from './util/globals';

const boxStyleDesktop: CSSProperties = {
  width: '19rem',
  margin: '1rem',
  // textAlign: "center",
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const boxStyleMobile: CSSProperties = {
  // width: "90%",
  // width: "19rem",
  // margin: "1rem",
  // textAlign: 'center',
  padding: '1rem',
  margin: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const boxStyle = isPhone() ? boxStyleMobile : boxStyleDesktop;


function PublicCard() {
  return <Card style={boxStyle}>
    <Block>
      <CardHeader
        title="Public Workshops"
        style={{marginBottom: '.5rem', padding: 0}}
      />
      <CardContent style={{margin: 0, padding: 0}}>
        <Block>
          Open-enrollment workshops at our training center in San Clemente, California.
        </Block>
        {/*<Block marginTop="1rem">Max class size: 4 students</Block>*/}
      </CardContent>
    </Block>
    <CardActions>
      <TcButton href={Urls.schedule()} title="Schedule of Public Workshops">Schedule</TcButton>
    </CardActions>
  </Card>;

}

function PrivateCard() {
  return <Card style={boxStyle}>
    <Block>
      <CardHeader
        title="Private Workshops"
        style={{marginBottom: '.5rem', padding: 0}}
      />
      <CardContent style={{margin: 0, padding: 0}}>
        <Block>
          Schedule an on-site workshop at your company's location.
        </Block>
        {/*<Block marginTop="1rem">Max class size: 10 students</Block>*/}

      </CardContent>
    </Block>
    <CardActions>
      <TcButton href={Urls.privateWorkshops} title="Schedule of Public Workshops">More Info</TcButton>
    </CardActions>
  </Card>;
}

const BoxesDesktop = () => {
  return <Row
    justifyContent="center"
    alignItems="stretch"
    paddingTop="3rem"
    paddingLeft="1rem"
    paddingRight="1rem"
  >

    <PublicCard/>
    <PrivateCard/>
  </Row>;

};

const BoxesPhone = () => {
  return <Col
    // backgroundColor="cyan"
    alignItems="center"
    // paddingTop="3rem"
    // paddingLeft="2rem"
    // paddingRight="1rem"
  >
    <Row><PublicCard/></Row>
    <Row><PrivateCard/></Row>
  </Col>;

};

const Boxes = () => {
  return isPhone() ? <BoxesPhone/> : <BoxesDesktop/>;
};

const Header = () => <Block paddingTop="1rem">
  <Row
    color="rgba(255, 255, 255, 0.541176)"
    justifyContent="center"
    alignItems="center"
  >
    {!isPhone() ? <img src={logo2} alt="Smart Soft - Flutter Training"/> : null}
  </Row>

  <Row
    justifyContent="center"
    fontSize="2rem"
    alignItems="center"
    paddingTop={isPhone() ? '1rem' : '3.2rem'}
    paddingBottom="1rem"
    textAlign="center"

  >
    <Typography variant={'h4'} color={'secondary'}>Flutter Training</Typography>

  </Row>

</Block>;


function HeadPhone() {

  function Td(props: TableCellProps) {
    const theme = useTheme<Theme>();
    const w = '5rem';
    const variant = isPhone() ? 'caption' : 'h6';
    return <td
      style={{
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.divider,
        // backgroundColor: 'yellow',
        width: w,
      }}>
      <Typography
        variant={variant}
        color={'textSecondary'}
        >{props.children}</Typography>
    </td>;
  }

  function Table(){
    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
      <table style={{borderCollapse: 'collapse'}}>
        <tbody>
        <tr>
          <Td>Flutter</Td>
          <Td>Kotlin</Td>
        </tr>
        <TableRow>
          <Td>React</Td>
          <Td>TypeScript</Td>
        </TableRow>
        </tbody>
      </table>
    </div>;
  }

  return <>
    <PageHead
      title={<span>Professional <br/> Developer Training</span>}
      // subtitle='Developer Training'
      logo={true}
    />



  </>;
}

function HeadDesktop() {
  return <>
    <PageHead
    title={<span>Professional Developer Training</span>}
    subtitle='Kotlin - Flutter - React - TypeScript'
    logo={true}
    />

    <Typography variant={'caption'} >
      All classes available on-site or remote via Zoom
    </Typography>
    </>;
}

export default function () {
  const wGt400 = useMediaQuery('(min-width:400px)');
  const wGt370 = useMediaQuery('(min-width:370px)');
  return <>
    <SsAppBar title={'Developer Training'}/>

    {wGt370 ? <HeadDesktop/> : <HeadPhone/>}

    <Workshops homePage={true}/>
  </>;


}


