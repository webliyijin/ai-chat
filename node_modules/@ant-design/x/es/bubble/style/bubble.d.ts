import type { FullToken, GenerateStyle } from '../../theme/interface';
export interface BubbleToken extends FullToken<'Bubble'> {
}
declare const genBubbleStyle: GenerateStyle<BubbleToken>;
export default genBubbleStyle;
