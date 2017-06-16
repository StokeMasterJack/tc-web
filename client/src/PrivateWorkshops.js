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

        <p><Link to="/contact">Contact us</Link> to schedule an private workshop or request more information.</p>
      </Block>
    </Block>
  )
}
