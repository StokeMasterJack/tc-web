import * as React from "react";
import * as Block from "jsxstyle/Block";
import {
  Card,
  CardHeader,
  CardTitle,
  CardText
} from "material-ui/Card";
import * as Row from "jsxstyle/Row";

export default function Contact(props) {
  return (
    <Block margin="1rem">
      <CardTitle title="Contact Us"/>
      <Card>
        <CardHeader
          title="Dave Ford"
          subtitle="Owner and Lead Instructor"
          avatar="https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-1/c17.0.166.166/1779141_10151867592682581_329363085_n.jpg?oh=e5fca7ad25c8fdbbefc8d12ec88290b0&oe=597A6F65"
        />

        <CardText>
          <Row marginBottom="1rem">
            <Block width="5rem">Email:</Block>
            <Block>
              <a
                href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=dford@smart-soft.com&amp;su=React Training"
                data-reactid=".0.d.0.3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                dford@smart-soft.com
              </a>
            </Block>
          </Row>

          <Row marginBottom="1rem">
            <Block width="5rem">Mobile:</Block>
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

        </CardText>

      </Card>

    </Block>
  );
}
