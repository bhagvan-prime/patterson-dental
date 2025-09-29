// src/components/commons/inputs/CommonSelect.tsx
import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  FormHelperText,
  SelectProps 
} from '@mui/material';

/**
 * CommonSelect - Reusable select/dropdown with consistent styling
 */

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface CommonSelectProps extends Omit<SelectProps, 'variant'> {
  /**
   * Label for the select
   */
  label: string;
  
  /**
   * Array of options
   */
  options: SelectOption[];
  
  /**
   * Error message to display
   */
  errorMessage?: string;
  
  /**
   * Helper text (shown when no error)
   */
  helperText?: string;
  
  /**
   * Error state
   */
  error?: boolean;
  
  /**
   * Required field
   */
  required?: boolean;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  label,
  options,
  errorMessage,
  helperText,
  error,
  required = false,
  sx,
  ...otherProps
}) => {
  const hasError = error || !!errorMessage;
  const displayHelperText = errorMessage || helperText;
  
  // Generate unique ID for label-select connection
  const labelId = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <FormControl 
      fullWidth 
      error={hasError}
      required={required}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          height: '44px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 1px 2px 0px rgba(10,13,18,0.05)',
        },
        '& .MuiInputLabel-root': {
          transform: 'translate(14px, 12px) scale(1)',
          '&.Mui-focused, &.MuiFormLabel-filled, &.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        },
        ...sx,
      }}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        variant="outlined"
        sx={{
          '& .MuiSelect-select': {
            padding: '0 14px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
          },
        }}
        {...otherProps}
      >
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {displayHelperText && (
        <FormHelperText>{displayHelperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CommonSelect;