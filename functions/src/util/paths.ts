import {Int} from './ints';
import {trimLeadingTrailing} from './strings';
import {ensure} from './ass';

const slash: string = '/';

export type SPath = string;

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
  readonly fileNameSplit: { name: string; ext: string };
  readonly name: string;
  readonly ext: string;

  readonly isRoot: boolean;

  valueOf(): string;

  toString(): string;

}

export class CPath implements Path {

  readonly dPath: DPath;

  private constructor(p: DPath) {
    this.dPath = Object.freeze({...p});
  }

  get leadingSlash(): boolean {
    return this.dPath.leadingSlash;
  };

  get trailingSlash(): boolean {
    return this.dPath.trailingSlash;
  };

  get segs(): ReadonlyArray<string> {
    return this.dPath.segs;
  };

  get lastIndex(): Int {
    return this.segs.length - 1;
  }

  get segCount(): Int {
    return this.segs.length;
  }

  get noSegs(): boolean {
    return this.segCount === 0;
  }

  get isRoot(): boolean {
    return this.noSegs;
  }

  get firstOrUnd(): string | undefined {
    return this.seg(0);
  }

  get lastOrUnd(): string | undefined {
    return this.seg(this.lastIndex);
  }

  get first(): string {
    return ensure(this.firstOrUnd);
  }

  get last(): string {
    return ensure(this.lastOrUnd);
  }

  /**
   * pathName with leading and trailing slashes (if there were any) removed
   */
  get pathNameTrimmed(): string {
    return this.noSegs ? '' : this.segs.join(slash);
  }

  /**
   * slash or empty string
   */
  get leadingSlashStr(): string {
    return this.leadingSlash ? slash : '';
  }

  /**
   * slash or empty string
   */
  get trailingSlashStr(): string {
    return this.trailingSlash ? slash : '';
  }

  /**
   * string representation of this path
   */
  get pathName(): string {
    return this.leadingSlashStr + this.pathNameTrimmed + this.trailingSlashStr;
  }

  valueOf(): string {
    return this.pathName;
  }

  toString(): string {
    return this.pathName;
  }

  segOrUnd = (index: Int): string | undefined => {
    if (index > this.lastIndex) {
      return undefined;
    } else {
      return this.segs[index];
    }
  };

  seg = (index: Int): string => {
    return ensure(this.segOrUnd(index));
  };

  /**
   * last or ''
   */
  get fileName(): string {
    if (!this.last) {
      return '';
    } else {
      return this.last;
    }
  }

  get fileNameSplit(): { readonly name: string, readonly ext: string } {
    return CPath.splitExt(this.fileName);
  }

  /**
   * fileName minus ext
   */
  get name(): string {
    return this.fileNameSplit.name;
  }

  /**
   * file ext or ''
   */
  get ext(): string {
    return this.fileNameSplit.ext;
  }


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
  static mkDPath(pathString: SPath): DPath {
    const L = pathString.length;
    if (L === 0) return {segs: [], leadingSlash: false, trailingSlash: false};
    const iLast = L - 1;
    const leadingSlash: boolean = pathString.charAt(0) === slash;
    const trailingSlash: boolean = pathString.charAt(iLast) === slash;
    const trimmed: string = trimLeadingTrailing(pathString, slash);
    const segs = Object.freeze(trimmed.indexOf(slash) === -1 ? [trimmed] : trimmed.split(slash));
    return Object.freeze({segs, leadingSlash, trailingSlash});
  }

  static mk(p: SPath | DPath): CPath {
    const d = typeof p === 'string' ? this.mkDPath(p) : p;
    return new CPath(d);
  }

  static splitExt(last: string): { readonly name: string, readonly ext: string } {
    const i = last.lastIndexOf('.');
    if (i === -1) {
      return {name: last, ext: ''};
    } else {
      const name = last.substring(0, i);
      const ext = last.substring(i + 1);
      return {name, ext};
    }
  }


}