import * as React from 'react';
import * as qs from './qs';
import WorkshopDetail from './WorkshopDetail';
import HomePage from './HomePage';
import WorkshopsPage from './WorkshopsPage';
import Contact from './Contact';
import Schedule from './Schedule';
import SignupVu from './SignupVu';
import SignupRecord from './SignupRecord';
import PrivateWorkshops from './PrivateWorkshops';
import PayWithCreditCard from './PayWithCreditCard';
import Testimonials from './Testimonials';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme, {Theme} from '@material-ui/core/styles/createMuiTheme';
import EvalVu from './EvalVu';
import {CPath, Path} from './util/paths';
import ACtx from './ACtx';

const setGlobalTitleAndMetaDesc = () => {
  const seoTitle = 'Flutter Training';
  const seoMetaDesc = '5-day hands-on, instructor-led Flutter training. Public and private workshops.';
  window.document.title = seoTitle;
  const meta: Element = window.document.querySelector('meta[name=\'description\']')!!;
  meta.setAttribute('content', seoMetaDesc);
};

const router = (pathName: string, search: string) => {
  setGlobalTitleAndMetaDesc();
  const p: Path = CPath.mk(pathName);
  if (p.isRoot) return <HomePage/>;

  //dead paths
  if (pathName === '/signup/Signup1.html') return <HomePage/>;
  if (pathName === '/signup/SignupForm.html') return <HomePage/>;

  const page: string = p.seg(0);

  if (page === 'workshops') return <WorkshopsPage/>;
  if (page === 'contact') return <Contact/>;
  if (page === 'testimonials') return <Testimonials/>;

  if (page === 'schedule') {
    return <Schedule workshopKey={p.segOrUnd(1)}/>;
  }

  if (page === 'signup') {
    return <SignupVu workshopKey={p.seg(1)} date={p.seg(2)}/>;
  }
  if (page === 'eval') return <EvalVu/>;

  if (page === 'signupRecord') {
    const testMode: boolean = qs.has(search, 'test');
    const isNewSignup: boolean = qs.has(search, 'isNewSignup');
    return <SignupRecord id={p.seg(1)} testMode={testMode} isNewSignup={isNewSignup}/>;
  }


  if (page === 'privateWorkshops') return <PrivateWorkshops/>;
  if (page === 'payWithCreditCard') return <PayWithCreditCard/>;

  if (page.endsWith('-training')) {
    const workshopKey = page.replace('-training', '');
    return <WorkshopDetail workshopKey={workshopKey}/>;
  }

  // if (page === "cc") {
  //   const workshopKey:string = ensure(paths.segmentAt(path, 1));
  //   return <CcPayment workshopKey={workshopKey} />;
  // }

  return <HomePage/>;
};

const router2 = (location: Location) => {
  const p = location.pathname;
  const s = location.search;
  return router(p, s);
};


export default function () {

  const theme: Theme = createMuiTheme();

  const route = router2(window.location);

  const AContext = ACtx.AContext;

  return <ThemeProvider theme={theme}>
    <AContext.Provider value={new ACtx(theme)}>
      {route}
    </AContext.Provider>
  </ThemeProvider>;


}
