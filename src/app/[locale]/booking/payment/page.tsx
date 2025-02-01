"use client"
import Payment from "@/components/payment/Payment";
import { OrderSummary } from "@/components/slots/OrderSummary";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/UI/Input";
import { cn } from "@/libs/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setPaymentDetails } from "@/store/slices/booking";

export default function PaymentForm() {
  const t = useTranslations();
  const locale = useLocale();
  const {paymentDetails} = useSelector((state: RootState) => state.booking)
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    dispatch(setPaymentDetails({...paymentDetails, [name]: e.target.value}))
  }
  return (
    <div className="size-full grid grid-cols-1 md:grid-cols-12 md:max-h-screen md:overflow-hidden">
      <div className="space-y-6 pt-8 px-4 md:px-10 md:col-span-8">
        <h2 className={`text-lg font-semibold text-black ${locale==='ar' ? 'text-right' : ''}`}>
          {t("Enter Your Data")}
        </h2>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder={t("Full Name")}
              className={cn("w-full bg-white", locale === "ar" && "text-right")}
              value={paymentDetails.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </div>
          <div className="flex gap-4">
            <Input
              type="tel"
              placeholder={t("Phone Number")}
              className={cn("w-full bg-white", locale === "ar" && "text-right")}
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
      <div className="w-full md:col-span-4 md:row-span-3 px-4">
        <OrderSummary />
      </div>
      <div className="md:col-span-8 md:px-4 mb-20 md:mb-0">
      <Payment />
      </div>
    </div>
  );
}
