import type { XComponentConfig, XComponentsConfig } from '../../x-provider/context';
type MergeXComponentsConfig = XComponentsConfig;
declare const useXComponentConfig: <C extends keyof XComponentsConfig>(component: C) => Required<MergeXComponentsConfig>[C] & XComponentConfig;
export default useXComponentConfig;
