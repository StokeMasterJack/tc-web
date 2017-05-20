import * as React from "react";
import * as ss from "./util";

type Props = {
    to:string,
    children?:any,
    title?:string
}

export default function Link(props: Props) {

    const onClick = (event) => {
        event.preventDefault();
        ss.spaRedir(props.to)
    };

    return <a
        href={props.to}
        title={props.title}
        onClick={onClick}>{props.children}</a>
}