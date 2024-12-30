export interface Attachment {
    id: number;
    name: string;
    url: string;
    mime: string;
    size: number;
}

export interface PreviewAttachment{
    attachments: Attachment | null;
    index: number | null;
}