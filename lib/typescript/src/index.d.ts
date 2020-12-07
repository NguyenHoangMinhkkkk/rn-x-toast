declare type DurationType = 'LONG' | 'DEFAULT' | 'SHORT';
declare const _default: {
    showToastTop: (message: string, duration?: DurationType) => void;
    showToastCenter: (message: string, duration?: DurationType) => void;
    showToastBottom: (message: string, duration?: DurationType) => void;
};
export default _default;
