import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
});

export const config = {
  matcher: [
    // Exclude requests to static files and public folder
    '/((?!api|_next|static|favicon.ico|.*\\..*).*)',
  ],
};
