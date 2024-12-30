export const formatMessageDateLong = (date: string) => {
    const now = new Date();
    const inputDate = new Date(date);

    if (isToday(inputDate)) {
        return inputDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else if (isYesterday(inputDate)) {
        return (
            "Yesterday" +
            inputDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], {
            day: "2-digit",
            month: "short",
        });
    } else {
        return inputDate.toLocaleDateString();
    }
};

export const formatMessageDateShort = (date: string) => {
    const now = new Date();
    const inputDate = new Date(date);
    if (isToday(inputDate)) {
        return inputDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else if (isYesterday(inputDate)) {
        return "Yesterday";
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], {
            day: "2-digit",
            month: "short",
        });
    } else {
        return inputDate.toLocaleDateString();
    }
};

export const isToday = (someDate: Date) => {
    const today = new Date();
    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    );
};

export const isYesterday = (someDate: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        someDate.getDate() === yesterday.getDate() &&
        someDate.getMonth() === yesterday.getMonth() &&
        someDate.getFullYear() === yesterday.getFullYear()
    );
};

export const isImage = (attachment: any) => {
    let mime = attachment.mime || attachment.type;
    mime = mime.split("/");
    return mime[0].toLowerCase() === "image";
};

export const isVideo = (attachment: any) => {
    let mime = attachment.mime || attachment.type;
    mime = mime.split("/");
    return mime[0].toLowerCase() === "video";
};

export const isAudio = (attachment: any) => {
    let mime = attachment.mime || attachment.type;
    mime = mime.split("/");
    return mime[0].toLowerCase() === "audio";
};

export const isPDF = (attachment: any) => {
    let mime = attachment.mime || attachment.type;
    return mime === "application/pdf";
};

export const isPreviewable = (attachment: any) => {
    return (
        isImage(attachment) ||
        isVideo(attachment) ||
        isAudio(attachment) ||
        isPDF(attachment)
    );
};

export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
