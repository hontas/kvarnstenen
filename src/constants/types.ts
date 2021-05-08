import { StackNavigationOptions } from '@react-navigation/stack';
export interface ScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (path: string, parameters?: { from: string } | { startAt: string }) => void;
    setOptions: (parameters: StackNavigationOptions) => void;
    setParams: (parameters: Record<string, string | number>) => void;
    reset: (state: { index: number; routes: Record<string, JSX.Element>[] }) => void;
  };
  route: {
    key: string;
    name: string;
    params?: {
      from?: string;
      startAt?: string;
    };
  };
}
