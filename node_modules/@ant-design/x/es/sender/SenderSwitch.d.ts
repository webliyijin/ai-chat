import * as React from 'react';
type SemanticType = 'root' | 'content' | 'icon' | 'title';
export interface SenderSwitchProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick' | 'value' | 'defaultValue' | 'onChange'> {
    prefixCls?: string;
    rootClassName?: string;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    value?: boolean;
    defaultValue?: boolean;
    icon?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onChange?: (checked: boolean) => void;
    classNames?: Partial<Record<SemanticType, string>>;
    styles?: Partial<Record<SemanticType, React.CSSProperties>>;
}
type SenderSwitchRef = {
    nativeElement: HTMLDivElement;
};
declare const SenderSwitch: React.ForwardRefExoticComponent<SenderSwitchProps & React.RefAttributes<SenderSwitchRef>>;
export default SenderSwitch;
