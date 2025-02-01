import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ar'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale)) {
    console.error('Invalid locale:', locale);
    notFound();
  }

  try {
    return {
      locale,
      messages: (await import(`../locale/${locale}.json`)).default,
    };
  } catch (error) {
    console.error('Error loading locale messages:', error);
    notFound();
  }
});
