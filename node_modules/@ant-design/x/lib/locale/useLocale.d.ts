import type { LocaleComponentName as AntdLocaleContextProps } from 'antd/lib/locale/useLocale';
import type { Locale, xLocale } from '.';
type LocaleComponentName = Exclude<keyof xLocale, 'locale'>;
type mergeLocaleComponentName = LocaleComponentName | AntdLocaleContextProps;
declare const useLocale: <C extends mergeLocaleComponentName = LocaleComponentName>(componentName: C, defaultLocale?: Locale[C] | (() => Locale[C])) => readonly [NonNullable<Locale[C]>, string];
export default useLocale;
