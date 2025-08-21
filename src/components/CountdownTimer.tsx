import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

export default function CountdownTimer() {
  const weddingDate = new Date("2026-02-05T00:00:00").getTime();

  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <div className="w-full">
        <FlipClockCountdown
          to={weddingDate}
          labels={['DAYS', 'HOURS', 'MINS', 'SECS']}
          labelStyle={{
            fontSize: 'clamp(8px, 2vw, 18px)',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: '#be185d',
            letterSpacing: '0.02em'
          }}
          digitBlockStyle={{
            width: 'clamp(28px, 8vw, 70px)',
            height: 'clamp(40px, 12vw, 90px)',
            fontSize: 'clamp(24px, 4.5vw, 42px)',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(135deg, #be185d 0%, #9f1239 100%)',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
          dividerStyle={{
            color: '#be185d',
            height: 1
          }}
          separatorStyle={{
            color: '#be185d',
            size: 'clamp(3px, 1.5vw, 8px)'
          }}
          duration={0.8}
          className="flip-clock-wedding"
          spacing={{
            clock: 'clamp(4px, 2vw, 18px)',
            digitBlock: 'clamp(1px, 0.5vw, 4px)'
          }}
        >
          <div className="text-center p-3 sm:p-4 md:p-6">
            <div className="text-base sm:text-lg md:text-xl font-bold text-rose-800 mb-1 sm:mb-2">
              🎉 The Big Day is Here! 🎉
            </div>
            <div className="text-xs sm:text-sm md:text-base text-rose-600">
              Time to celebrate our love!
            </div>
          </div>
        </FlipClockCountdown>
      </div>
    </div>
  );
}
