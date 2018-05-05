import * as React from "react"
import * as Block from "jsxstyle/Block"
import {CardTitle} from "material-ui/Card"
import * as Row from "jsxstyle/Row"

export default function Contact(props) {
  return (
    <Block>
      <CardTitle title="Contact Us"/>
      <Block padding="1rem">
        <Row marginBottom="1rem">
          <Block width="5rem">Email:</Block>
          <Block>
            <a
              href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=dford@smart-soft.com&amp;su=Developer Training"
              data-reactid=".0.d.0.3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              dford@smart-soft.com
            </a>
          </Block>
        </Row>
        <Row marginBottom="1rem">
          <Block width="5rem">Phone:</Block>
          <Block>
            (714) 654-6550
          </Block>
        </Row>
        <Row marginBottom="1rem">
          <Block width="5rem">Address:</Block>
          <Block>
            14 Via Alonso<br />
            San Clemente, CA 92673<br />
          </Block>
        </Row>
      </Block>

    </Block>
  )
}
