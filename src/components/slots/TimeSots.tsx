'use client'

import { cn } from "@/libs/utils"
import { RootState } from "@/store"
import { setSlot } from "@/store/slices/booking"
import { useTranslations } from "next-intl"
import { useDispatch, useSelector } from "react-redux"

const MORNING_SLOTS = ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]

export function TimeSlots() {
    const t = useTranslations()
    const {slot} = useSelector((state:RootState)=>state.booking)
    const dispatch = useDispatch()
    const handleSelectTime = (time:string) => {
        dispatch(setSlot({...slot, time}))
    }

    return (
      <div className="p-3 lg:p-6 flex items-center w-full lg:w-[50%] justify-center bg-white border-t lg:border-l rounded-bl-lg rounded-br-lg lg:rounded-tr-lg lg:rounded-br-lg mb-20">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {MORNING_SLOTS.map((time, i) => (
                <div key={i} className="whitespace-nowrap gap-2 ">
                  <button
                    onClick={() => handleSelectTime(time)}
                    className={cn(
                      "py-2.5 px-4 text-sm rounded-lg border transition-colors",
                      slot?.time === time
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    )}
                  >
                    {t(time)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

