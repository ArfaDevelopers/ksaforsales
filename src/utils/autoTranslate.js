// Auto-translation utility using LibreTranslate (FREE)

/**
 * Translate text using MyMemory API (FREE, no API key needed)
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language ('ar' or 'en')
 * @param {string} sourceLang - Source language ('ar', 'en', or 'auto')
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang = 'ar', sourceLang = 'auto') => {
  if (!text || text.trim() === '') return text;

  try {
    // MyMemory API - FREE and reliable
    const langPair = sourceLang === 'auto' ? `en|${targetLang}` : `${sourceLang}|${targetLang}`;
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`;

    console.log('Attempting translation request to:', url.substring(0, 100) + '...');

    const response = await fetch(url).catch(err => {
      console.error('Fetch error:', err);
      throw new Error(`Network error: ${err.message}`);
    });

    console.log('Response received. Status:', response.status, 'OK:', response.ok);

    if (!response.ok) {
      throw new Error(`Translation failed: HTTP ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Log full response for debugging
    console.log('MyMemory API Response:', data);
    console.log('Response Status:', data.responseStatus);
    console.log('Translated Text:', data.responseData?.translatedText);

    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }

    // More detailed error
    console.error('Translation failed. Full response:', JSON.stringify(data));
    throw new Error(`Translation response invalid: ${data.responseDetails || 'No details'}`);

  } catch (error) {
    console.error('Translation error:', error);
    console.error('Falling back to original text');
    return text; // Return original text if translation fails
  }
};

/**
 * Detect if text contains Arabic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Arabic
 */
export const isArabicText = (text) => {
  if (!text) return false;
  return /[\u0600-\u06FF]/.test(text);
};

/**
 * Auto-translate text to both English and Arabic
 * @param {string} text - Text to translate
 * @returns {Promise<Object>} Object with both translations {en: string, ar: string}
 */
export const autoTranslate = async (text) => {
  if (!text || text.trim() === '') {
    return { en: '', ar: '' };
  }

  const isArabic = isArabicText(text);

  try {
    if (isArabic) {
      // Text is Arabic, translate to English
      const translatedEn = await translateText(text, 'en', 'ar');
      return {
        ar: text,
        en: translatedEn,
      };
    } else {
      // Text is English, translate to Arabic
      const translatedAr = await translateText(text, 'ar', 'en');
      return {
        en: text,
        ar: translatedAr,
      };
    }
  } catch (error) {
    console.error('Auto-translate error:', error);
    // Return original text in both fields if translation fails
    return {
      en: text,
      ar: text,
    };
  }
};

/**
 * Translate multiple fields at once
 * @param {Object} fields - Object with field names and values to translate
 * @returns {Promise<Object>} Object with translated fields
 */
export const translateMultipleFields = async (fields) => {
  const translations = {};

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (fieldValue && fieldValue.trim() !== '') {
      const translated = await autoTranslate(fieldValue);
      translations[`${fieldName}_en`] = translated.en;
      translations[`${fieldName}_ar`] = translated.ar;
    } else {
      translations[`${fieldName}_en`] = '';
      translations[`${fieldName}_ar`] = '';
    }
  }

  return translations;
};

/**
 * Get translated field based on current language
 * @param {Object} item - Data item from database
 * @param {string} fieldName - Field name (without _en or _ar suffix)
 * @param {string} language - Current language ('en' or 'ar')
 * @returns {string} Translated field value
 */
export const getTranslatedField = (item, fieldName, language = 'en') => {
  if (!item) return '';

  // Normalize language to 'en' or 'ar'
  const lang = language.startsWith('ar') ? 'ar' : 'en';

  // Try underscore format first: title_en, title_ar
  const fieldKeyUnderscore = `${fieldName}_${lang}`;
  if (item[fieldKeyUnderscore]) {
    return item[fieldKeyUnderscore];
  }

  // Try hyphen format: title-en, title-ar (for backward compatibility)
  const fieldKeyHyphen = `${fieldName}-${lang}`;
  if (item[fieldKeyHyphen]) {
    return item[fieldKeyHyphen];
  }

  // Fallback to English field (underscore)
  if (item[`${fieldName}_en`]) {
    return item[`${fieldName}_en`];
  }

  // Fallback to English field (hyphen)
  if (item[`${fieldName}-en`]) {
    return item[`${fieldName}-en`];
  }

  // Fallback to original field (for backward compatibility)
  if (item[fieldName]) {
    return item[fieldName];
  }

  return '';
};
