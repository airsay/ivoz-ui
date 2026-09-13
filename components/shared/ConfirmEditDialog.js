import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import _ from '../../services/translations/translate';
import Modal from './Modal/Modal';
export const ConfirmEditionDialog = (props) => {
    const { open, handleClose, text, handleSave, formEvent } = props;
    const TOTAL_TIME = 100;
    const [progress, setProgress] = useState(TOTAL_TIME);
    useEffect(() => {
        let timer = null;
        if (open) {
            timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 0) {
                        return 0;
                    }
                    return oldProgress - 5;
                });
            }, 250);
        }
        setProgress(TOTAL_TIME);
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [open]);
    const customButtons = [
        {
            label: _('Cancel'),
            onClick: () => handleClose(),
            variant: 'outlined',
            autoFocus: false,
        },
        ...(progress === 0
            ? [
                {
                    label: _('Apply'),
                    onClick: () => {
                        if (formEvent) {
                            handleSave(formEvent);
                        }
                    },
                    variant: 'solid',
                    autoFocus: true,
                },
            ]
            : []),
    ];
    return (_jsx(Modal, Object.assign({ title: _('Save element'), description: text, open: open, onClose: handleClose, buttons: customButtons, keepMounted: true }, { children: _jsx(Box, Object.assign({ sx: { width: '100%', mt: 2 } }, { children: _jsx(LinearProgress, { variant: 'determinate', value: progress }) })) })));
};
