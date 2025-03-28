import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState('');

  // Efecto para recalcular automáticamente cuando cambian los números o la operación
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
    // Solo actualiza la operación si es diferente a la actual
    if (operation !== op) {
      setOperation(op);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Calculadora</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Número 1:</label>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ingrese primer valor"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Número 2:</label>
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
  );
}

export default App;