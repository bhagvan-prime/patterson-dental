// src/components/commons/buttons/CommonButton.tsx
import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type ButtonVariant = 'primary' | 'secondary' | 'text';

interface CommonButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  sx,
  ...otherProps
}) => {
  const muiVariant = variant === 'primary' ? 'contained' : 
                     variant === 'secondary' ? 'outlined' : 
                     'text';

  const isDisabled = loading || disabled;

  return (
    <Button
      variant={muiVariant}
      disabled={isDisabled}
      fullWidth={fullWidth}
      sx={{
        height: '44px',
        borderRadius: '8px',
        textTransform: 'none',
        fontFamily: 'Inter, Arial, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        boxShadow: '0px 1px 2px rgba(10,13,18,0.05)',
        
        ...(variant === 'primary' && {
          backgroundColor: '#1976d2',
          border: '1px solid #1976d2',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
          '&.Mui-disabled': {
            backgroundColor: '#E5E7EB',
            color: '#9CA3AF',
            border: '1px solid #E5E7EB',
          },
        }),
        
        ...(variant === 'secondary' && {
          color: '#666666',
          border: '1px solid #D5D7DA',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#F9FAFB',
            border: '1px solid #9CA3AF',
          },
          '&.Mui-disabled': {
            color: '#9CA3AF',
            border: '1px solid #E5E7EB',
          },
        }),
        
        ...(variant === 'text' && {
          color: '#1976d2',
          '&:hover': {
            backgroundColor: '#F9F5FF',
          },
          '&.Mui-disabled': {
            color: '#9CA3AF',
          },
        }),
        
        ...sx,
      }}
      {...otherProps}
    >
      {loading ? (
        <CircularProgress 
          size={20} 
          sx={{ 
            color: variant === 'primary' ? '#FFFFFF' : '#1976d2' 
          }} 
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default CommonButton;