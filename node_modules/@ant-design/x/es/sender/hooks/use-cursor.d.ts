/// <reference types="react" />
import type { InsertPosition, SlotConfigBaseType } from '../interface';
interface CursorPosition {
    element: Node;
    position: number;
}
interface UseCursorOptions {
    prefixCls: string;
    getSlotDom: (key: string) => HTMLSpanElement | undefined;
    slotConfigMap: Map<string, any>;
    getNodeInfo: (element: HTMLElement) => {
        slotKey?: string;
        skillKey?: string;
        slotConfig?: any;
        nodeType?: string;
    } | null;
    getEditorValue: () => {
        value: string;
        slotConfig: any[];
        skill?: any;
    };
}
interface UseCursorReturn {
    setEndCursor: (targetNode: HTMLDivElement | null, preventScroll?: boolean) => void;
    setStartCursor: (targetNode: HTMLDivElement | null, preventScroll?: boolean) => void;
    setAllSelectCursor: (targetNode: HTMLDivElement | null, skillDom: HTMLSpanElement | null, preventScroll?: boolean) => void;
    setCursorPosition: (targetNode: HTMLDivElement | null, editableNode: HTMLDivElement | null, position: number, preventScroll?: boolean) => {
        range: Range | null;
        selection: Selection | null;
    };
    setAfterNodeFocus: (targetNode: HTMLDivElement, editableNode: HTMLDivElement, range: Range | null, selection: Selection | null, preventScroll?: boolean) => void;
    setSlotFocus: (editableRef: React.RefObject<HTMLDivElement | null>, key?: string, preventScroll?: boolean) => void;
    getSelection: () => Selection | null;
    getRange: () => {
        range: Range | null;
        selection: Selection | null;
    };
    getTextBeforeCursor: (targetNode: HTMLDivElement | null) => {
        value: string;
        startContainer: Node | null;
        startOffset: number;
    };
    removeAllRanges: () => void;
    getInsertPosition: (position?: InsertPosition, editableRef?: React.RefObject<HTMLDivElement | null>, lastSelectionRef?: React.RefObject<Range | null>) => {
        type: 'box' | 'slot' | 'end' | 'start';
        slotType?: SlotConfigBaseType['type'];
        range?: Range;
        slotKey?: string;
        selection: Selection | null;
    };
    getEndRange: (editableDom: HTMLDivElement) => Range;
    getStartRange: (editableDom: HTMLDivElement) => Range;
    copySelectionString: () => Promise<boolean>;
    getCleanedText: (ori: string) => string;
}
declare const useCursor: (options?: UseCursorOptions) => UseCursorReturn;
export default useCursor;
export type { CursorPosition, UseCursorReturn, UseCursorOptions };
