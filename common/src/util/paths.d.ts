import { Int } from './ints';
export declare type SPath = string;
export interface DPath {
    /**
     * segments: 0 to n
     */
    readonly segs: ReadonlyArray<string>;
    /**
     * true is pathname has a leadingSlash
     */
    readonly leadingSlash: boolean;
    /**
     * true is pathname has a trailingSlash
     */
    readonly trailingSlash: boolean;
}
export interface Path extends DPath {
    readonly dPath: DPath;
    readonly lastIndex: number;
    readonly segCount: number;
    readonly noSegs: boolean;
    readonly firstOrUnd: string | undefined;
    readonly lastOrUnd: string | undefined;
    readonly first: string;
    readonly last: string;
    readonly pathNameTrimmed: string;
    readonly leadingSlashStr: string;
    readonly trailingSlashStr: string;
    readonly pathName: string;
    seg: (index: Int) => string;
    segOrUnd: (index: Int) => (string | undefined);
    readonly fileName: string;
    readonly fileNameSplit: {
        name: string;
        ext: string;
    };
    readonly name: string;
    readonly ext: string;
    readonly isRoot: boolean;
    valueOf(): string;
    toString(): string;
}
export declare class CPath implements Path {
    readonly dPath: DPath;
    private constructor();
    readonly leadingSlash: boolean;
    readonly trailingSlash: boolean;
    readonly segs: ReadonlyArray<string>;
    readonly lastIndex: Int;
    readonly segCount: Int;
    readonly noSegs: boolean;
    readonly isRoot: boolean;
    readonly firstOrUnd: string | undefined;
    readonly lastOrUnd: string | undefined;
    readonly first: string;
    readonly last: string;
    /**
     * pathName with leading and trailing slashes (if there were any) removed
     */
    readonly pathNameTrimmed: string;
    /**
     * slash or empty string
     */
    readonly leadingSlashStr: string;
    /**
     * slash or empty string
     */
    readonly trailingSlashStr: string;
    /**
     * string representation of this path
     */
    readonly pathName: string;
    valueOf(): string;
    toString(): string;
    segOrUnd: (index: number) => string | undefined;
    seg: (index: number) => string;
    /**
     * last or ''
     */
    readonly fileName: string;
    readonly fileNameSplit: {
        readonly name: string;
        readonly ext: string;
    };
    /**
     * fileName minus ext
     */
    readonly name: string;
    /**
     * file ext or ''
     */
    readonly ext: string;
    /**
     *
     * @param pathString the path you get from Location.pathname
     *
     *
     * examples of pathStrings:
     *  pathString      segments        leadingSlash    trailingSlash   name
     *  '':             ''              false           false           ''
     *  '/'             ''              true            true            ''
     *  'seg0'          [seg0]          false           false           ''
     *  '/seg0'         [seg0]          true            false
     *  'seg0/'         [seg0]          false           true
     *  '/seg0/'        [seg0]          true            true
     *
     *  'seg0/seg1'     [seg0,seg1]     false           false
     *  '/seg0/seg1'    [seg0,seg1]     true            false
     *  'seg0/seg1/'    [seg0,seg1]     false           true
     *  '/seg0/seg1/'   [seg0,seg1]     true            true
     */
    static mkDPath(pathString: SPath): DPath;
    static mk(p: SPath | DPath): CPath;
    static splitExt(last: string): {
        readonly name: string;
        readonly ext: string;
    };
}
