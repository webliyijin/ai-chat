import { type CSSInterpolation, Keyframes } from '@ant-design/cssinjs';
import type { TokenWithCommonCls } from '@ant-design/cssinjs-utils';
import type { AliasToken } from '../../theme/interface';
export declare const fadeInLeft: Keyframes;
export declare const fadeIn: Keyframes;
export declare const fadeOut: Keyframes;
export declare const initFadeLeftMotion: (token: TokenWithCommonCls<AliasToken>, sameLevel?: boolean) => CSSInterpolation;
export declare const initFadeMotion: (token: TokenWithCommonCls<AliasToken>, sameLevel?: boolean) => CSSInterpolation;
