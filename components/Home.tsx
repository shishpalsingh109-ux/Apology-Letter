import React, { useState, useMemo } from 'react';
import { Heart, Frown, CheckCircle, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'idle' | 'happy' | 'sad'>('idle');
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Generate random configuration for floating hearts once
  const floatingHearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100%
      size: Math.random() * 30 + 20, // 20-50px
      duration: Math.random() * 1.5 + 1.5, // 1.5-3s
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360
    }));
  }, []);

  // Questions flow
  const questions = [
    { id: 1, text: "Apology accepted?" },
    { id: 2, text: "Can we go for that ice cream walk?" },
    { id: 3, text: "Can I be your Sweetcorn again?" },
    { id: 4, text: "Forgive me fully?" }
  ];

  const handleAnswer = (isYes: boolean) => {
    if (isYes) {
      setAnimationState('happy');
      // Wait for animation to finish before moving next
      setTimeout(() => {
        setAnimationState('idle');
        if (currentQIndex < questions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
        } else {
          setIsCompleted(true);
        }
      }, 2500); // Slightly longer for the gentle float
    } else {
      setAnimationState('sad');
      // Wait for animation to finish then reset (loop same question)
      setTimeout(() => {
        setAnimationState('idle');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] p-4 md:p-8 relative flex flex-col items-center overflow-x-hidden">
      
      {/* Background Music - Hidden YouTube Iframe */}
      {/* We use a 1px opacity-0 div instead of display:none to encourage browser to render and play */}
      <div className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none -z-10 overflow-hidden">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/_mwqXnTEHSc?autoplay=1&loop=1&playlist=_mwqXnTEHSc&controls=0&start=0" 
          title="Background Music" 
          allow="autoplay; encrypted-media"
          frameBorder="0"
        ></iframe>
      </div>

      {/* Happy Animation - Floating Hearts */}
      {animationState === 'happy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Soft background wash */}
          <div className="absolute inset-0 bg-pink-50/40 backdrop-blur-[2px] animate-in fade-in duration-500" />
          
          {/* Floating Hearts Particles */}
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute bottom-0 opacity-0"
              style={{
                left: `${heart.left}%`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                animation: `floatUp ${heart.duration}s ease-out forwards`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              <Heart 
                className="w-full h-full text-pink-500 fill-pink-500 drop-shadow-sm" 
                style={{ transform: `rotate(${heart.rotation}deg)` }}
              />
            </div>
          ))}

          {/* Central Message */}
          <div className="relative z-10 animate-in zoom-in duration-500 ease-out fill-mode-forwards">
             <div className="bg-white/95 px-10 py-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(236,72,153,0.3)] border border-pink-100 text-center transform hover:scale-105 transition-transform duration-300">
                <Heart className="w-16 h-16 text-pink-500 fill-pink-500 mx-auto animate-pulse" />
                <h2 className="text-3xl font-serif text-pink-600 font-bold mt-4 tracking-wide">Yay! ❤️</h2>
             </div>
          </div>
        </div>
      )}

      {/* Sad Animation */}
      {animationState === 'sad' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="text-center animate-[shake_0.5s_ease-in-out_infinite]">
            <Frown className="w-32 h-32 text-white/90 mx-auto drop-shadow-2xl" />
            <h2 className="text-4xl font-bold text-white mt-8 font-serif">Please... 🥺</h2>
          </div>
        </div>
      )}

      {/* Letter Content - Paper Card Style */}
      <div className="max-w-2xl w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 md:p-14 text-slate-700 space-y-7 leading-relaxed text-lg border border-slate-50 my-8 md:my-12 transition-all duration-500">
        
        {/* Header */}
        <div className="space-y-1 mb-10 border-b border-slate-50 pb-6">
            <p className="text-slate-500 text-sm mb-4 font-mono">To,</p>
            <p className="font-bold text-2xl text-slate-800">Dushman</p>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-slate-500 mt-2 pt-2">
                <p><span className="font-medium text-slate-700">Subject:</span> Apology letter</p>
                <p><span className="font-medium text-slate-700">Date:</span> 02/12/2025</p>
            </div>
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-6 font-serif">
          <p>
            I am SORRY for everything I did and for everything you have to go through because of me.
            I don’t know where to start from, fuck up itne krr rakhe h mne but kite na kite t to shuru krna e 
            pdega qki I never want to lose you ever again.
          </p>

          <p>
            Before you start reading this, I need you to recall all our happy memories together and m kosish kru 
            ga ki isme bhi koi gyan na pelu but yo t shayad mere basic nature m e h, which is not something I am 
            really proud of and I am trying to be better, to be better for us.
          </p>

          <p>
            Mere pure din ka best time hoya krta vo jb hum sham n mila krte vee beshak t chai 5 min hoti chai 
            adha ghnta, you are my stress pill ek dose chaiye hove h daily, er jbb va nahi mili to meri stress 
            accumulate hoti chali gyi er uss chakr m tere POV t dekh e nahi paya chija n er fer ek dum fat gya 
            gubhara, mere t yaad bhi na ki gusse m frestration m kitni mean baat krdi jo ki tnne bhi mera h m 
            mean nahi krra unne and YES I was being SELFISH and I am SORRY for that.
          </p>

          <p>
            Now I want to make up for all the fuck ups I did, all I need is a chance to change, to be better, to 
            understand you better.
          </p>

          <p>
            Un t mne already bera h but in kuch dina m orr bhi jyada realise hogi ki tere bina life kaatni pdegi jiyi 
            na jave.
          </p>

          <p className="font-semibold text-slate-800 italic">
            My Life will never be life without you.
          </p>

          <p>
            Mere around kuch h e nahi issa jise dekh k teri yaad na aave er itne din t tu thave h mne nind t, m 
            soya e rhu vo jyada bdia h agar aakh khule piche tu reality m na h to.
          </p>

          <p>
            Tera Sweetcorn khatr ldna miss krr rhya hu yrr.
          </p>

          <p>
            Er walk krte krte Icrecream khana bhi.
          </p>

          <p className="font-medium text-xl mt-8 text-slate-800">
            Please forgive me.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-12 pt-8">
            <p className="font-bold text-lg text-slate-800 font-serif">Dushman</p>
            <p className="text-slate-400 text-sm mt-1">(I need a new nickname)</p>
        </div>

        {/* Video Embed */}
        <div className="mt-12 border-t border-slate-50 pt-10">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm bg-slate-50 ring-1 ring-slate-100">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/av632_7PCzU" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Interactive Questions Section */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center justify-center min-h-[200px]">
          {!isCompleted ? (
            <div className={`text-center space-y-8 w-full transition-opacity duration-300 ${animationState !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Question {currentQIndex + 1}</span>
                <h3 className="text-3xl md:text-4xl font-serif text-slate-800 font-medium">
                  {questions[currentQIndex].text}
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4">
                 <button 
                  onClick={() => handleAnswer(true)}
                  className="group relative px-8 py-3 bg-slate-800 text-white rounded-full font-medium text-lg hover:bg-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto min-w-[140px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Yes <Heart size={18} className="group-hover:text-red-300 transition-colors" />
                  </span>
                 </button>

                 <button 
                  onClick={() => handleAnswer(false)}
                  className="group px-8 py-3 bg-white border border-slate-200 text-slate-500 rounded-full font-medium text-lg hover:bg-slate-50 hover:text-slate-600 transition-all duration-300 w-full sm:w-auto min-w-[140px]"
                 >
                   No
                 </button>
              </div>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in duration-500 space-y-6 flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-2 shadow-sm">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-3xl font-serif text-slate-800 font-bold mb-2">Thank you!</h3>
                <p className="text-slate-500">I promise to be better.</p>
              </div>
              
              <a 
                href="https://wa.me/918570069686?text=I%20forgive%20you"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#25D366] text-white rounded-full font-medium text-lg hover:bg-[#128C7E] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-6"
              >
                <MessageCircle size={20} />
                Send Message on WhatsApp
              </a>
            </div>
          )}
        </div>

      </div>

      {/* Tailwind Custom Keyframes */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(5deg); }
        }
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;