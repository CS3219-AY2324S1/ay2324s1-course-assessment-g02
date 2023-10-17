export type ChatMessageType = {
    message: string;
    sender: string;
    createdAt: Date;
};

export enum ChatDirections {
    left,
    right
}

export type ChatMessageProps = {
    direction: ChatDirections;
    message: string;
    sender?: string;
    createdAt?: Date;
}