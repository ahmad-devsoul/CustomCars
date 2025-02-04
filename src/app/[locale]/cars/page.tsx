'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/UI/Button';
import { bgShadow, SedanImg, SUVImg } from '@/assets';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { setCarType } from '@/store/slices/booking';
import { useDispatch } from 'react-redux';
import { cn } from '@/libs/utils';
import { useLocale, useTranslations } from 'next-intl';
import { NavMenu } from '@/components/booking/Sidebar';

interface CarType {
  name: string;
  image: StaticImageData;
}

const carTypes: CarType[] = [
  {
    name: 'SEDAN',
    image: SedanImg,
  },
  {
    name: 'SUV',
    image: SUVImg,
  },
];

export default function CarSelector() {
  const t = useTranslations();
  const locale = useLocale();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const handleNavigate = (index?: number) => {
    const carIndex = typeof index === 'number' ? index : selectedIndex;
    dispatch(setCarType(carTypes[carIndex].name));
    router.push('/booking');
  };
  return (
    <>
      <div className='hidden w-full h-screen overflow-hidden bg-white lg:flex flex-col'>
        <h1 className='text-center font-bold text-[52px] py-3 text-black'>
          {t('SELECT CAR TYPE')}
        </h1>

        <div className='relative flex-1 mt-14'>
          <div className='overflow-hidden h-full' ref={emblaRef}>
            <div className='flex'>
              {carTypes.map((car, index) => (
                <div key={index} className='flex-[0_0_82%] min-w-0 pl-4'>
                  <div className='relative w-full'>
                    {/* Diagonal background */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-[#F2F2F2] transform translate-x-[55%] -skew-x-[68deg] scale-[1.5]',
                        index == 0 && 'hidden'
                      )}
                    />
                    {/* Car image */}
                    <div
                      className={`relative z-10 isolate w-[90%] h-full ml-10 ${
                        index === 0 && '-mt-10'
                      }`}
                    >
                      <Image
                        src={car.image || '/placeholder.svg'}
                        alt={`${car.name} car type`}
                        className='object-contain'
                      />
                      <div
                        className={cn(
                          'absolute inset-0 -z-10',
                          index === 0 ? 'pt-20' : 'flex justify-end'
                        )}
                      >
                        <p
                          className={cn(
                            'text-9xl',
                            index === 0 ? 'text-[#F2F2F2]' : 'text-white'
                          )}
                        >
                          {t(carTypes[selectedIndex].name)}
                        </p>
                      </div>
                    </div>

                    {/* Car type label */}
                  </div>
                </div>
              ))}
            </div>
            <div
              className='absolute bottom-10 left-8 z-20 flex items-center gap-4 cursor-pointer'
              onClick={() => handleNavigate()}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className='w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center '>
                <ChevronRight
                  className={cn(
                    'w-5 h-5 text-black',
                    locale === 'ar' && 'transform rotate-180'
                  )}
                />
              </div>
              <span className='text-[52px] font-medium text-black'>
                {t(carTypes[selectedIndex].name)}
              </span>
            </div>
          </div>

          <div className='absolute -top-9 left-1/2 -translate-x-1/2 -translate-y-4 flex gap-4'>
            <Button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className='h-10 w-10 rounded-lg border-2 border-black p-0 '
            >
              <ChevronLeft className='w-5 h- text-black font-semibold' />
            </Button>
            <Button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className='h-10 w-10 rounded-lg border-2 border-black p-0 '
            >
              <ChevronRight className='w-5 h- text-black font-bold' />
            </Button>
          </div>
        </div>
      </div>
      <div
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className='lg:hidden h-[100dvh] bg-white flex flex-col'
      >
        <header className='bg-zinc-900 text-white p-4 lg:rounded-lg w-full lg:w-[50%]'>
          <div
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className='container mx-auto flex justify-between items-center'
          >
            <div className='flex items-center gap-7 px-5'>
              <span className='font-bold text-lg'>CUSTOM</span>
            </div>
            <NavMenu />
          </div>
        </header>
        <div className='flex flex-col gap-1 px-4 py-5'>
          <h1 className='font-bold text-[32px] text-black'>
            {t('SELECT CAR TYPE')}
          </h1>
          <div className='w-[30%] h-0.5 bg-[#F2F2F2]' />
        </div>
        <div className='flex-1 flex flex-col relative isolate'>
          <div
            className={cn(
              'absolute w-full bottom-0 -z-10 h-[56%]',
              locale === 'ar' && 'transform scale-x-[-1]'
            )}
          >
            <Image src={bgShadow} alt='' className='size-full' />
          </div>
          {carTypes.map((car, index) => (
            <div key={index} className='h-1/2'>
              <div className=''>
                <Image
                  src={car.image || '/placeholder.svg'}
                  alt={`${car.name} car type`}
                  className='w-full h-full object-contain aspect-video'
                />
              </div>
              <div
                className='flex items-center gap-5 px-5'
                onClick={() => handleNavigate(index)}
              >
                <div className='size-[48px] border-2 border-black rounded-lg flex items-center justify-center '>
                  <ChevronRight
                    className={cn(
                      'size-10 text-black',
                      locale === 'ar' && 'transform rotate-180'
                    )}
                  />
                </div>
                <p className='text-[52px] font-medium text-black'>
                  {t(car.name)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
