// src/components/commons/inputs/CommonDatePicker.tsx
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

/**
 * CommonDatePicker - Reusable date picker with consistent styling
 * Uses native HTML5 date input for simplicity
 * 
 * Note: For more advanced date picking (calendar UI, date ranges, etc.),
 * consider using @mui/x-date-pickers package
 */

interface CommonDatePickerProps extends Omit<TextFieldProps, 'type' | 'variant'> {
  /**
   * Error message to display
   */
  errorMessage?: string;
  
  /**
   * Error state
   */
  error?: boolean;
  
  /**
   * Minimum selectable date (YYYY-MM-DD format)
   */
  minDate?: string;
  
  /**
   * Maximum selectable date (YYYY-MM-DD format)
   */
  maxDate?: string;
}

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  errorMessage,
  error,
  helperText,
  minDate,
  maxDate,
  sx,
  ...otherProps
}) => {
  const hasError = error || !!errorMessage;
  const displayHelperText = errorMessage || helperText;

  return (
    <TextField
      fullWidth
      type="date"
      variant="outlined"
      error={hasError}
      helperText={displayHelperText}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        htmlInput: {
          min: minDate,
          max: maxDate,
        },
      }}
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
          transform: 'translate(14px, -9px) scale(0.75)',
          '&.Mui-focused': {
            color: '#7F56D9',
          },
        },
        ...sx,
      }}
      {...otherProps}
    />
  );
};

export default CommonDatePicker;