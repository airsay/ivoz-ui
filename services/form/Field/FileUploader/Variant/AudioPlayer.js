import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { useRef, useState, useEffect, useCallback } from 'react';
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}
export default function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio)
            return;
        if (playing) {
            audio.pause();
        }
        else {
            audio.play();
        }
        setPlaying(!playing);
    }, [playing]);
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio)
            return;
        const onTime = () => setCurrentTime(audio.currentTime);
        const onMeta = () => setDuration(audio.duration);
        const onEnded = () => setPlaying(false);
        audio.addEventListener('timeupdate', onTime);
        audio.addEventListener('loadedmetadata', onMeta);
        audio.addEventListener('ended', onEnded);
        return () => {
            audio.removeEventListener('timeupdate', onTime);
            audio.removeEventListener('loadedmetadata', onMeta);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);
    const seek = (_, value) => {
        const audio = audioRef.current;
        if (!audio)
            return;
        const t = value;
        audio.currentTime = t;
        setCurrentTime(t);
    };
    return (_jsxs(Box, Object.assign({ sx: {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'grey.100',
            borderRadius: '24px',
            px: 1,
            py: 0.5,
        } }, { children: [_jsx("audio", { ref: audioRef, src: src, preload: 'metadata' }), _jsx(IconButton, Object.assign({ size: 'small', onClick: toggle }, { children: playing ? (_jsx(PauseRoundedIcon, { fontSize: 'small' })) : (_jsx(PlayArrowRoundedIcon, { fontSize: 'small' })) })), _jsxs(Typography, Object.assign({ variant: 'caption', sx: { whiteSpace: 'nowrap', minWidth: 70 } }, { children: [formatTime(currentTime), " / ", formatTime(duration || 0)] })), _jsx(Slider, { size: 'small', min: 0, max: duration || 1, value: currentTime, onChange: seek, sx: { mx: 1, flex: 1, minWidth: 60 } }), _jsxs(Box, Object.assign({ sx: { position: 'relative', display: 'flex', alignItems: 'center' }, onMouseEnter: () => setShowVolume(true), onMouseLeave: () => setShowVolume(false) }, { children: [_jsx(IconButton, Object.assign({ size: 'small', onClick: () => {
                            const next = !muted;
                            if (audioRef.current) {
                                audioRef.current.muted = next;
                            }
                            setMuted(next);
                        } }, { children: muted || volume === 0 ? (_jsx(VolumeOffRoundedIcon, { fontSize: 'small' })) : (_jsx(VolumeUpRoundedIcon, { fontSize: 'small' })) })), showVolume && (_jsx(Box, Object.assign({ sx: {
                            position: 'absolute',
                            left: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'grey.100',
                            borderRadius: '12px',
                            px: 1,
                            width: 80,
                        } }, { children: _jsx(Slider, { size: 'small', min: 0, max: 1, step: 0.01, value: muted ? 0 : volume, onChange: (_, v) => {
                                const val = v;
                                setVolume(val);
                                setMuted(val === 0);
                                if (audioRef.current) {
                                    audioRef.current.volume = val;
                                    audioRef.current.muted = val === 0;
                                }
                            } }) })))] }))] })));
}
