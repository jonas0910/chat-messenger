import { Fragment, useEffect, useMemo, useState } from "react";
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
    attachments: Attachment[];
    index: number | null;
    show: boolean;
    onClose: () => void;
}

const AttachmentPreviewModal = ({
    attachments,
    index,
    show,
    onClose = () => {},
}: AttachmentPreviewModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const attachment = useMemo(
        () => attachments[currentIndex],
        [attachments, currentIndex]
    );

    const previewableAttachments = useMemo(
        () => attachments.filter(isPreviewable),
        [attachments]
    );
    const close = () => {
        onClose();
    };
    const prev = () => {
        if (currentIndex === 0) {
            return;
        }
        setCurrentIndex(currentIndex - 1);
    };
    const next = () => {
        if (currentIndex === previewableAttachments.length - 1) {
            return;
        }
        setCurrentIndex(currentIndex + 1);
    };

    useEffect(() => {
        setCurrentIndex(index || 0);
    }, [index]);

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="relative z-50"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="h-screen w-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="flex flex-col w-full h-full transform overflow-hidden bg-salte-800 text-left align-middle shadow-xl">
                                <button
                                    onClick={close}
                                    className="absolute right-3 top-3 w-10 h-10 rounded-full hover:bg-black/10 trnasition flex items-center justify-center z-40"
                                >
                                    <XMarkIcon className="w-6 h-6 text-white" />
                                </button>
                                <div className="relative group h-full">
                                    {currentIndex > 0 && (
                                        <div
                                            onClick={prev}
                                            className="absolute top-1/2 left-3 transform -translate-y-1/2 z-40"
                                        >
                                            <ChevronLeftIcon className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                    {currentIndex < previewableAttachments.length - 1 && (
                                        <div
                                            onClick={next}
                                            className="absolute top-1/2 right-3 transform -translate-y-1/2 z-40"
                                        >
                                            <ChevronRightIcon className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                    {attachment && (
                                        <div className="flex items-center justify-center h-full">
                                            {isImage(attachment) && (
                                                <img
                                                    src={attachment.url}
                                                    alt={attachment.name}
                                                    className="object-contain max-h-full max-w-full"
                                                />
                                            )}
                                            {isAudio(attachment) && (
                                                <audio
                                                    src={attachment.url}
                                                    controls
                                                    className="w-full"
                                                />
                                            )}
                                            {isVideo(attachment) && (
                                                <video
                                                    src={attachment.url}
                                                    controls
                                                    className="w-full"
                                                />
                                            )}
                                            {isPDF(attachment) && (
                                                <iframe
                                                    src={attachment.url}
                                                    className="w-full h-full"
                                                />
                                            )}
                                            {!isPreviewable(attachment) && (
                                                <div className="flex items-center justify-center w-full h-full text-white">
                                                    <PaperClipIcon className="w-16 h-16" />
                                                    <div>{attachment.name}</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AttachmentPreviewModal;
