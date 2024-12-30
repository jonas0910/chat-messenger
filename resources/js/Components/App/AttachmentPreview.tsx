import React from "react";
import { PaperClipIcon } from "@heroicons/react/16/solid";
import { formatBytes, isPDF, isPreviewable } from "@/helpers";

const AttachmentPreview = (file: { file: File; url: string }) => {
    return (
        <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-800">
            <div>
                {isPDF(file.file) && <img src="/img/pdf.png" className="w-8" />}
                {!isPreviewable(file.file) && (
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-md">
                        <PaperClipIcon className="w-8 h-8 text-white" />
                    </div>
                )}
            </div>
            <div>
                <h3>{file.file.name}</h3>
                <p>{formatBytes(file.file.size)}</p>
            </div>
        </div>
    );
};

export default AttachmentPreview;
