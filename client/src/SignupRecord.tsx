import * as React from "react";
import * as Block from "jsxstyle/Block";
import * as t from "./types";
import * as firebase from "firebase/app";

interface Props {
  id: string
}
type State = t.Signup | null;

export default class SignupRecord extends React.Component<Props, State> {

  props: Props;
  state: State;
  mounted: boolean;

  constructor(props: Props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchSignupRecord();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state === null) return <div>Loading...</div>;
    const s: t.Signup = this.state;

    return (
      <Block>
        <h1>SignupRecord</h1>
        {s.name}
        {s.companyName}
      </Block>
    );
  }

  fetchSignupRecord() {
    const id = this.props.id;
    const database = firebase.database();
    const signupRef = database.ref("signups/" + id);
    signupRef.on("value", snapshot => {
      if(snapshot === null) throw Error();
      this.setState(snapshot.val());
    });
  }
}
