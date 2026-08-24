import { type ButtonProps } from 'antd';
import React from 'react';
export interface ActionButtonContextProps {
    prefixCls: string;
    onSend?: VoidFunction;
    onSendDisabled?: boolean;
    onClear?: VoidFunction;
    onClearDisabled?: boolean;
    onCancel?: VoidFunction;
    onCancelDisabled?: boolean;
    onSpeech?: VoidFunction;
    onSpeechDisabled?: boolean;
    speechRecording?: boolean;
    disabled?: boolean;
    setSubmitDisabled?: (disabled: boolean) => void;
}
export declare const ActionButtonContext: React.Context<ActionButtonContextProps>;
export interface ActionButtonProps extends ButtonProps {
    action: 'onSend' | 'onClear' | 'onCancel' | 'onSpeech';
}
export declare const ActionButton: React.ForwardRefExoticComponent<ActionButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default ActionButton;
