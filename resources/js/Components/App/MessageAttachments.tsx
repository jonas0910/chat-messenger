import {
    PaperClipIcon,
    ArrowDownTrayIcon,
    PlayCircleIcon
} from "@heroicons/react/16/solid";
import {isAudio, isImage, isPDF, isPreviewable, isVideo} from "@/helpers";
import { Attachment, PreviewAttachment } from "@/types/attachment";

interface MessageAttachmentsProps {
    attachments: Attachment[];
    attachmentClick: (attachment: Attachment, index: number) => void;
}


const MessageAttachments = ( {attachments, attachmentClick} : MessageAttachmentsProps) =>{
    return (
        <>
            {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                        <div
                            key={index}
                            className="w-40 h-40 flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-slate-800 cursor-pointer"
                            onClick={() => attachmentClick(file, index)}
                        >
                            <div>
                                {isImage(file) && (
                                    <img src={file.url} className="w-24 h-24 object-cover" />
                                )}
                                {isPDF(file) && (
                                    <img src="/img/pdf.png" className="w-24 h-24 object-cover" />
                                )}
                                {isAudio(file) && (
                                    <div className="w-24 h-24 flex items-center justify-center bg-slate-700 rounded-md">
                                        <PlayCircleIcon className="w-12 h-12 text-white" />
                                    </div>
                                )}
                                {isVideo(file) && (
                                    <div className="w-24 h-24 flex items-center justify-center bg-slate-700 rounded-md">
                                        <PlayCircleIcon className="w-12 h-12 text-white" />
                                    </div>
                                )}
                                {!isPreviewable(file) && (
                                    <div className="w-24 h-24 flex items-center justify-center bg-slate-700 rounded-md">
                                        <PaperClipIcon className="w-12 h-12 text-white" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3>{file.name}</h3>
                            </div>
                        </div>
                    ))}    
                </div>
            )}
        </>
    )
}

export default MessageAttachments;