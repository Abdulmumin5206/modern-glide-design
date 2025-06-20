import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  useBlackTheme?: boolean;
  isScrolled?: boolean;
  isLaptopScreen?: boolean;
  shouldUseBlackText?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  useBlackTheme = false, 
  isScrolled = false, 
  isLaptopScreen = false,
  shouldUseBlackText = false 
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'uz', name: 'O\'zbekcha' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    if (langCode !== i18n.language) {
      i18n.changeLanguage(langCode);

      // Trigger a window resize event after a small delay
      // to ensure any responsive elements recalculate their dimensions
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
    
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const getTextColor = () => {
    if (isScrolled) return "text-black";
    if (shouldUseBlackText) return "text-black";
    if (useBlackTheme) return "text-white";
    return "text-white";
  };

  const getBorderColor = () => {
    if (isScrolled) return "border-black";
    if (shouldUseBlackText) return "border-black";
    if (useBlackTheme) return "border-black";
    return "border-white";
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center border hover:text-[#329db7] transition-opacity px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} ${getBorderColor()} bg-transparent ${getTextColor()}`}
        aria-label="Change language"
      >
        <Globe className={`mr-1 h-4 w-4 ${getTextColor()}`} />
        <span className="text-xs sm:text-sm font-medium uppercase">{currentLanguage.code}</span>
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 mt-2 ${isScrolled || shouldUseBlackText ? 'bg-white' : 'bg-transparent'} shadow-lg overflow-hidden z-50 w-32 border ${isScrolled || shouldUseBlackText ? 'border-gray-100' : 'border-white'}`}>
          {languages.map(language => (
            <button
              key={language.code}
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage(language.code);
              }}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between ${
                isScrolled || shouldUseBlackText ? 'text-gray-800' : 'text-white'
              } ${
                language.code === i18n.language 
                  ? (isScrolled || shouldUseBlackText ? 'bg-gray-100' : 'bg-white/10') 
                  : (isScrolled || shouldUseBlackText ? 'hover:bg-gray-50' : 'hover:bg-white/5')
              } transition-colors duration-150`}
            >
              <span className="text-sm">{language.name}</span>
              <span className={`text-xs uppercase ${isScrolled || shouldUseBlackText ? 'text-gray-500' : 'text-white/70'}`}>{language.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 