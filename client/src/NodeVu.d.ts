/// <reference types="react" />
import { ONode } from './types';
declare type M = Map<number, ONode>;
export default function NodeVu({ depth, id, map, type, maxDepth }: {
    depth: number;
    id: number;
    map: M;
    type: string;
    maxDepth: number;
}): JSX.Element | null;
export {};
