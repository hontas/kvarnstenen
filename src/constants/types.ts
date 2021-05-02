export interface ScreenProps {
  navigation: {
    goBack: () => void,
    navigate: (path: string) => void,
    setOptions:({title: string}) => void
  },
}