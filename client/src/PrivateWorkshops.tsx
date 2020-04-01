import * as React from 'react';
import Lnk from './Lnk';
import {Envelope} from './Envelope';

export default function () {


  function Body() {
    return <div style={{padding: '1rem'}}>
      <p>Any of our workshops can be conducted privately for your company. If you have the facilities,
        we can conduct the training workshop on-site at your location otherwise we can arrange an off-site
        location that is convenient for your group.</p>

      <h3 className="workshop-h3">Pricing</h3>
      <p>The price for an on-site 5-day instructor-led workshop is $9,750.
        Price includes all travel and course materials.
        Client to provide training facility and computers.
        Smart Soft can arranges an off-site computer training facility for an extra charge.
      </p>

      <p><Lnk to="/contact">Contact us</Lnk> to schedule a private workshop or request more information.</p>
    </div>;
  }

  return <Envelope title={'Private Workshops'} subtitle={'On-site at your company'}>
    <Body/>
  </Envelope>;

}
