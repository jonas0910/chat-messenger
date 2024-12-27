import {Fragment , useEffect, useMemo, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    PaperClipIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/16/solid";
import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helpers";
import { Attachment } from "@/types/attachment";


interface AttachmentPreviewModalProps {
    attachments: Attachment;
    index: number | null;
    show: boolean;
    onClose: () => void;
}

const AttachmentPreviewModal = ({
    attachments,
    index,
    show,
    onClose = () => {}
} : AttachmentPreviewModalProps) => {
    return (
        <div>
            hola este es el modal?
        </div>
    );
}

export default AttachmentPreviewModal;