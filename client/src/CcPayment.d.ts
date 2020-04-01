/// <reference types="react" />
import { Token } from 'react-stripe-checkout';
declare type OnToken = (token: Token) => void;
export default function ({ testMode, workshopKey, onToken, email }: {
    testMode: boolean;
    workshopKey: string;
    onToken: OnToken;
    email: string;
}): JSX.Element;
export {};
