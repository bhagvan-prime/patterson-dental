// src/components/commons/inputs/CommonRadioGroup.tsx
import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  RadioGroupProps,
} from '@mui/material';

/**
 * CommonRadioGroup - Reusable radio button group
 */

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface CommonRadioGroupProps extends Omit<RadioGroupProps, 'onChange'> {
  /**
   * Label for the radio group
   */
  label: string;
  
  /**
   * Array of radio options
   */
  options: RadioOption[];
  
  /**
   * Change handler
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Error message
   */
  errorMessage?: string;
  
  /**
   * Helper text
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
  
  /**
   * Direction: 'row' (horizontal) or 'column' (vertical)
   * @default 'column'
   */
  direction?: 'row' | 'column';
}

const CommonRadioGroup: React.FC<CommonRadioGroupProps> = ({
  label,
  options,
  onChange,
  errorMessage,
  helperText,
  error,
  required = false,
  direction = 'column',
  sx,
  ...otherProps
}) => {
  const hasError = error || !!errorMessage;
  const displayHelperText = errorMessage || helperText;

  return (
    <FormControl 
      component="fieldset" 
      error={hasError}
      required={required}
      sx={{
        width: '100%',
        ...sx,
      }}
    >
      <FormLabel
        component="legend"
        sx={{
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          color: hasError ? '#d32f2f' : '#666666',
          mb: 1,
          '&.Mui-focused': {
            color: hasError ? '#d32f2f' : '#1976d2',
          },
        }}
      >
        {label}
      </FormLabel>
      
      <RadioGroup
        onChange={onChange}
        row={direction === 'row'}
        sx={{
          gap: direction === 'row' ? 2 : 1,
        }}
        {...otherProps}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            control={
              <Radio
                sx={{
                  color: '#666666',
                  '&.Mui-checked': {
                    color: '#1976d2',
                  },
                  '&.Mui-disabled': {
                    color: '#E5E7EB',
                  },
                }}
              />
            }
            label={option.label}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Inter, Arial, sans-serif',
                fontSize: '14px',
                color: '#666666',
              },
            }}
          />
        ))}
      </RadioGroup>
      
      {displayHelperText && (
        <FormHelperText>{displayHelperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CommonRadioGroup;