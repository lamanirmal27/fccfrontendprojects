import { useState } from "react";

function App() {
  const [value, setValue] = useState<string>('0');
  const [evaluated, setEvaluated] = useState<boolean>(false);

  const handleClick = (num: string) => {
    // Define operators used in the calculator
    const operators = ['+', '-', 'x', '/'];

    // Handle behavior after evaluation
    if (evaluated) {
      if (operators.includes(num)) {
        // Start a new calculation with the result and the operator
        setValue(value + num);
        setEvaluated(false);
        return;
      } else if (num !== '=') {
        // Reset value if a number or decimal is pressed after evaluation
        setValue(num);
        setEvaluated(false);
        return;
      }
    }

    // Prevent multiple decimals in the current number
    if (num === '.') {
      const lastNumber = value.split(/[\+\-x\/]/).pop();
      if (lastNumber?.includes('.')) {
        return;
      }
    }

    // Evaluate the expression when "=" is clicked
    if (num === '=') {
      try {
        const result = eval(value.replace(/x/g, '*'));
        setValue(result.toString());
        setEvaluated(true);
      } catch {
        setValue('Error');
      }
      return;
    }

    // Handle operators
    if (operators.includes(num)) {
      if (num === '-') {
        // Append "-" to support unary minus
        setValue(value + num);
      } else {
        // Remove trailing operators and append the new operator (+, x, /)
        const newValue = value.replace(/[\+\-x\/]+$/, '');
        console.log(newValue);
        
        setValue(newValue + num);
      }
    } else {
      // Handle numbers and decimals
      setValue(value === '0' && num !== '.' ? num : value + num);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#c2c2d6]">
      <div className="h-auto w-[400px] bg-black">
        <div className="grid grid-cols-4 grid-rows-6 gap-1 p-4">
          <div id="display" className="col-span-4 h-12 text-right text-3xl px-2 bg-gray-200 rounded -mt-2 rounded-t-none">{value}</div>
          <button onClick={() => { setValue('0'); setEvaluated(false); }} id="clear" className="col-span-2 h-12 bg-gray-400 rounded">AC</button>
          <button onClick={() => handleClick('/')} id="divide" className="h-12 bg-orange-400 rounded">/</button>
          <button onClick={() => handleClick('x')} id="multiply" className="h-12 bg-orange-400 rounded">x</button>
          <button onClick={() => handleClick('7')} id="seven" className="h-12 bg-gray-300 rounded">7</button>
          <button onClick={() => handleClick('8')} id="eight" className="h-12 bg-gray-300 rounded">8</button>
          <button onClick={() => handleClick('9')} id="nine" className="h-12 bg-gray-300 rounded">9</button>
          <button onClick={() => handleClick('-')} id="subtract" className="h-12 bg-orange-400 rounded">-</button>
          <button onClick={() => handleClick('4')} id="four" className="h-12 bg-gray-300 rounded">4</button>
          <button onClick={() => handleClick('5')} id="five" className="h-12 bg-gray-300 rounded">5</button>
          <button onClick={() => handleClick('6')} id="six" className="h-12 bg-gray-300 rounded">6</button>
          <button onClick={() => handleClick('+')} id="add" className="h-12 bg-orange-400 rounded">+</button>
          <button onClick={() => handleClick('1')} id="one" className="h-12 bg-gray-300 rounded">1</button>
          <button onClick={() => handleClick('2')} id="two" className="h-12 bg-gray-300 rounded">2</button>
          <button onClick={() => handleClick('3')} id="three" className="h-12 bg-gray-300 rounded">3</button>
          <button onClick={() => handleClick('=')} id="equals" className="row-start-5 col-start-4 row-span-2 h-24 bg-red-600 rounded">=</button>
          <button onClick={() => handleClick('0')} id="zero" className="col-span-2 h-12 bg-gray-300 rounded">0</button>
          <button onClick={() => handleClick('.')} id="decimal" className="h-12 bg-gray-300 rounded">.</button>
        </div>
      </div>
    </div>
  );
}

export default App;