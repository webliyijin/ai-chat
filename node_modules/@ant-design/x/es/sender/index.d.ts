import type { ActionsComponents, SenderComponents, SenderProps, SenderRef, SlotConfigType } from './interface';
import ForwardSender from './Sender';
import SenderHeader from './SenderHeader';
import SenderSwitch from './SenderSwitch';
export type { ActionsComponents, SenderComponents, SenderProps, SenderRef, SlotConfigType };
type CompoundedSender = typeof ForwardSender & {
    Header: typeof SenderHeader;
    Switch: typeof SenderSwitch;
};
declare const Sender: CompoundedSender;
export default Sender;
