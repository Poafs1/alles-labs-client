import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
  return {
    isSm: useMediaQuery({ query: '(min-width: 640px)' }),
    isMd: useMediaQuery({ query: '(min-width: 768px)' }),
    isLg: useMediaQuery({ query: '(min-width: 1024px)' }),
    isXl: useMediaQuery({ query: '(min-width: 1280px)' }),
    is2Xl: useMediaQuery({ query: '(min-width: 1536px)' }),
  };
};

export default useResponsive;
