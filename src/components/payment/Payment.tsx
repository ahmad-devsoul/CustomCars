import Image from 'next/image';
import { Label } from '@/components/UI/Label';
import { RadioGroup, RadioGroupItem } from '@/components/UI/RadioGroup';
import { Mada, Mastercard, Tabby, Tamara, Visa } from '@/assets';
import { useLocale, useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setPaymentDetails } from '@/store/slices/booking';

export default function Payment() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((state: RootState) => state.booking);

  const handleChange = (value: string) => {
    dispatch(setPaymentDetails({ ...paymentDetails, paymentMethod: value }));
  };
  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className='mx-auto px-4 md:px-6 pt-6 md:p-6 space-y-8 md:h-[calc(100vh-260px)] no-scrollbar overflow-auto'
    >
      {/* Data Entry Section */}

      {/* Payment Details Section */}
      <div className='space-y-6'>
        <h2 className='text-lg font-semibold text-black'>
          {t('Enter Payment Details')}
        </h2>
        <RadioGroup
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          defaultValue='card'
          className='space-y-1.5 md:space-y-4'
        >
          {/* Credit/Debit Card Option */}
          <div
            className='flex items-center space-x-2 border rounded-lg p-4 bg-white'
            onClick={() => handleChange('card')}
          >
            <RadioGroupItem
              value='card'
              id='card'
              className={locale === 'ar' ? 'ml-3' : ''}
            />
            <Label
              htmlFor='card'
              className='flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0'
            >
              <span className='text-black'>
                {t('Pay with Debit/Credit Card')}
              </span>
              <div className='flex gap-3 flex-wrap'>
                <Image
                  src={Mada}
                  alt='Credit Card Logos'
                  width={60}
                  height={20}
                  unoptimized
                  priority
                />
                <Image
                  src={Visa}
                  alt='Credit Card Logos'
                  width={60}
                  height={20}
                  unoptimized
                  priority
                />
                <Image
                  src={Mastercard}
                  alt='Credit Card Logos'
                  width={60}
                  height={20}
                  unoptimized
                  priority
                />
              </div>
            </Label>
          </div>

          {/* Tamara Option */}
          <div
            className='flex items-start space-x-2 border rounded-lg p-4 bg-white'
            onClick={() => handleChange('tamara')}
          >
            <RadioGroupItem
              value='tamara'
              id='tamara'
              className={`mt-1 ${locale === 'ar' ? 'ml-3' : ''}`}
            />
            <Label htmlFor='tamara' className='flex flex-col w-full'>
              <div className='flex justify-between items-center w-full'>
                <span className='text-black'>{t('Pay with Tamara')}</span>
                <Image
                  src={Tabby}
                  alt='Tabby'
                  width={70}
                  height={30}
                  unoptimized
                  priority
                />
              </div>
              <p className='text-sm text-gray-500 mt-1'>
                {t(
                  'Pay part of the amount now and the rest according to the payment plan, without interest and hidden fees'
                )}
              </p>
            </Label>
          </div>

          {/* Tabby Option */}
          <div
            className='flex items-start space-x-2 border rounded-lg p-4 bg-white'
            onClick={() => handleChange('tabby')}
          >
            <RadioGroupItem
              value='tabby'
              id='tabby'
              className={`mt-1 ${locale === 'ar' ? 'ml-3' : ''}`}
            />
            <Label htmlFor='tabby' className='flex flex-col w-full'>
              <div className='flex justify-between items-center w-full'>
                <span className='text-black'>{t('Pay with Tabby')}</span>
                <Image
                  src={Tamara}
                  alt='Tamara'
                  width={70}
                  height={30}
                  unoptimized
                  priority
                />
              </div>
              <p className='text-sm text-gray-500 mt-1'>
                {t('Divide it into four interest-free payments')}
              </p>
            </Label>
          </div>

          {/* Pay on Site Option */}
          <div
            className='flex items-center space-x-2 border rounded-lg p-4 bg-white'
            onClick={() => handleChange('onsite')}
          >
            <RadioGroupItem
              value='onsite'
              id='onsite'
              className={locale === 'ar' ? 'ml-3' : ''}
            />
            <Label
              htmlFor='onsite'
              className='flex justify-between items-center w-full'
            >
              <span className='text-black'>{t('Pay on Site')}</span>
              <div className='w-8 h-8 bg-gray-200 rounded flex items-center justify-center'>
                <svg
                  viewBox='0 0 24 24'
                  className='w-5 h-5'
                  fill='none'
                  stroke='black'
                  strokeWidth='2'
                >
                  <path d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
