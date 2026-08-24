import ForwardSender from "./Sender";
import SenderHeader from "./SenderHeader";
import SenderSwitch from "./SenderSwitch";
const Sender = ForwardSender;
Sender.Header = SenderHeader;
Sender.Switch = SenderSwitch;
export default Sender;