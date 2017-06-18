import * as React from "react"
import * as Block from "jsxstyle/Block"
import Link from "./Link"
import {CardTitle} from "material-ui/Card"

export default function PrivateWorkshops() {
  return (
    <Block >
      <CardTitle title="Private Workshops"/>
      <Block paddingLeft="1rem" maxWidth="50rem">
        <p>Any of our workshops can be conducted privately for your company. If you have the facilities,
          we can conduct the training workshop on-site at your location otherwise we can arrange an off-site
          location that is convenient for your group.</p>

        <h3 className="workshop-h3">Pricing</h3>
        <p>The price for an on-site 5-day instructor-led workshop is $9,750.
          Price includes all travel and course materials.
          Client to provide training facility and computers.
          Smart Soft can arranges an off-site computer training facility for an extra charge.
        </p>

        <p><Link to="/contact">Contact us</Link> to schedule a private workshop or request more information.</p>
      </Block>
    </Block>
  )
}
