/// <reference types="react" />
import type { SlotConfigBaseType, SlotConfigType } from '../interface';
interface UseSlotBuilderOptions {
    prefixCls: string;
    placeholder?: string;
    slotDomMap: React.RefObject<Map<string, HTMLSpanElement>>;
    slotConfigMap: Map<string, SlotConfigBaseType>;
}
interface UseSlotBuilderReturn {
    buildSkillSpan: (key: string) => HTMLSpanElement;
    buildEditSlotSpan: (config: SlotConfigType) => HTMLSpanElement;
    buildSlotSpan: (key: string) => HTMLSpanElement;
    buildSpaceSpan: (slotKey: string, positions: 'before' | 'after') => HTMLSpanElement;
    saveSlotDom: (key: string, dom: HTMLSpanElement) => void;
    getSlotDom: (key: string) => HTMLSpanElement | undefined;
    getSlotLastDom: (slotKey: string, slotType?: SlotConfigBaseType['type']) => HTMLSpanElement | undefined;
}
declare const useSlotBuilder: (options: UseSlotBuilderOptions) => UseSlotBuilderReturn;
export default useSlotBuilder;
export type { UseSlotBuilderOptions, UseSlotBuilderReturn };
