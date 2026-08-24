import { type InputRef } from 'antd';
import React from 'react';
import type { InsertPosition, SkillType, SlotConfigType } from '../interface';
export interface SlotTextAreaRef {
    focus: (options?: FocusOptions) => void;
    blur: InputRef['blur'];
    nativeElement: InputRef['nativeElement'];
    insert: (slotConfig: SlotConfigType[], position?: InsertPosition, replaceCharacters?: string, preventScroll?: boolean) => void;
    clear: () => void;
    getValue: () => {
        value: string;
        slotConfig: SlotConfigType[];
        skill?: SkillType;
    };
}
type InputFocusOptions = {
    preventScroll?: boolean;
    cursor?: 'start' | 'end' | 'all';
};
type SlotFocusOptions = {
    preventScroll?: boolean;
    cursor?: 'slot';
    key?: string;
};
type FocusOptions = SlotFocusOptions | InputFocusOptions;
declare const SlotTextArea: React.ForwardRefExoticComponent<React.RefAttributes<SlotTextAreaRef>>;
export default SlotTextArea;
