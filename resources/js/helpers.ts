export const formatMessageDateLong = (date: string) => {
    const now = new Date();
    const inputDate = new Date(date);

    if(isToday(inputDate)){
        return inputDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }else if(isYesterday(inputDate)){
        return "Yesterday" +
        inputDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], {day: '2-digit', month: 'short'});
    }else {
        return inputDate.toLocaleDateString();
    }
}

export const formatMessageDateShort = (date: string) =>{
    const now = new Date();
    const inputDate = new Date(date);
    if(isToday(inputDate)){
        return inputDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }else if(isYesterday(inputDate)){
        return "Yesterday";
    }else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], {day: '2-digit', month: 'short'});
    }else {
        return inputDate.toLocaleDateString();
    }
}

export const isToday = (someDate: Date) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
}

export const isYesterday = (someDate: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return someDate.getDate() === yesterday.getDate() &&
        someDate.getMonth() === yesterday.getMonth() &&
        someDate.getFullYear() === yesterday.getFullYear()
}