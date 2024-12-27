import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import React, { useRef, useState } from "react";

interface CustomAudioPlayerProps {
    file: { url: string };
    showVolume?: boolean;
}

const CustomAudioPlayer = ({
    file,
    showVolume = true,
}: CustomAudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio?.pause();
        } else {
            audio?.play();
            setDuration(audio?.duration || 0);
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
        setVolume(value);
    };

    const handleTimeUpdate = (e: React.ChangeEvent<HTMLAudioElement>) => {
        const audio = audioRef.current;
        setDuration(audio?.duration || 0);
        setCurrentTime(e.target.currentTime);
    };

    const handleLoadedMetaData = (e: React.ChangeEvent<HTMLAudioElement>) => {
        const time = e.target.currentTime;
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
        setCurrentTime(time);
    };

    return (
        <div className="flex items-center gap-2">
            <audio
                ref={audioRef}
                src={file.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetaData}
            />
            <div className="flex items-center gap-2">
                <button onClick={togglePlayPause}>
                    {isPlaying ? (
                        <PauseCircleIcon className="w-8 h-8 text-white" />
                    ) : (
                        <PlayCircleIcon className="w-8 h-8 text-white" />
                    )}
                </button>
                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={(e) => {
                            if (audioRef.current) {
                                audioRef.current.currentTime = parseFloat(
                                    e.target.value
                                );
                            }
                            setCurrentTime(parseFloat(e.target.value));
                        }}
                    />
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{ display: showVolume ? "block" : "none" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomAudioPlayer;
