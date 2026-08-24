import type { InputRef } from 'antd';
import React from 'react';
import type { InsertPosition, SkillType } from '../interface';
export interface TextAreaRef {
    nativeElement: InputRef['nativeElement'];
    focus: InputRef['focus'];
    blur: InputRef['blur'];
    insert: (value: string, position?: InsertPosition) => void;
    clear: () => void;
    getValue: () => {
        value: string;
        slotConfig: any[];
        skill?: SkillType;
    };
}
declare const TextArea: React.ForwardRefExoticComponent<React.RefAttributes<TextAreaRef>>;
export default TextArea;
