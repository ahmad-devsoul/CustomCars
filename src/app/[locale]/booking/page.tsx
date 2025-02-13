'use client';
import { ServiceCard } from '@/components/booking/Card';
import { NavMenu } from '@/components/booking/Sidebar';
import { VehicleSelector } from '@/components/booking/VehicleSelector';
import Image from 'next/image';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { Calendar } from '@/components/slots/Calender';
import { TimeSlots } from '@/components/slots/TimeSots';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { setServiceType } from '@/store/slices/booking';
import { services } from '@/libs/utils/constants';

import Payment from '@/components/payment/Payment';
import { OrderSummary } from '@/components/slots/OrderSummary';
import { Input } from '@/components/UI/Input';
import { cn } from '@/libs/utils';
import { setPaymentDetails } from '@/store/slices/booking';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const mobileServicesRef = useRef<HTMLDivElement>(null);
  // const [activeSlide, setActiveSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<number>(7);
  const serviceType = useSelector(
    (state: RootState) => state.booking.serviceType
  );
  const carType = useSelector((state: RootState) => state.booking.carType);
  const dispatch = useDispatch();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const servicesData = useMemo(() => {
    return services.filter(
      (service) =>
        service.carType === carType &&
        service.serviceType.toUpperCase() === serviceType.toUpperCase()
    );
  }, [carType, serviceType]);

  const handleSelectTab = (value: string) => {
    dispatch(setServiceType(value));
    const tab = services.filter(
      (service) =>
        service.carType === carType &&
        service.serviceType.toUpperCase() === value.toUpperCase()
    );
    setSelectedService(tab[0]?.id);

    // Reset scroll position when tab changes
    if (mobileServicesRef.current) {
      if (locale === 'ar') {
        mobileServicesRef.current.scrollLeft =
          mobileServicesRef.current.scrollWidth;
      } else {
        mobileServicesRef.current.scrollLeft = 0;
      }
    }
  };

  const handleSlideChange = (index: number) => {
    setSelectedService(servicesData[index].id);
    // setActiveSlide(index);
  };

  useEffect(() => {
    if (carType) {
      const tab = services.filter(
        (service) =>
          service.carType === carType &&
          service.serviceType.toUpperCase() === serviceType.toUpperCase()
      );
      setSelectedService(tab[0]?.id);
    }
  }, [carType, serviceType]);
  const { paymentDetails } = useSelector((state: RootState) => state.booking);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    dispatch(setPaymentDetails({ ...paymentDetails, [name]: e.target.value }));
  };

  return (
    <div className='size-full flex flex-col justify-start items-center w-full h-full overflow-y-scroll'>
      {/* Main Content */}
      <div id='booking' className='flex h-full md:pt-14 w-full md:px-12'>
        <div className='flex flex-col lg:flex-row items-start justify-between size-full'>
          {/* Car Image */}
          <div className='w-full'>
            <header className='bg-zinc-900 text-white p-4 lg:rounded-lg w-full lg:w-[50%]'>
              <div
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                className='container mx-auto flex justify-between items-center'
              >
                <div className='flex items-center gap-7'>
                  <Link href='/' className='font-bold text-lg cursor-pointer'>
                    CUSTOM
                  </Link>
                  <div className='flex gap-3'>
                    <VehicleSelector />
                  </div>
                </div>
                <NavMenu />
              </div>
            </header>
            <div className='relative overflow-hidden lg:w-[95%] h-[200px] md:h-[400px] lg:h-auto lg:min-h-[600px] mb-3 lg:mb-0 flex justify-center items-center'>
              <Image
                src={
                  services?.find((item) => item.id === selectedService)?.gif ||
                  ''
                }
                alt='Car'
                fill
                className='object-contain rounded-lg'
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className='space-y-6 w-full h-full lg:max-w-[35%] px-4 lg:px-0 flex flex-col'>
            {/* Tabs */}
            <div
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              className='flex gap-4 justify-between min-h-[60px] md:min-h-[72px] border-b border-gray-200 bg-[rgba(0,00,0.99)] rounded-lg overflow-auto whitespace-nowrap w-[calc(100%-2px)] no-scrollbar'
            >
              {[
                'POLISHING',
                'WINDOW FILM',
                'PROTECTION FILM',
                'NANO CERAMIC',
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm hover:bg-[rgba(104,104,104,0.50)] capitalize text-white hover:text-white rounded-lg transition-all 
                    ${
                      tab === serviceType
                        ? 'text-white font-semibold bg-[rgba(104,104,104,0.50)] px-5'
                        : 'text-gray200 hover:text-gray-700'
                    }`}
                  onClick={() => handleSelectTab(tab)}
                >
                  {t(tab)}
                </button>
              ))}
            </div>

            {/* Service Cards */}
            <div className='hidden lg:block overflow-y-auto no-scrollbar lg:h-[calc(100vh-170px)] space-y-2 mb-16'>
              <div className='flex-1 gap-2 space-y-2'>
                {servicesData.map((service) => (
                  <ServiceCard
                    key={service.id}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    {...service}
                  />
                ))}
              </div>
            </div>
            <div
              ref={mobileServicesRef}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              className='flex flex-row gap-4 overflow-x-auto no-scrollbar lg:hidden'
            >
              {servicesData.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        id='slot'
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className='w-full px-5 md:px-10 h-auto min-h-min pt-10 md:pt-0 pb-10 md:pb-40'
      >
        <h1 className='px-1 py-3 lg:py-5 font-semibold text-2xl text-black'>
          {t('Select Date and Time')}
        </h1>
        <div className='flex flex-col lg:flex-row w-full rounded-lg bg-white py-5 md:py-0'>
          <Calendar />
          <TimeSlots />
        </div>
      </div>
      <div
        id='payment'
        className='size-full grid grid-cols-1 md:grid-cols-12 md:max-h-screen md:overflow-hidden pb-10 md:pb-0'
      >
        <div className='space-y-6 pt-8 px-4 md:px-10 md:col-span-8'>
          <h2
            className={`text-lg font-semibold text-black ${
              locale === 'ar' ? 'text-right' : ''
            }`}
          >
            {t('Enter Your Data')}
          </h2>
          <div className='space-y-4'>
            <div>
              <Input
                type='text'
                placeholder={t('Full Name')}
                className={cn(
                  'w-full bg-white',
                  locale === 'ar' && 'text-right'
                )}
                value={paymentDetails.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </div>
            <div className='flex gap-4'>
              <Input
                type='tel'
                placeholder={t('Phone Number')}
                className={cn(
                  'w-full bg-white',
                  locale === 'ar' && 'text-right'
                )}
                value={paymentDetails.phone}
                onChange={(e) => handleChange(e, 'phone')}
              />
              {/* <Button 
              className="bg-black text-white hover:bg-black/90 text-xs px-4"
            >
              VERIFY NUMBER
            </Button> */}
            </div>
            {/* <div className="flex gap-2">
            {[1,2,3,4].map((num) => (
              <Input 
                key={num}
                type="text" 
                className="w-14 h-14 text-center bg-gray-50"
                maxLength={1}
              />
            ))}
          </div> */}
          </div>
        </div>
        <div className='w-full md:col-span-4 md:row-span-3 px-4'>
          <OrderSummary />
        </div>
        <div className='md:col-span-8 md:px-4 mb-20 md:mb-0'>
          <Payment />
        </div>
      </div>
    </div>
  );
}
