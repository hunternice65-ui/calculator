
import React, { useState, useCallback } from 'react';

interface Item {
    price: string;
    quantity: string;
}

const ItemInput = ({ item, setItem, label }: { item: Item; setItem: React.Dispatch<React.SetStateAction<Item>>; label: string; }) => {
    return (
         <div className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50">
            <h3 className="font-semibold text-gray-700">{label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor={`price-${label}`} className="block text-sm font-medium text-gray-600">
                        ราคา (บาท)
                    </label>
                    <input
                        type="number"
                        id={`price-${label}`}
                        min="0"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="เช่น 100"
                        value={item.price}
                        onChange={(e) => setItem({ ...item, price: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor={`quantity-${label}`} className="block text-sm font-medium text-gray-600">
                        ปริมาณ (หน่วย)
                    </label>
                    <input
                        type="number"
                        id={`quantity-${label}`}
                        min="0.0001"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="เช่น 500 (กรัม, มล.)"
                        value={item.quantity}
                        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};

interface ResultData {
    message: string;
    unitPriceA: number;
    unitPriceB: number;
}

const ResultDisplay = ({ resultData }: { resultData: ResultData }) => {
    const formatCurrency = (value: number) => value.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 4 });

    return (
         <div className="p-4 bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-md text-center">
            <p className="text-xl font-bold mb-4">{resultData.message}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                 <div className={`p-3 rounded-lg border ${resultData.unitPriceA <= resultData.unitPriceB ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'}`}>
                    <p className="font-semibold text-gray-800">สินค้าชิ้นที่ 1</p>
                    <p className="text-gray-600 text-sm">ราคาต่อหน่วย: <span className="font-bold text-lg text-green-700">{formatCurrency(resultData.unitPriceA)}</span> บาท</p>
                </div>
                <div className={`p-3 rounded-lg border ${resultData.unitPriceB <= resultData.unitPriceA ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'}`}>
                     <p className="font-semibold text-gray-800">สินค้าชิ้นที่ 2</p>
                     <p className="text-gray-600 text-sm">ราคาต่อหน่วย: <span className="font-bold text-lg text-green-700">{formatCurrency(resultData.unitPriceB)}</span> บาท</p>
                </div>
            </div>
        </div>
    )
};

export const PriceComparisonCalculator: React.FC = () => {
    const [itemA, setItemA] = useState<Item>({ price: '', quantity: '' });
    const [itemB, setItemB] = useState<Item>({ price: '', quantity: '' });
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCompare = useCallback(() => {
        setResultData(null);
        setError(null);

        const priceA = parseFloat(itemA.price);
        const quantityA = parseFloat(itemA.quantity);
        const priceB = parseFloat(itemB.price);
        const quantityB = parseFloat(itemB.quantity);

        if (isNaN(priceA) || isNaN(quantityA) || isNaN(priceB) || isNaN(quantityB)) {
            setError('กรุณากรอกข้อมูลราคาทั้งหมดและปริมาณให้ครบถ้วน');
            return;
        }

        if (quantityA <= 0 || quantityB <= 0) {
            setError('ปริมาณต้องมากกว่า 0');
            return;
        }
        
        if (priceA < 0 || priceB < 0) {
            setError('ราคาต้องไม่เป็นค่าติดลบ');
            return;
        }

        const unitPriceA = priceA / quantityA;
        const unitPriceB = priceB / quantityB;

        let message = ``;
        if (unitPriceA < unitPriceB) {
            message = `🎉 สินค้าชิ้นที่ 1 คุ้มค่ากว่า!`;
        } else if (unitPriceB < unitPriceA) {
            message = `🎉 สินค้าชิ้นที่ 2 คุ้มค่ากว่า!`;
        } else {
            message = `⚖️ สินค้าทั้งสองชิ้นมีราคาต่อหน่วยเท่ากัน`;
        }
        
        setResultData({ message, unitPriceA, unitPriceB });
    }, [itemA, itemB]);

    return (
        <div className="space-y-6 animate-fade-in">
             <div>
                <h2 className="text-2xl font-bold text-gray-800">เปรียบเทียบความคุ้มค่า</h2>
                <p className="text-gray-500 mt-1">กรอกราคาและปริมาณของสินค้าสองชิ้นเพื่อดูว่าชิ้นไหนถูกกว่า</p>
            </div>
            
            <div className="space-y-4">
                <ItemInput item={itemA} setItem={setItemA} label="สินค้าชิ้นที่ 1" />
                <div className="text-center text-gray-500 font-bold">VS</div>
                <ItemInput item={itemB} setItem={setItemB} label="สินค้าชิ้นที่ 2" />
            </div>

            <button
                onClick={handleCompare}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 active:scale-100"
            >
                เปรียบเทียบ
            </button>
            
            {error && (
                <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm">
                    <p>{error}</p>
                </div>
            )}

            {resultData && <ResultDisplay resultData={resultData} />}
        </div>
    );
};
