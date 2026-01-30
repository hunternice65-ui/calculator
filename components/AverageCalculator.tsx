
import React, { useState, useCallback } from 'react';

export const AverageCalculator: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = useCallback(() => {
        setResult(null);
        setError(null);

        if (!input.trim()) {
            setError('กรุณาป้อนตัวเลขอย่างน้อยหนึ่งตัว');
            return;
        }

        const numbers = input
            .trim()
            .split(/[\s,]+/)
            .filter(n => n !== '')
            .map(n => parseFloat(n.replace(/,/g, ''))); 

        const validNumbers = numbers.filter(n => !isNaN(n));

        if (validNumbers.length === 0) {
            setError('ไม่พบตัวเลขที่ถูกต้องในข้อมูลที่ป้อน');
            return;
        }
        
        if (validNumbers.length !== numbers.length) {
            setError('ข้อมูลบางส่วนไม่ใช่ตัวเลขที่ถูกต้อง แต่จะคำนวณจากตัวเลขที่ถูกต้องเท่านั้น');
        }

        const sum = validNumbers.reduce((acc, curr) => acc + curr, 0);
        const average = sum / validNumbers.length;
        setResult(average);
    }, [input]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">คำนวณหาค่าเฉลี่ย</h2>
                <p className="text-gray-500 mt-1">ป้อนตัวเลขโดยคั่นด้วยเครื่องหมายจุลภาค (,) หรือเว้นวรรค</p>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="numbers-input" className="block text-sm font-medium text-gray-700 sr-only">
                        ชุดตัวเลข
                    </label>
                    <textarea
                        id="numbers-input"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="เช่น 10, 25.5, 30, 15"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleCalculate}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 active:scale-100"
                >
                    คำนวณ
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm">
                    <p>{error}</p>
                </div>
            )}
            
            {result !== null && (
                <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-md text-center">
                    <p className="text-sm">ค่าเฉลี่ยคือ:</p>
                    <p className="text-3xl font-bold">{result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</p>
                </div>
            )}
        </div>
    );
};
