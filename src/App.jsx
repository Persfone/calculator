import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState('');
  const [showImages, setShowImages] = useState(false);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  // URLs de ejemplo para imágenes y sonido (reemplaza con tus propios archivos)
  const soundUrl = 'public/coscu.mp3';
  const imageUrls = [
    'public/sorpresa1.png',
    'public/sorpresa2.jpeg',
    'public/palfri.png'
  ];

  useEffect(() => {
    if (operation && num1 && num2) {
      const n1 = parseFloat(num1);
      const n2 = parseFloat(num2);
      
      if (isNaN(n1) || isNaN(n2)) {
        setResult('Ingresa números válidos');
        return;
      }

      let res;
      switch(operation) {
        case 'add':
          res = n1 + n2;
          break;
        case 'subtract':
          res = n1 - n2;
          break;
        case 'multiply':
          res = n1 * n2;
          break;
        case 'divide':
          res = n2 !== 0 ? n1 / n2 : 'Error: división por cero';
          break;
        default:
          return;
      }
      
      setResult(res);
    }
  }, [num1, num2, operation]);

  const handleOperationClick = (op) => {
    // Reiniciar todo al hacer clic en cualquier operación
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setShowImages(true);
    
    // Reiniciar y reproducir el audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Error al reproducir audio:", e));
    }
    
    // Ocultar imágenes después de 5 segundos
    timeoutRef.current = setTimeout(() => {
      setShowImages(false);
    }, 14000);
    
    // Actualizar la operación
    setOperation(op);
  };

  return (
    <div className="relative min-h-full">
      {/* Audio oculto */}
      <audio ref={audioRef} src={soundUrl} />
      
      {/* Imágenes que aparecen al hacer clic */}
      {showImages && (
        <>
          <img 
            src={imageUrls[0]} 
            alt="Imagen 1" 
            className="absolute top-10 left-10 w-50 h-50 z-10 animate-bounce"
          />
          <img 
            src={imageUrls[1]} 
            alt="Imagen 2" 
            className="absolute top-1/2 right-20 w-40 h-40 z-10 animate-spin"
          />
          <img 
            src={imageUrls[2]} 
            alt="Imagen 3" 
            className="absolute -bottom-52 left-20 w-50 h-50 z-0 animate-pulse"
          />
        </>
      )}
      
      {/* Calculadora centrada */}
      <div className="max-w-md mx-auto pt-10 p-6 bg-transparent rounded-lg">
        <h1 className="block font-bold text-white font-serif text-5xl text-center">CalculaDOUra</h1>
        
        <div className="mb-4">
          <label className="block text-white font-serif mb-2 text-xl">Número 1:</label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese primer valor"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white font-serif mb-2 text-xl">Número 2:</label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese segundo valor"
          />
        </div>
        
        <div className="flex space-x-2 mb-6">
          <button 
            onClick={() => handleOperationClick('add')} 
            className={`flex-1 py-2 px-4 rounded ${
              operation === 'add' 
                ? 'bg-blue-700 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Suma
          </button>
          <button 
            onClick={() => handleOperationClick('subtract')} 
            className={`flex-1 py-2 px-4 rounded ${
              operation === 'subtract' 
                ? 'bg-green-700 text-white' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Resta
          </button>
          <button 
            onClick={() => handleOperationClick('multiply')} 
            className={`flex-1 py-2 px-4 rounded ${
              operation === 'multiply' 
                ? 'bg-yellow-700 text-white' 
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            Producto
          </button>
          <button 
            onClick={() => handleOperationClick('divide')} 
            className={`flex-1 py-2 px-4 rounded ${
              operation === 'divide' 
                ? 'bg-red-700 text-white' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            División
          </button>
        </div>
        
        <div className="p-4 bg-white rounded border">
          <h2 className="text-lg font-semibold mb-2">Resultado:</h2>
          <p className="text-xl">
            {result !== '' ? result : 'Seleccione una operación'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;