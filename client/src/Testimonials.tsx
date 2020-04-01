import * as React from 'react';
import {Col} from 'jsxstyle';
import TestimonialCard from './TestimonialCard';
import SsAppBar from './SsAppBar';
import PageHead from './tctsx/PageHead';
import * as service from './service';
import {Testimonial} from './types';

export default function Testimonials() {

  const testimonials: ReadonlyArray<Testimonial> = service.loadTestimonialsSync();
  // return <Col backgroundColor='' alignItems={'center'} paddingBottom='1rem' margin={0} padding={0}>
  //   <SsAppBar title='Testimonials'/>
  //   <PageHead title='Testimonials'/>
  //   {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t}/>)}
  // </Col>;

  return <>
    <SsAppBar title='Testimonials' />
    <PageHead title='Testimonials' />
    <Col maxWidth='60rem' backgroundColor='' alignItems={'center'}>
      {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t}/>)}
    </Col>
  </>;


}
