'use client';
import { services, voucherCodes } from '@/libs/utils/constants';
import { RootState } from '@/store';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../UI/Button';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '../UI/Input';
import { setDiscount } from '@/store/slices/booking';
import { setVoucherCode } from '@/store/slices/booking';
import { toast } from 'react-toastify';

export function OrderSummary() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useDispatch();

  const { selectedServices, slot, discount, voucherCode } = useSelector(
    (state: RootState) => state.booking
  );

  const handleVoucherCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVoucherCode(e.target.value));
  };

  const handleApplyVoucher = () => {
    const voucher = voucherCodes.find(
      (voucher) => voucher.code === voucherCode || voucher.name === voucherCode
    );
    if (voucher) {
      if (voucher.type === 'percentage') {
        dispatch(setDiscount((totalPrice * voucher.value) / 100));
      } else if (voucher.type === 'fixed') {
        dispatch(setDiscount(voucher.value));
      }
      toast.success(t('Discount applied successfully'));
    } else {
      dispatch(setDiscount(0));
      toast.error(t('Invalid voucher code'));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyVoucher();
    }
  };

  const totalPrice = useMemo(() => {
    return services
      ?.filter((item) =>
        selectedServices?.find((service) => service === item.id)
      )
      ?.reduce((acc, curr) => {
        return acc + curr?.priceAfter;
      }, 0);
  }, [selectedServices]);
  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className='py-2 md:p-8 md:bg-white w-full md:h-screen mt-4 md:mb-24 md:mt-0 rounded-lg md:rounded-none'
    >
      <h2 className='text-lg font-semibold mb-6 text-black'>
        {t('Order Summary')}
      </h2>

      <div className='space-y-4'>
        {services
          ?.filter((item) =>
            selectedServices?.find((service) => service === item.id)
          )
          ?.map((item, index) => (
            <div className='flex justify-between items-start' key={index}>
              <div>
                <h3 className='font-bold text-[15px] text-black'>
                  {t(item?.serviceType)}
                </h3>
                <p className='text-sm text-gray-500'>{t(item?.serviceName)}</p>
              </div>
              <div className='flex items-baseline gap-1'>
                <span className='font-medium text-black'>
                  {item?.priceAfter}
                </span>
                <span className='text-sm text-gray-500'>{t('SAR')}</span>
              </div>
            </div>
          ))}

        <div className='space-y-3'>
          <div className='mb-8 mt-6 relative'>
            <Input
              type='text'
              placeholder={t('Enter Voucher Code')}
              className={`w-full p-2.5 border rounded-lg text-sm text-black outline-none bg-white ${
                locale === 'ar' ? 'pl-16' : 'pr-16'
              }`}
              value={voucherCode}
              onChange={handleVoucherCode}
              onKeyDown={handleKeyPress}
            />
            <Button
              onClick={handleApplyVoucher}
              className={`text-sm font-bold absolute text-black top-[1px] ${
                locale === 'ar' ? 'left-[1px]' : 'right-[1px]'
              }`}
            >
              {t('Apply')}
            </Button>
          </div>

          <div className='flex justify-between mt-4 border-b pb-2'>
            <p className='text-sm text-gray-600'>{t('Date')}</p>
            <p className='font-medium text-black'>
              {new Date(slot.date).toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
              {slot.time}
            </p>
          </div>

          <div className='space-y-3 pt-3'>
            <div className='flex justify-between text-sm border-b pb-2'>
              <span className='text-gray-600'>{t('Subtotal')}</span>
              <div className='flex items-baseline gap-1'>
                <span className='font-medium text-black'>
                  {totalPrice - discount}
                </span>
                <span className='text-gray-500'>{t('SAR')}</span>
              </div>
            </div>
            {/* <div className="flex justify-between text-sm border-b pb-2">
              <span className="text-gray-600">{t('Tax')}</span>
              <div className="flex items-baseline gap-1">
                <span className="font-medium text-black">50</span>
                <span className="text-gray-500">{t('SAR')}</span>
              </div>
            </div> */}
            <div className='flex justify-between text-[15px] pt-1'>
              <span className='font-medium text-black'>{t('Total')}</span>
              <div className='flex items-baseline gap-1'>
                <span className='font-semibold text-black'>
                  {totalPrice - discount}
                </span>
                <span className='text-sm text-gray-500'>{t('SAR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
