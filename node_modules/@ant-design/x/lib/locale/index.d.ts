import type { Locale as antdLocale } from 'antd/lib/locale';
import * as React from 'react';
export { default as useLocale } from './useLocale';
export declare const ANT_MARK = "internalMark";
export interface xLocale {
    locale: string;
    Conversations?: {
        create: string;
    };
    Actions?: {
        feedbackLike: string;
        feedbackDislike: string;
        audio: string;
        audioRunning: string;
        audioError: string;
        audioLoading: string;
    };
    Sender?: {
        stopLoading: string;
        speechRecording: string;
    };
    Bubble?: {
        editableOk: string;
        editableCancel: string;
    };
    Mermaid?: {
        zoomIn: string;
        zoomOut: string;
        zoomReset: string;
        download: string;
        code: string;
        image: string;
    };
    Folder?: {
        selectFile: string;
        loadError: string;
        noService: string;
        loadFailed: string;
    };
}
export type Locale = xLocale & antdLocale;
export interface LocaleProviderProps {
    locale: Locale;
    children?: React.ReactNode;
}
declare const LocaleProvider: React.FC<LocaleProviderProps>;
export default LocaleProvider;
