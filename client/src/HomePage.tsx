import * as React from 'react';
import Workshops from './Workshops';
import './HomePage.css';
import {Typography} from '@material-ui/core';
import SsAppBar from './SsAppBar';
import PageHead from './tctsx/PageHead';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import logo from './images/ss-logo-transparent.png';

function HeadPhone() {


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
      // title={<span>Professional Developer Training</span>}
      title={<img src={logo} alt="logo" style={{margin:0,padding:0,width:298,height:80}} />}
      subtitle='Kotlin - Flutter - React'
      logo={true}
    />

    <Typography variant={'caption'}>
      All classes available on-site or remote via Zoom
    </Typography>
  </>;
}

function HeadSmall() {
  return <>
    <PageHead
      // title={<span>Professional Developer Training</span>}
      title={<img src={logo} alt="logo" style={{margin:0,padding:0,width:149,height:40}} />}
      // subtitle='Kotlin - Flutter - React'
      logo={true}
    />

    <Typography variant={'caption'} style={{paddingTop:20}}>
      All classes available on-site or remote via Zoom
    </Typography>
  </>;
}

export default function () {
  // const wGt400 = useMediaQuery('(min-width:400px)');
  const wGt370 = useMediaQuery('(min-width:370px)');
  return <>
    <SsAppBar title={'Developer Training'}/>

    {wGt370 ? <HeadDesktop/> : <HeadSmall/>}

    <Workshops homePage={true}/>
  </>;


}


