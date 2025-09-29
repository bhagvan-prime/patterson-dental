// src/components/commons/inputs/CommonCheckbox.tsx
import React from 'react';
import { 
  FormControlLabel, 
  Checkbox, 
  CheckboxProps,
  FormControlLabelProps 
} from '@mui/material';

/**
 * CommonCheckbox - Reusable checkbox with consistent styling
 * Matches your app's design system (purple theme)
 */

interface CommonCheckboxProps {
  /**
   * The label text displayed next to checkbox
   */
  label: React.ReactNode;
  
  /**
   * Checked state
   */
  checked: boolean;
  
  /**
   * Change handler
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Checkbox props (color, size, etc.)
   */
  checkboxProps?: Omit<CheckboxProps, 'checked' | 'onChange'>;
  
  /**
   * FormControlLabel props for advanced customization
   */
  labelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
}

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  label,
  checked,
  onChange,
  checkboxProps,
  labelProps,
  disabled = false,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          sx={{
            color: '#666666',
            '&.Mui-checked': {
              color: '#1976d2', // Your purple theme color
            },
            '&.Mui-disabled': {
              color: '#E5E7EB',
            },
            ...checkboxProps?.sx,
          }}
          {...checkboxProps}
        />
      }
      label={label}
      disabled={disabled}
      sx={{
        alignItems: 'flex-start',
        ...labelProps?.sx,
      }}
      {...labelProps}
    />
  );
};

export default CommonCheckbox;