'use client';
import { CheckedIcon, Tabby, Tamara } from '@/assets';
import { cn } from '@/libs/utils';
import { RootState } from '@/store';
import { setSelectedServices } from '@/store/slices/booking';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

interface ServiceCardProps {
  id: number;
  serviceName: string;
  priceAfter: number;
  priceBefore: number;
  selectedService?: number;
  setSelectedService?: (id: number) => void;
  onClick?: () => void;
  onVisible?: (id: number) => void;
  className?: string;
}

export function ServiceCard({
  id,
  serviceName,
  priceAfter,
  priceBefore,
  selectedService,
  setSelectedService,
  onClick,
  onVisible,
  className,
}: ServiceCardProps) {
  const locale = useLocale();
  const t = useTranslations();
  const { selectedServices } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
          onVisible?.(id);
        }
      },
      { threshold: 0.7 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [id, onVisible]);

  const handleSelectCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedServices.includes(id || 0)) {
      dispatch(
        setSelectedServices(selectedServices.filter((item) => item !== id))
      );
    } else {
      dispatch(setSelectedServices([...selectedServices, id]));
    }
  };
  return (
    <div
      ref={cardRef}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn(
        'bg-white rounded-lg px-2 lg:px-6 py-6 md:py-4 space-y-4 border-4 border-white transition-all cursor-pointer my-7 min-w-[80vw] lg:min-w-min',
        selectedService === id && 'border-black',
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        setSelectedService?.(id || 0);
      }}
    >
      <div className='flex justify-between items-center'>
        <h3 className='font-bold text-black'>{t(serviceName)}</h3>
        <button
          className={cn(
            'flex gap-2 text-sm text-gray-600 border border-gray100 rounded-full px-3 py-2',
            selectedServices.includes(id || 0) &&
              'bg-[rgba(0,00,0.99)] text-white'
          )}
          onClick={handleSelectCard}
        >
          {t(selectedServices.includes(id || 0) ? 'Selected' : 'Select')}
          {selectedServices.includes(id || 0) && (
            <div className='relative overflow-hidden w-5 h-5'>
              <Image
                src={CheckedIcon}
                alt='Car'
                fill
                className='object-contain'
              />
            </div>
          )}
        </button>
      </div>
      <div className='bg-zinc-900 rounded-lg p-4 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between min-h-[120px]'>
        <div className='flex flex-row md:flex-col justify-start items-center gap-1'>
          <div className='text-white text-lg md:text-xl font-bold'>
            {priceAfter.toLocaleString()}{' '}
            <span className='text-white text-xs md:text-sm'>{t('SAR')}</span>
          </div>
          <div className='text-white font-semibold text-sm ml-2 relative'>
            {priceBefore.toLocaleString()}{' '}
            <span className='text-xs'>{t('SAR')}</span>
            <div className='border-t-2 border-[#FF3B30] absolute top-[10px] -left-1 w-[95%]'></div>
          </div>
        </div>
        <div className='flex items-center gap-5 md:gap-2'>
          <span className='text-xs text-white whitespace-nowrap'>
            {t('Pay with')}
          </span>
          <div className='flex flex-row items-center gap-5 md:gap-2'>
            <Image
              src={Tabby}
              alt='Tabby'
              width={70}
              height={30}
              unoptimized
              priority
            />
            <Image
              src={Tamara}
              alt='Tamara'
              width={70}
              height={30}
              unoptimized
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
