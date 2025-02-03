'use client'
import { ServiceCard } from '@/components/booking/Card'
import { NavMenu } from '@/components/booking/Sidebar'
import { VehicleSelector } from '@/components/booking/VehicleSelector'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useLocale, useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { setServiceType } from '@/store/slices/booking'
import { services } from '@/libs/utils/constants'

export default function Home() {
  // const [activeSlide, setActiveSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<number>(7);
  const serviceType = useSelector(
    (state: RootState) => state.booking.serviceType
  );
  const carType = useSelector((state: RootState) => state.booking.carType);
  const dispatch = useDispatch();
  const t = useTranslations();
  const locale = useLocale();

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

  return (
    <div className="size-full">
      {/* Main Content */}
      <main className="lg:container lg:mx-auto pb-10 lg:py-6 w-full lg:h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start justify-between size-full">
          {/* Car Image */}
          <div className="w-full">
            <header className="bg-zinc-900 text-white p-4 lg:rounded-lg w-full lg:w-[50%]">
              <div
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="container mx-auto flex justify-between items-center"
              >
                <div className="flex items-center gap-7">
                  <span className="font-bold text-lg">CUSTOM</span>
                  <div className="flex gap-3">
                    <VehicleSelector />
                  </div>
                </div>
                <NavMenu />
              </div>
            </header>
            <div className="relative overflow-hidden lg:w-[95%] h-[200px] md:h-[400px] lg:h-[500px] mb-3 lg:mb-0">
              <Image
                src={
                  services?.find((item) => item.id === selectedService)?.gif ||
                  ""
                }
                alt="Car"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-6 w-full h-full lg:max-w-[35%] px-4 lg:px-0 flex flex-col">
            {/* Tabs */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="flex gap-4 border-b border-gray-200 bg-[rgba(0,00,0.99)] rounded-lg overflow-auto whitespace-nowrap w-[calc(100%-2px)] no-scrollbar"
            >
              {[
                "POLISHING",
                "WINDOW FILM",
                "PROTECTION FILM",
                "NANO CERAMIC",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm hover:bg-[rgba(104,104,104,0.50)] capitalize hover:text-white rounded-lg transition-all 
                    ${
                      tab === serviceType
                        ? "text-white font-semibold bg-[rgba(104,104,104,0.50)]"
                        : "text-gray200 hover:text-gray-700"
                    }`}
                  onClick={() => handleSelectTab(tab)}
                >
                  {t(tab)}
                </button>
              ))}
            </div>

            {/* Service Cards */}
            <div className="hidden lg:block overflow-y-auto no-scrollbar lg:h-[calc(100vh-170px)] space-y-2 mb-16">
              <div className="flex-1 gap-2 space-y-2">
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
            <div className="relative lg:hidden">
              <Carousel
                onChange={handleSlideChange}
                showArrows={true}
                centerMode={true} // Enables the "peek" effect
                centerSlidePercentage={80}
              >
                {servicesData.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

