/**
 * Safari 兼容的倒序滚动视窗锁定与 scrollTo 方法适配
 * @param {HTMLElement} scrollDom - 倒序滚动元素
 * @param {HTMLElement} contentDom - 滚动内容容器元素
 */
export declare function useCompatibleScroll(scrollDom?: HTMLElement | null, contentDom?: HTMLElement | null): {
    reset: () => void;
    scrollTo: (option?: ScrollToOptions & {
        intoView?: ScrollIntoViewOptions;
        intoViewDom?: HTMLElement;
    }) => void;
};
