'use client'
import { CheckedIcon, Tabby, Tamara } from "@/assets"
import { cn } from "@/libs/utils"
import { RootState } from "@/store"
import { setSelectedServices } from "@/store/slices/booking"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"

interface ServiceCardProps {
  id: number
  serviceName: string
  priceAfter: number
  priceBefore: number
  selectedService?: number
  setSelectedService?: React.Dispatch<React.SetStateAction<number>>
}

export function ServiceCard({ id, serviceName, priceAfter, priceBefore, selectedService, setSelectedService }: ServiceCardProps) {
  const locale=useLocale();
  const t = useTranslations();
  const {selectedServices} = useSelector((state:RootState)=>state.booking)
  const dispatch = useDispatch()
  const handleSelectCard = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (selectedServices.includes(id || 0)) {
      dispatch(setSelectedServices(selectedServices.filter(item => item !== id)))
    } else {
      dispatch(setSelectedServices([...selectedServices, id]))
    }
  }
  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        "bg-white rounded-lg px-2 lg:px-6 py-4 space-y-4 border-4 border-white transition-all cursor-pointer my-7",
        selectedService === id && "border-black"
      )}
      onClick={() => setSelectedService?.(id || 0)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-black">{t(serviceName)}</h3>
        <button
          className={cn(
            "flex gap-2 text-sm text-gray-600 border border-gray100 rounded-full px-3 py-2",
            selectedServices.includes(id || 0) &&
              "bg-[rgba(0,00,0.99)] text-white"
          )}
          onClick={handleSelectCard}
        >
          {t(selectedServices.includes(id || 0) ? "Selected" : "Select")}
          {selectedServices.includes(id || 0) && (
            <div className="relative overflow-hidden w-5 h-5">
              <Image
                src={CheckedIcon}
                alt="Car"
                fill
                className="object-contain"
              />
            </div>
          )}
        </button>
      </div>
      <div className="bg-zinc-900 rounded-lg p-4 flex flex-wrap items-center justify-between">
        <div className=" gap-1">
          <div className="text-white text-lg md:text-xl font-bold">
            {priceAfter.toLocaleString()}{" "}
            <span className="text-white text-xs md:text-sm">{t("SAR")}</span>
          </div>

          <div className="text-white font-semibold text-sm ml-2 relative">
            {priceBefore.toLocaleString()}{" "}
            <span className="text-xs">{t("SAR")}</span>
            <div className="border-t-2 border-[#FF3B30] absolute top-[10px] -left-1 w-[95%]"></div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-white whitespace-nowrap">
            {t("Pay with")}
          </span>
          <div className="relative w-10 h-10 md:w-16 md:h-16">
            <Image src={Tabby} alt="Tabby" fill className="object-contain" />
          </div>
          <div className="relative w-[60px] h-[60px] md:w-[100px] md:h-[100px]">
            <Image src={Tamara} alt="Tamara" fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

