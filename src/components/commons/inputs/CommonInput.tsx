// src/components/commons/inputs/CommonInput.tsx
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

/**
 * CommonInput - A reusable input component with consistent styling
 * 
 * Uses MUI's new slotProps pattern instead of deprecated InputProps
 */

interface CommonInputProps extends Omit<TextFieldProps, 'variant'> {
  /**
   * Custom error message to display
   */
  errorMessage?: string;
  
  /**
   * Whether to show error state
   */
  error?: boolean;
}

const CommonInput: React.FC<CommonInputProps> = ({
  errorMessage,
  error,
  helperText,
  sx,
  ...otherProps
}) => {
  const hasError = error || !!errorMessage;
  const displayHelperText = errorMessage || helperText;

  return (
    <TextField
      fullWidth
      variant="outlined"
      error={hasError}
      helperText={displayHelperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          height: '44px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 1px 2px 0px rgba(10,13,18,0.05)',
          '& input': {
            padding: '0 14px',
            height: '44px',
            boxSizing: 'border-box',
          },
          '& fieldset': {
            borderRadius: '8px',
          },
        },
        '& .MuiInputLabel-root': {
          transform: 'translate(14px, 12px) scale(1)',
          '&.Mui-focused, &.MuiFormLabel-filled': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        },
        ...sx,
      }}
      {...otherProps}
    />
  );
};

export default CommonInput;