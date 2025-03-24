declare module '@utils/messageUtil' {
    interface QmsgConfig {
        autoClose?: boolean;
        timeout?: number;
        showClose?: boolean;
        onClose?: Function;
        html?: boolean;
        maxNums?: 5 | number;
        position?: 'center' | 'right' | 'left';
    }
  
    interface QmsgType {
        success(content: string, config?: QmsgConfig): void;
        error(content: string, config?: QmsgConfig): void;
        info(content: string, config?: QmsgConfig): void;
        warning(content: string, config?: QmsgConfig): void;
        loading(content: string, config?: QmsgConfig): void;
        closeAll(): void;
        config(options: QmsgConfig): void;
    }
  
    const Qmsg: QmsgType;
    export default Qmsg;
}