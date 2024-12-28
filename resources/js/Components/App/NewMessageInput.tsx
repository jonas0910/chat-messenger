import { useEffect, useRef } from "react";

interface NewMessageInputProps {
    value: string;
    onChange: (e: any) => void;
    onSend?: () => void;
}

const NewMessageInput = ({ value, onChange, onSend }: NewMessageInputProps) => {
    const input = useRef<HTMLTextAreaElement>(null);
    const onInputKeyDown = (e: {
        key: string;
        shiftKey: any;
        preventDefault: () => void;
    }) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend && onSend();
        }
    };

    const onChangeEvent = (e: { target: { value: any } }) => {
        setTimeout(() => {
            adjustHeight();
        }, 10);
        onChange(e);
    };

    const adjustHeight = () => {
        setTimeout(() => {
            if (input.current) {
                input.current.style.height = "auto";
                input.current.style.height =
                    input.current.scrollHeight + 1 + "px";
            }
        }, 100);
    };

    useEffect(() => {
        adjustHeight();
    }, []);

    return (
        <textarea
            ref={input}
            value={value}
            rows={1}
            placeholder="Type a message"
            onKeyDown={onInputKeyDown}
            onChange={onChangeEvent}
            // className="input input-bordered w-full rounded-r-none resize-none overflow-y-auto max-h-20"
            className="w-full resize-none overflow-hidden bg-white text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onInput={(e) => {
                // Ajustar dinámicamente el alto del textarea
                (e.target as HTMLTextAreaElement).style.height = "auto";
                (e.target as HTMLTextAreaElement).style.height = `${
                    (e.target as HTMLTextAreaElement).scrollHeight
                }px`;
            }}
        ></textarea>
    );
};

export default NewMessageInput;
