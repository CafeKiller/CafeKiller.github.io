import QMessage from "@assets/lib/message.min"
import { iLog } from "./iLogUtil"

type QMessageConfigType = {
    showClose?: boolean;
    autoClose?: boolean;
    content?: string;
    timeout?: number;
    onClose?: (msg: string) => void;
    html?: boolean;
    maxNums?: number;
}

type QMessageType = {
    info(msg: string, config?: QMessageConfigType): void;
    warning(msg: string, config?: QMessageConfigType): void;
    error(msg: string, config?: QMessageConfigType): void;
    success(msg: string, config?: QMessageConfigType): void;
    loading(msg: string, config?: QMessageConfigType): void;
    config(config?: QMessageConfigType): QMessageType;
}

export const QDialog = QMessage as unknown as QMessageType
