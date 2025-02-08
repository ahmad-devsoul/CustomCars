'use client';

import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import 'react-day-picker/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSlot } from '@/store/slices/booking';
import { useLocale } from 'next-intl';
import { cn } from '@/libs/utils';
import { ar } from 'date-fns/locale';

export function Calendar() {
  const locale = useLocale();
  const [selectedMonthYear, setSelectedMonthYear] = useState<Date>(new Date());
  const { slot } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();

  const disabledDays = { before: new Date() };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(
      selectedMonthYear.getFullYear(),
      selectedMonthYear.getMonth() - 1
    );
    setSelectedMonthYear(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      selectedMonthYear.getFullYear(),
      selectedMonthYear.getMonth() + 1
    );
    setSelectedMonthYear(nextMonth);
  };

  const handleSelectDate = (date: Date) => {
    dispatch(setSlot({ date: date.toISOString() })); // Store as a string
  };

  return (
    <div className='p-3 lg:p-6 w-full rounded-tl-lg rounded-tr-lg lg:rounded-tl-lg lg:rounded-bl-lg'>
      <div className='flex items-center justify-between mb-4 w-full'>
        <h2 className='text-[15px] text-gray-900 flex flex-col sm:flex-row items-start sm:items-center'>
          <span className='font-semibold text-black500 text-xl'>
            {selectedMonthYear.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className={cn(
              'text-black500 text-sm font-semibold hidden sm:block',
              locale === 'ar' ? 'mr-2' : 'ml-2'
            )}
          >
            {new Date(slot.date).toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </h2>
      </div>

      <div dir='rtl' className='relative dayPicker'>
        <DayPicker
          mode='single'
          month={selectedMonthYear}
          selected={new Date(slot.date)}
          onSelect={(date) => date && handleSelectDate(date)}
          onMonthChange={(date) => date && setSelectedMonthYear(date)}
          disabled={disabledDays}
          showOutsideDays
          locale={locale === 'ar' ? ar : undefined}
          classNames={{
            caption_label: 'hidden',
            nav: `space-x-1 flex items-center gap-3 absolute -top-10 ${
              locale === 'ar' ? 'left-0 flex flex-row-reverse' : 'right-0'
            }`,
          }}
          components={{
            PreviousMonthButton: () => (
              <button onClick={handleNextMonth}>
                <ChevronRight className='w-6 h-6 font-semibold text-[#888888] border border-gray100 rounded-full mr-3' />
              </button>
            ),
            NextMonthButton: () => (
              <button onClick={handlePreviousMonth}>
                <ChevronLeft className='w-6 h-6 font-semibold text-[#888888] border border-gray100 rounded-full' />
              </button>
            ),
          }}
        />
      </div>
    </div>
  );
}
