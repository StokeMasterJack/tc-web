import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
export interface Item {
    readonly value: string;
    readonly label: string;
}
export interface PickerProps {
    readonly items: (Item | string)[];
    readonly value: string;
    readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
    readonly label?: ReactNode;
    readonly name?: string;
    readonly disabled?: boolean;
    readonly style?: CSSProperties;
}
export default function Picker(props: PickerProps): JSX.Element;
