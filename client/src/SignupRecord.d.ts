/// <reference types="react" />
export declare type Snack = 'PaymentAccepted' | 'PaymentDeclined';
export default function ({ id, testMode, isNewSignup }: {
    id: string;
    testMode: boolean;
    isNewSignup: boolean;
}): JSX.Element;
