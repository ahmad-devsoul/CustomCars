import { Calendar } from "@/components/slots/Calender";
import { OrderSummary } from "@/components/slots/OrderSummary";
import { TimeSlots } from "@/components/slots/TimeSots";
import { useLocale, useTranslations } from "next-intl";


export default function Slots() {
  const locale=useLocale()
  const t = useTranslations()
  return (
    <div className="overflow-hidden md:h-screen bg-gray-50">
      <div className="rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="w-full px-5 md:px-10 mt-5 lg:mt-8"
          >
            <h1 className="px-1 py-3 lg:py-5 font-semibold text-2xl text-black">
              {t("Select Date and Time")}
            </h1>
            <div className="flex flex-col lg:flex-row w-full">
              <Calendar />
              <TimeSlots />
            </div>
          </div>
          <div className="px-5 md:px-0 w-full md:w-[45%] mb-20 md:mb-0 hidden md:block">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

