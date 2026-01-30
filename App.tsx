
import React, { useState } from 'react';
import { AverageCalculator } from './components/AverageCalculator';
import { PriceComparisonCalculator } from './components/PriceComparisonCalculator';
import { CalculatorIcon } from './components/icons/CalculatorIcon';
import { ScaleIcon } from './components/icons/ScaleIcon';

type CalculatorMode = 'average' | 'comparison';

// FIX: Moved TabButton component outside of the App component.
// Defining components inside other components is an anti-pattern in React that can lead
// to performance issues, state loss, and potential typing errors like the one being fixed.
const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-3 px-4 text-sm md:text-base font-semibold rounded-t-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2 ${
            active
                ? 'bg-white text-indigo-600'
                : 'bg-slate-100 text-gray-500 hover:bg-slate-200'
        }`}
    >
        {children}
    </button>
);

const App: React.FC = () => {
    const [mode, setMode] = useState<CalculatorMode>('average');

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">เครื่องคิดเลขอรรถประโยชน์</h1>
                    <p className="text-gray-600 mt-2">เครื่องมือช่วยคำนวณในชีวิตประจำวัน</p>
                </header>
                
                <div className="bg-white rounded-xl shadow-lg">
                    <div className="flex border-b border-gray-200 relative">
                        <TabButton active={mode === 'average'} onClick={() => setMode('average')}>
                            <CalculatorIcon className="w-5 h-5" />
                            <span>หาค่าเฉลี่ย</span>
                        </TabButton>
                        <TabButton active={mode === 'comparison'} onClick={() => setMode('comparison')}>
                           <ScaleIcon className="w-5 h-5" />
                            <span>เปรียบเทียบราคา</span>
                        </TabButton>
                         <div
                            className={`absolute bottom-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-in-out`}
                            style={{
                                width: '50%',
                                left: mode === 'average' ? '0' : '50%',
                            }}
                        />
                    </div>
                    
                    <div className="p-6 md:p-8">
                        {mode === 'average' && <AverageCalculator />}
                        {mode === 'comparison' && <PriceComparisonCalculator />}
                    </div>
                </div>
                 <footer className="text-center mt-8 text-gray-500 text-sm">
                    <p>สร้างสรรค์ด้วย React & Tailwind CSS</p>
                </footer>
            </div>
        </div>
    );
};

export default App;