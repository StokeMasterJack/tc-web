import * as React from "react";
import {useCallback, useState} from "react";

import {Block, Col} from "jsxstyle";

import {Theme} from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from "@material-ui/styles/useTheme";

// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography/Typography";
// import Clear from "@material-ui/icons/Clear";


import {Box, BoxEmpty, boxFrom} from "../util/box";


interface Props {
    label: string;
    children?: React.ReactNode;
}

export default function OutlineContainer(props: Props) {
    
    const theme: Theme = useTheme();
    
    const label = props.label;
    const [contentBox, setContentBox] = useState<Box>(BoxEmpty);
    const [labelBox, setLabelBox] = useState<Box>(BoxEmpty);
    
    const contentRef = useCallback((n: HTMLElement | null) => {
        if (n !== null) {
            const box = boxFrom(n);
            setContentBox(box);
        }
    }, []);
    
    const labelRef = useCallback((n: HTMLElement | null) => {
        if (n !== null) {
            const box = boxFrom(n);
            setLabelBox(box);
        }
    }, []);
    
  
    const outlineColor = theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    const outlineLabelColor = "rgba(0, 0, 0, 0.54)";
    const outlineLabelColorFocus = theme.palette.primary.main;
    const outlineLabelColorHover = theme.palette.text.primary;
    
    const myStyles: any = {
        root: {
            margin: 0,
            marginTop:10,
            marginLeft:".5rem",
            marginRight:".5rem",
            // backgroundColor: "rgba(0,0,255,.4)",
            // zIndex: 40000
        },
        fieldsetParent: {
            position: "relative",
            alignItems: "stretch",
            justifyContent: "center",
            padding: 0,
            margin: 0,
            marginTop: -16
            // backgroundColor: "yellow",
            // transform: "translate(0px, 0px)"
        },

        fieldset: {
            position: "absolute",
            top: -6,
            bottom: 0,
            left: 0,
            right: 0,
            borderColor: outlineColor,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: theme.shape.borderRadius,
            paddingTop: 2,
            paddingBottom: 0,
            paddingLeft: 2,
            paddingRight: 2,
            margin: 0,
            // backgroundColor: "blue",
            '&:hover': {
                borderColor: outlineLabelColorHover,
                borderWidth: 1,
                '@media (hover: none)': {
                    borderColor: outlineColor,
                    borderWidth: 1,
                    paddingLeft: 2,
                    paddingRight: 2
                }
            },
            '&:focus-within': {
                borderColor: outlineLabelColorFocus,
                borderWidth: 2,
                paddingLeft: 1,
                paddingRight: 1
            }
        },
        legend: {
            margin: 0,
            marginLeft: 5,
            padding: 0,
            height: 8,

            // backgroundColor: "yellow"
        },
        label: {
            color: outlineLabelColor,
            fontSize: "1rem",
            lineHeight: "1",
            height: "1rem",
            transform: "translate(10.0px, -10.0px) scale(0.75)",
            transformOrigin: "left",
            padding: 0,
            margin: 0,
            // marginTop:-32,
            zIndex: 10,
            // backgroundColor: "cyan",
        },
        contentWrapper: {
            margin: 0,
            padding: 0,
            paddingLeft: 1,
            paddingRight:10,
            justifyContent:'center'
            // backgroundColor: "pink"
        }
    };
    
    const useStyles = makeStyles(myStyles);
    
    // logBox(labelBox, "Label");
    // logBox(contentBox, "Content");
    
    const classes = useStyles();

    return <Col className={classes.root} backgroundColor={""}>
        <Block className={classes.label} props={{ref: labelRef}}  >{label}</Block>
        <Col className={classes.fieldsetParent} width={contentBox.offset.width + 20} height={contentBox.offset.height + 8} backgroundColor={""}>
            <fieldset className={classes.fieldset} >
                <legend className={classes.legend} style={{width: 80}}><span>&#8203;</span></legend>
                <Col className={classes.contentWrapper} props={{ref: contentRef}}>{props.children}</Col>
            </fieldset>
        </Col>
    
    </Col>;
}