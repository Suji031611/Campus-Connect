import React, { useState } from 'react';
import { INITIAL_TIMETABLE } from '../data/mockData';

interface TimetableViewProps {
  onOpenClassDetail?: (cls: any) => void;
}

export const TimetableView: React.FC<TimetableViewProps> = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Friday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const currentDaySchedule = INITIAL_TIMETABLE.find((d) => d.day === selectedDay);

  return (
    <div id="timetable-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block px-2.5 py-1 border border-black/15 bg-[#E8E4DE] rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/70">
              Weekly Chronology
            </span>
            <span className="font-sans text-[11px] text-black/40 italic">
              Semester 6 • Fall Session
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Lectures & Schedule
          </h2>
          <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-black/50 mt-2 font-medium">
            Weekly class schedule, lecture rooms, and academic calendar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Calendar synced to Google Calendar / Apple iCal (.ics exported)')}
            className="border border-black/20 bg-[#FFFFFF] hover:bg-[#E8E4DE] text-[#1A1A1A] font-sans text-[11px] uppercase tracking-[0.15em] font-semibold px-5 py-3 rounded-md flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Sync to Calendar</span>
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-2.5 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer ${
              selectedDay === day
                ? 'bg-[#1A1A1A] text-[#F4F1ED] shadow-2xs'
                : 'bg-[#FFFFFF] text-black/60 hover:bg-[#E8E4DE] hover:text-black border border-black/10'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Daily Schedule List */}
      <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-8 border border-black/10 shadow-2xs">
        <div className="flex items-baseline justify-between pb-5 mb-6 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-0.5">
              Daily Itinerary
            </span>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">{selectedDay} Classes</h3>
          </div>
          <span className="font-sans text-[10px] uppercase tracking-widest text-black/50 border border-black/10 px-3 py-1 rounded bg-[#F4F1ED]">
            {currentDaySchedule?.classes.length || 0} Sessions Scheduled
          </span>
        </div>

        <div className="space-y-4">
          {currentDaySchedule?.classes.map((cls, idx) => (
            <div
              key={idx}
              className="bg-[#F4F1ED]/50 hover:bg-[#E8E4DE]/60 rounded-lg p-5 border border-black/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-[#1A1A1A] text-[#F4F1ED] flex items-center justify-center font-sans font-bold text-[13px] shrink-0">
                  {cls.code.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-sans text-[9px] font-bold uppercase tracking-wider bg-[#FFFFFF] border border-black/10 px-2 py-0.5 rounded text-black/70">
                      {cls.code}
                    </span>
                    <span className="font-sans text-[11px] font-semibold text-black/60">
                      {cls.time}
                    </span>
                  </div>
                  <h4 className="font-serif text-[19px] font-medium text-[#1A1A1A] group-hover:italic transition-all">
                    {cls.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 font-sans text-[12px] text-black/50 mt-2">
                    <span className="flex items-center gap-1.5 italic">
                      <span className="material-symbols-outlined text-[15px] text-black/40">location_on</span>
                      <span>{cls.room}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-black/40">person</span>
                      <span>{cls.prof}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => alert(`Directions to ${cls.room}: Take North Elevator to Floor 4.`)}
                  className="bg-[#FFFFFF] hover:bg-[#E8E4DE] text-[#1A1A1A] border border-black/15 px-4 py-2 rounded-md font-sans text-[10px] uppercase tracking-[0.15em] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">navigation</span>
                  <span>Location Map</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
