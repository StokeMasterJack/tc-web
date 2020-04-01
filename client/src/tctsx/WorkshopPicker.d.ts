/// <reference types="react" />
import { WorkshopKey } from '../types';
export default function ({ name, value, onChange, label, emptyItem }: {
    name?: string;
    value?: WorkshopKey;
    emptyItem?: {
        value: string;
        text: string;
    };
    onChange: (event: {
        name?: string;
        value?: WorkshopKey;
    }) => void;
    label?: string;
}): JSX.Element;
