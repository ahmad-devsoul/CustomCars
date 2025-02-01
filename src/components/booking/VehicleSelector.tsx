'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/UI/Dropdown'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCarType } from '@/store/slices/booking'
import { useTranslations } from 'next-intl'

const vehicles = ['SEDAN', 'SUV']

export function VehicleSelector() {
  const carType = useSelector((state: RootState) => state.booking.carType);
  const dispatch=useDispatch()
  const t = useTranslations()

  const handleSelect=(value: string)=>{
    dispatch(setCarType(value))
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
        {t(carType)}  
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-40 bg-zinc-900 border-zinc-800"
      >
        {vehicles.map((vehicle) => (
          <DropdownMenuItem
            key={vehicle}
            onClick={() => handleSelect(vehicle)}
            className="text-sm text-white hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer"
          >
            {t(vehicle)}  
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

