import { useEffect } from "react";
import InputSwap from "./components/InputSwap";
import particlesConfig from "./particlesConfig.json";

declare global {
  interface Window {
    particlesJS: (elementId: string, config: object) => void;
  }
}

const App = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", particlesConfig);
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-[#B8DB80] via-[#F7F6D3] to-[#A8DF8E] p-4 sm:p-6">
      <div id="particles-js" className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            Swap anytime, anywhere!
          </h1>
        </div>

        <InputSwap />
      </div>
    </div>
  );
};

export default App;
