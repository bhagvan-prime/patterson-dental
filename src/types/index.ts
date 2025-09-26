export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ThemeMode {
  mode: 'light' | 'dark';
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ComponentType;
}