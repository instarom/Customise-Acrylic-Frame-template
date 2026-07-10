import React, { useState, useEffect } from 'react';
import { FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState(0);

  // Define different timezones
  const timezones = [
    { name: 'New York (EST)', offset: -5, code: 'EST' },
    { name: 'London (GMT)', offset: 0, code: 'GMT' },
    { name: 'Paris (CET)', offset: 1, code: 'CET' },
    { name: 'Dubai (GST)', offset: 4, code: 'GST' },
    { name: 'India (IST)', offset: 5.5, code: 'IST' },
    { name: 'Bangkok (ICT)', offset: 7, code: 'ICT' },
    { name: 'Tokyo (JST)', offset: 9, code: 'JST' },
    { name: 'Sydney (AEDT)', offset: 11, code: 'AEDT' },
    { name: 'Los Angeles (PST)', offset: -8, code: 'PST' },
    { name: 'Singapore (SGT)', offset: 8, code: 'SGT' },
    { name: 'Hong Kong (HKT)', offset: 8, code: 'HKT' },
    { name: 'Seoul (KST)', offset: 9, code: 'KST' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeForTimezone = (offset) => {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const timeInTimezone = new Date(utc + 3600000 * offset);
    return timeInTimezone;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrevious = () => {
    setSelectedTimezone((prev) => (prev === 0 ? timezones.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedTimezone((prev) => (prev === timezones.length - 1 ? 0 : prev + 1));
  };

  const currentTz = timezones[selectedTimezone];
  const tzTime = getTimeForTimezone(currentTz.offset);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiClock className="text-5xl text-blue-400" />
            <h1 className="text-5xl font-bold text-white">World Clock</h1>
          </div>
          <p className="text-gray-300 text-lg">Real-time across multiple time zones</p>
        </div>

        {/* Main Clock Display */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 mb-12 border border-blue-500/30">
          {/* Timezone Selector */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevious}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all transform hover:scale-110"
            >
              <FiChevronLeft className="text-2xl" />
            </button>

            <div className="text-center flex-1">
              <h2 className="text-4xl font-bold text-blue-300 mb-2">
                {currentTz.name}
              </h2>
              <p className="text-gray-400 text-sm">
                {formatDate(tzTime)}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all transform hover:scale-110"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>

          {/* Digital Clock Display */}
          <div className="text-center mb-8">
            <div className="inline-block bg-black rounded-2xl p-8 border-4 border-blue-500 shadow-xl">
              <div className="text-7xl font-mono font-bold text-cyan-400 tracking-widest">
                {formatTime(tzTime)}
              </div>
              <div className="text-2xl text-blue-300 font-mono mt-4">
                UTC {currentTz.offset > 0 ? '+' : ''}{currentTz.offset}
              </div>
            </div>
          </div>

          {/* Timezone Info */}
          <div className="text-center text-gray-300">
            <p className="text-sm">Timezone Code: <span className="font-bold text-blue-300">{currentTz.code}</span></p>
          </div>
        </div>

        {/* All Timezones Grid */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">All Time Zones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timezones.map((tz, index) => {
              const tzTime = getTimeForTimezone(tz.offset);
              const isSelected = index === selectedTimezone;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedTimezone(index)}
                  className={`p-4 rounded-xl transition-all transform hover:scale-105 ${
                    isSelected
                      ? 'bg-blue-600 border-2 border-blue-300 shadow-xl'
                      : 'bg-gray-800 border-2 border-gray-700 hover:border-blue-500'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-sm text-gray-300 font-semibold mb-2">
                      {tz.name}
                    </div>
                    <div className={`text-3xl font-mono font-bold ${
                      isSelected ? 'text-white' : 'text-blue-300'
                    }`}>
                      {formatTime(tzTime)}
                    </div>
                    <div className={`text-xs mt-2 ${
                      isSelected ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      UTC {tz.offset > 0 ? '+' : ''}{tz.offset}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">All times update in real-time • Click any timezone to focus</p>
        </div>
      </div>

      {/* Analog Clock for Current Selection */}
      <AnalogClock time={tzTime} timezone={currentTz.name} />
    </div>
  );
};

// Analog Clock Component
const AnalogClock = ({ time, timezone }) => {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="mt-12 flex justify-center">
      <div className="text-center">
        <h4 className="text-white text-lg font-semibold mb-4">Analog Clock - {timezone}</h4>
        <div className="relative w-64 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl border-8 border-blue-500">
          {/* Clock face */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x = 110 * Math.cos(angle - Math.PI / 2);
              const y = 110 * Math.sin(angle - Math.PI / 2);
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-300 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                />
              );
            })}

            {/* Hour hand */}
            <div
              className="absolute w-2 h-24 bg-blue-300 rounded-full origin-bottom"
              style={{
                left: '50%',
                bottom: '50%',
                transform: `translateX(-50%) rotate(${hourDegrees}deg)`,
                width: '6px',
                height: '60px'
              }}
            />

            {/* Minute hand */}
            <div
              className="absolute bg-cyan-300 rounded-full origin-bottom"
              style={{
                left: '50%',
                bottom: '50%',
                transform: `translateX(-50%) rotate(${minuteDegrees}deg)`,
                width: '4px',
                height: '75px'
              }}
            />

            {/* Second hand */}
            <div
              className="absolute bg-red-400 rounded-full origin-bottom"
              style={{
                left: '50%',
                bottom: '50%',
                transform: `translateX(-50%) rotate(${secondDegrees}deg)`,
                width: '2px',
                height: '80px'
              }}
            />

            {/* Center dot */}
            <div className="absolute w-4 h-4 bg-blue-400 rounded-full" />
          </div>

          {/* Numbers */}
          {[...Array(12)].map((_, i) => {
            const number = i === 0 ? 12 : i;
            const angle = (i * 30) * (Math.PI / 180);
            const x = 95 * Math.cos(angle - Math.PI / 2);
            const y = 95 * Math.sin(angle - Math.PI / 2);
            return (
              <div
                key={i}
                className="absolute text-blue-200 font-bold text-lg"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
              >
                {number}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
