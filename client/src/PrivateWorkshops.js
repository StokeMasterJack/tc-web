import * as React from "react";
import * as Block from "jsxstyle/Block";
import Link from "./Link";

export default function PrivateWorkshops() {
  return (
    <Block margin="1rem">
      <h1>Private Workshops</h1>
      <br/>
      <Link to="/contact">Contact us</Link> to schedule an on-site workshop or to request more information.

    </Block>
  );
}
