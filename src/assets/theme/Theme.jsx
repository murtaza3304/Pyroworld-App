// src/assets/theme/Theme.js
import {useColorScheme} from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
};

import {useState, useEffect} from 'react';

// Define your hook
export const useThemeClasses = () => {
  const theme = useTheme();
  const [themeClasses, setThemeClasses] = useState({});

  useEffect(() => {
    const getTextColorClass = theme => {
      return theme === 'light' ? 'text-light-textt' : 'text-dark-textt';
    };

    const getSheetColorClass = theme => {
      return theme === 'light' ? 'bg-light-sheet' : 'bg-dark-sheet';
    };

    const getBlueColorClass = theme => {
      return theme === 'light' ? 'text-light-bluee' : 'text-dark-bluee';
    };
    const getReverseBackground = theme => {
      return theme === 'light' ? 'bg-gray-900' : 'bg-gray-100';
    };
    const getBlueBgClass = theme => {
      return theme === 'light' ? 'bg-light-bluee' : 'bg-dark-bluee';
    };

    const getRedColorClass = theme => {
      return theme === 'light' ? 'text-light-red' : 'text-dark-red';
    };

    const getGreenColorClass = theme => {
      return theme === 'light' ? 'text-light-green' : 'text-dark-green';
    };

    const getItemBgColorClass = theme => {
      return theme === 'light' ? 'bg-light-itembg' : 'bg-dark-itembg';
    };

    const getGrayColorClass = theme => {
      return theme === 'light' ? 'border-gray-300' : 'border-gray-600';
    };
    const getGrayColorClassText = theme => {
      return theme === 'light' ? 'text-gray-500' : 'text-gray-400';
    };

    const getChipColorClass = theme => {
      return theme === 'light' ? 'bg-light-chip' : 'bg-dark-chip';
    };
    const getBorderGrayColorClass = theme => {
      return theme === 'light' ? 'border-gray-300' : 'border-gray-800';
    };

    setThemeClasses({
      textColor: getTextColorClass(theme),
      sheetColor: getSheetColorClass(theme),
      blueText: getBlueColorClass(theme),
      redColor: getRedColorClass(theme),
      greenColor: getGreenColorClass(theme),
      itemBgColor: getItemBgColorClass(theme),
      grayColor: getGrayColorClass(theme),
      chipColor: getChipColorClass(theme),
      border: getBorderGrayColorClass(theme),
      blueBg: getBlueBgClass(theme),
      textGray: getGrayColorClassText(theme),
      reverse: getReverseBackground(theme),
    });
  }, [theme]);

  return themeClasses;
};

export default useThemeClasses;
