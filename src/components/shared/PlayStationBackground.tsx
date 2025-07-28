import { useModeStore } from '../../store/modeStore';

export default function PlayStationBackground() {
  const { currentMode } = useModeStore();

  return (
    <div className="fixed inset-0 -z-10">
      {/* Ana arka plan - Çok koyu siyah tonu */}
      <div className="absolute inset-0 bg-black" style={{ backgroundColor: '#0A0A0A' }}></div>

      {currentMode === 'programming' ? (
        <>
          {/* Programlama modu - Çoklu katmanlı ışık hüzmesi dalgası */}
          <div className="absolute programming-light-wave"></div>
          <div className="absolute programming-light-wave-inner"></div>
          <div className="absolute programming-light-wave-core"></div>
        </>
      ) : (
        <>
          {/* İnşaat modu - Çoklu katmanlı ışık hüzmesi dalgası */}
          <div className="absolute civil-light-wave"></div>
          <div className="absolute civil-light-wave-inner"></div>
          <div className="absolute civil-light-wave-core"></div>
        </>
      )}

      {/* Tailwind CSS ve özel animasyonlar için stil bloğu */}
      <style>
        {`
        /* Işık hüzmesi dalgası animasyonu - Daha toplu ve sınırlı */
        @keyframes light-wave-animation {
          0% {
            transform: translate(-50%, -50%) scale(0.7) rotate(0deg);
            opacity: 0.6;
          }
          16.66% {
            transform: translate(-51%, -49%) scale(0.9) rotate(60deg);
            opacity: 0.8;
          }
          33.33% {
            transform: translate(-50%, -50%) scale(0.8) rotate(120deg);
            opacity: 0.7;
          }
          50% {
            transform: translate(-49%, -51%) scale(1.0) rotate(180deg);
            opacity: 0.9;
          }
          66.66% {
            transform: translate(-50%, -50%) scale(0.75) rotate(240deg);
            opacity: 0.6;
          }
          83.33% {
            transform: translate(-51%, -49%) scale(0.85) rotate(300deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.7) rotate(360deg);
            opacity: 0.6;
          }
        }

        /* İç dalga animasyonu - Daha toplu */
        @keyframes inner-wave-animation {
          0% {
            transform: translate(-50%, -50%) scale(0.5) rotate(180deg);
            opacity: 0.4;
          }
          25% {
            transform: translate(-49%, -51%) scale(0.7) rotate(270deg);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(0.6) rotate(360deg);
            opacity: 0.5;
          }
          75% {
            transform: translate(-51%, -49%) scale(0.65) rotate(90deg);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.5) rotate(180deg);
            opacity: 0.4;
          }
        }

        /* Çekirdek dalga animasyonu - En toplu */
        @keyframes core-wave-animation {
          0% {
            transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
            opacity: 0.3;
          }
          33.33% {
            transform: translate(-50.5%, -49.5%) scale(0.5) rotate(120deg);
            opacity: 0.6;
          }
          66.66% {
            transform: translate(-49.5%, -50.5%) scale(0.4) rotate(240deg);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.3) rotate(360deg);
            opacity: 0.3;
          }
        }

        /* Programlama ve İnşaat modları için ışık hüzmesi dalgasının temel stilleri - Daha büyük */
        .programming-light-wave,
        .civil-light-wave {
          position: absolute;
          width: 50vw; /* Daha büyük genişlik */
          height: 50vh; /* Daha büyük yükseklik */
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          filter: blur(80px); /* Daha fazla bulanıklık */
          animation: light-wave-animation 30s infinite ease-in-out;
          pointer-events: none;
          transition: background-image 2.5s ease-in-out, opacity 2.5s ease-in-out;
        }

        /* İç dalga katmanı - Daha büyük */
        .programming-light-wave-inner,
        .civil-light-wave-inner {
          position: absolute;
          width: 35vw; /* Daha büyük */
          height: 35vh; /* Daha büyük */
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          filter: blur(60px); /* Daha fazla bulanıklık */
          animation: inner-wave-animation 20s infinite ease-in-out;
          pointer-events: none;
          transition: background-image 2.5s ease-in-out, opacity 2.5s ease-in-out;
        }

        /* Çekirdek dalga katmanı - Daha büyük */
        .programming-light-wave-core,
        .civil-light-wave-core {
          position: absolute;
          width: 20vw; /* Daha büyük */
          height: 20vh; /* Daha büyük */
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px); /* Daha fazla bulanıklık */
          animation: core-wave-animation 15s infinite ease-in-out;
          pointer-events: none;
          transition: background-image 2.5s ease-in-out, opacity 2.5s ease-in-out;
        }

        /* Programlama modu için Tailwind config'ten tüm renkleri kullan */
        .programming-light-wave {
          background-image: 
            radial-gradient(circle at 15% 15%, rgb(16 185 129 / 0.9) 0%, rgb(16 185 129 / 0.5) 45%, transparent 75%),
            radial-gradient(circle at 85% 85%, rgb(139 92 246 / 0.9) 0%, rgb(139 92 246 / 0.5) 45%, transparent 75%),
            radial-gradient(circle at 50% 50%, rgb(59 130 246 / 1.0) 0%, rgb(59 130 246 / 0.6) 55%, transparent 85%),
            radial-gradient(circle at 10% 90%, rgb(236 72 153 / 0.8) 0%, rgb(236 72 153 / 0.4) 40%, transparent 70%),
            radial-gradient(circle at 90% 10%, rgb(16 185 129 / 0.8) 0%, rgb(16 185 129 / 0.4) 45%, transparent 75%),
            radial-gradient(circle at 25% 75%, rgb(139 92 246 / 0.7) 0%, rgb(139 92 246 / 0.2) 35%, transparent 65%),
            radial-gradient(circle at 75% 25%, rgb(5 150 105 / 0.8) 0%, rgb(5 150 105 / 0.3) 40%, transparent 70%),
            radial-gradient(circle at 40% 60%, rgb(31 41 55 / 0.6) 0%, rgb(31 41 55 / 0.1) 30%, transparent 60%),
            radial-gradient(circle at 60% 40%, rgb(15 15 15 / 0.7) 0%, rgb(15 15 15 / 0.2) 35%, transparent 65%),
            radial-gradient(circle at 30% 70%, rgb(107 114 128 / 0.5) 0%, rgb(107 114 128 / 0.1) 25%, transparent 55%);
        }

        .programming-light-wave-inner {
          background-image: 
            radial-gradient(circle at 25% 25%, rgb(16 185 129 / 1.0) 0%, rgb(16 185 129 / 0.6) 55%, transparent 85%),
            radial-gradient(circle at 75% 75%, rgb(139 92 246 / 1.0) 0%, rgb(139 92 246 / 0.6) 55%, transparent 85%),
            radial-gradient(circle at 50% 50%, rgb(59 130 246 / 1.0) 0%, rgb(59 130 246 / 0.7) 65%, transparent 95%),
            radial-gradient(circle at 15% 85%, rgb(236 72 153 / 0.9) 0%, rgb(236 72 153 / 0.5) 50%, transparent 80%),
            radial-gradient(circle at 85% 15%, rgb(5 150 105 / 0.9) 0%, rgb(5 150 105 / 0.5) 50%, transparent 80%),
            radial-gradient(circle at 35% 65%, rgb(31 41 55 / 0.7) 0%, rgb(31 41 55 / 0.2) 35%, transparent 65%),
            radial-gradient(circle at 65% 35%, rgb(15 15 15 / 0.8) 0%, rgb(15 15 15 / 0.3) 40%, transparent 70%),
            radial-gradient(circle at 45% 55%, rgb(107 114 128 / 0.6) 0%, rgb(107 114 128 / 0.1) 25%, transparent 55%);
        }

        .programming-light-wave-core {
          background-image: 
            radial-gradient(circle at 50% 50%, rgb(16 185 129 / 1.0) 0%, rgb(16 185 129 / 0.8) 75%, transparent 95%),
            radial-gradient(circle at 50% 50%, rgb(59 130 246 / 1.0) 0%, rgb(59 130 246 / 0.8) 75%, transparent 95%),
            radial-gradient(circle at 50% 50%, rgb(139 92 246 / 0.9) 0%, rgb(139 92 246 / 0.6) 65%, transparent 85%),
            radial-gradient(circle at 50% 50%, rgb(5 150 105 / 0.9) 0%, rgb(5 150 105 / 0.6) 65%, transparent 85%),
            radial-gradient(circle at 50% 50%, rgb(31 41 55 / 0.8) 0%, rgb(31 41 55 / 0.5) 60%, transparent 80%),
            radial-gradient(circle at 50% 50%, rgb(15 15 15 / 0.8) 0%, rgb(15 15 15 / 0.5) 60%, transparent 80%),
            radial-gradient(circle at 50% 50%, rgb(107 114 128 / 0.7) 0%, rgb(107 114 128 / 0.4) 55%, transparent 75%);
        }

        /* İnşaat modu için Tailwind config'ten tüm renkleri kullan */
        .civil-light-wave {
          background-image: 
            radial-gradient(circle at 15% 15%, rgb(217 119 6 / 0.9) 0%, rgb(217 119 6 / 0.5) 45%, transparent 75%),
            radial-gradient(circle at 85% 85%, rgb(245 158 11 / 0.9) 0%, rgb(245 158 11 / 0.5) 45%, transparent 75%),
            radial-gradient(circle at 50% 50%, rgb(245 158 11 / 1.0) 0%, rgb(245 158 11 / 0.6) 55%, transparent 85%),
            radial-gradient(circle at 10% 90%, rgb(254 243 199 / 0.8) 0%, rgb(254 243 199 / 0.4) 40%, transparent 70%),
            radial-gradient(circle at 90% 10%, rgb(245 158 11 / 0.8) 0%, rgb(245 158 11 / 0.4) 45%, transparent 75%),
            radial-gradient(circle at 25% 75%, rgb(217 119 6 / 0.7) 0%, rgb(217 119 6 / 0.2) 35%, transparent 65%),
            radial-gradient(circle at 75% 25%, rgb(75 85 99 / 0.6) 0%, rgb(75 85 99 / 0.1) 30%, transparent 60%),
            radial-gradient(circle at 40% 60%, rgb(15 15 15 / 0.7) 0%, rgb(15 15 15 / 0.2) 35%, transparent 65%),
            radial-gradient(circle at 60% 40%, rgb(156 163 175 / 0.5) 0%, rgb(156 163 175 / 0.1) 25%, transparent 55%),
            radial-gradient(circle at 30% 70%, rgb(245 158 11 / 0.6) 0%, rgb(245 158 11 / 0.2) 35%, transparent 65%);
        }

        .civil-light-wave-inner {
          background-image: 
            radial-gradient(circle at 25% 25%, rgb(217 119 6 / 1.0) 0%, rgb(217 119 6 / 0.6) 55%, transparent 85%),
            radial-gradient(circle at 75% 75%, rgb(245 158 11 / 1.0) 0%, rgb(245 158 11 / 0.6) 55%, transparent 85%),
            radial-gradient(circle at 50% 50%, rgb(245 158 11 / 1.0) 0%, rgb(245 158 11 / 0.7) 65%, transparent 95%),
            radial-gradient(circle at 15% 85%, rgb(254 243 199 / 0.9) 0%, rgb(254 243 199 / 0.5) 50%, transparent 80%),
            radial-gradient(circle at 85% 15%, rgb(75 85 99 / 0.7) 0%, rgb(75 85 99 / 0.2) 35%, transparent 65%),
            radial-gradient(circle at 35% 65%, rgb(15 15 15 / 0.8) 0%, rgb(15 15 15 / 0.3) 40%, transparent 70%),
            radial-gradient(circle at 65% 35%, rgb(156 163 175 / 0.6) 0%, rgb(156 163 175 / 0.1) 25%, transparent 55%),
            radial-gradient(circle at 45% 55%, rgb(245 158 11 / 0.7) 0%, rgb(245 158 11 / 0.3) 40%, transparent 70%);
        }

        .civil-light-wave-core {
          background-image: 
            radial-gradient(circle at 50% 50%, rgb(217 119 6 / 1.0) 0%, rgb(217 119 6 / 0.8) 75%, transparent 95%),
            radial-gradient(circle at 50% 50%, rgb(245 158 11 / 1.0) 0%, rgb(245 158 11 / 0.8) 75%, transparent 95%),
            radial-gradient(circle at 50% 50%, rgb(245 158 11 / 0.9) 0%, rgb(245 158 11 / 0.6) 65%, transparent 85%),
            radial-gradient(circle at 50% 50%, rgb(75 85 99 / 0.8) 0%, rgb(75 85 99 / 0.5) 60%, transparent 80%),
            radial-gradient(circle at 50% 50%, rgb(15 15 15 / 0.8) 0%, rgb(15 15 15 / 0.5) 60%, transparent 80%),
            radial-gradient(circle at 50% 50%, rgb(156 163 175 / 0.7) 0%, rgb(156 163 175 / 0.4) 55%, transparent 75%),
            radial-gradient(circle at 50% 50%, rgb(254 243 199 / 0.8) 0%, rgb(254 243 199 / 0.5) 60%, transparent 80%);
        }
        `}
      </style>
    </div>
  );
}
