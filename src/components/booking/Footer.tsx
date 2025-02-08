'use client';
import {
  ArrowDownToLine,
  Bolt,
  CalendarDays,
  ChevronLeft,
  CreditCard,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { services } from '@/libs/utils/constants';
import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCreateBookingMutation } from '@/store/services/branches';
import { toast } from 'react-toastify';
import { useScroll } from '@/context/ScrollContext';

// Add this helper function at the top of the file, outside the component
const isPaymentDataComplete = (paymentDetails: any) => {
  return (
    paymentDetails?.name?.trim() &&
    paymentDetails?.phone?.trim() &&
    paymentDetails?.paymentMethod
  );
};

export function Footer() {
  const [createBooking] = useCreateBookingMutation();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { scrollToSection } = useScroll();
  const { selectedServices, slot, carType, serviceType, paymentDetails } =
    useSelector((state: RootState) => state.booking);

  const handleNext = () => {
    handleCreateBooking();
  };

  const handleBack = () => {
    router.back();
  };

  const handleCreateBooking = async () => {
    try {
      const response = await createBooking({
        services: selectedServices,
        slot: slot,
        carType: carType,
        serviceType: serviceType,
        paymentDetails: paymentDetails,
      });
      toast.success(t('Booking created successfully'));
    } catch (error) {
      toast.error(t('Booking failed! Something went wrong!'));
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

  const handleSectionClick = (section: 'booking' | 'slot' | 'payment') => {
    scrollToSection(section);
  };

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className='fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200'
    >
      <div className='container mx-auto px-2 lg:px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <Button size='icon' className='h-10 w-10' onClick={handleBack}>
            <ChevronLeft
              className={cn(
                'h-6 w-6 text-gray200 font-bold',
                locale === 'ar' && 'transform rotate-180'
              )}
            />
            <span className='sr-only'>Previous</span>
          </Button>
          <div className='flex items-center gap-1'>
            <div
              onClick={() => handleSectionClick('booking')}
              className={cn(
                'border border-white rounded-full p-1.5 cursor-pointer',
                pathname.includes('/booking') && 'border-black text-black',
                pathname.includes('/booking/') && 'bg-black'
              )}
            >
              <Bolt
                className={cn(
                  'w-[14px] h-[14px]',
                  pathname.includes('/booking/') && 'text-white'
                )}
              />
            </div>
            <div className='border-t border-gray100 w-3 lg:w-5' />
            <div
              onClick={() => handleSectionClick('slot')}
              className={cn(
                'border rounded-full p-1.5 cursor-pointer',
                pathname.includes('/booking/slot') && 'border-black',
                pathname.includes('/booking/payment') && 'bg-black'
              )}
            >
              <CalendarDays
                className={cn(
                  'w-[14px] h-[14px]',
                  pathname.includes('/booking/slot') && 'text-black',
                  pathname.includes('/booking') &&
                    !pathname.includes('/booking/slot') &&
                    'text-gray100',
                  pathname.includes('/booking/payment') && 'text-white'
                )}
              />
            </div>
            <div className='border-t border-gray100 w-3 lg:w-5' />
            <div
              className={cn(
                'border rounded-full p-1.5 cursor-pointer',
                pathname.includes('/booking/payment') && 'border-black'
              )}
              onClick={() => handleSectionClick('payment')}
            >
              <CreditCard
                className={cn(
                  'w-[14px] h-[14px] text-gray100',
                  pathname.includes('/booking/payment') && 'text-black'
                )}
              />
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2 lg:gap-4'>
          {totalPrice ? (
            <span className='text-sm font-medium text-[#060606]'>
              <span className='font-semibold'>{totalPrice}</span> {t('SAR')}
            </span>
          ) : null}

          <div className='relative'>
            <div className='bg-red-500 absolute h-5 w-5 -right-1 -top-3 rounded-full flex items-center justify-center'>
              <span className='ext-sm font-medium'>
                {selectedServices.length}
              </span>
            </div>

            <ShoppingCart color='black' size={30} />
          </div>

          {/* Only show confirm button when all required data is present */}
          {selectedServices &&
          slot &&
          carType &&
          serviceType &&
          isPaymentDataComplete(paymentDetails) ? (
            <Button
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              onClick={handleNext}
              disabled={!totalPrice}
              className={cn(
                'font-bold text-sm flex gap-1 bg-black text-white hover:bg-black hover:text-white'
              )}
            >
              {t('Confirm Booking')}
              <ArrowDownToLine className='ml-2 h-4 w-4' />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
