import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaChartLine, FaPercentage, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

interface CalculatorResult {
  year: number;
  investment: number;
  returns: number;
  total: number;
}

const ROICalculator: React.FC = () => {
  // Calculator state
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [annualROI, setAnnualROI] = useState<number>(7);
  const [years, setYears] = useState<number>(5);
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Calculate ROI whenever inputs change
  useEffect(() => {
    calculateROI();
  }, [initialInvestment, annualROI, years]);
  
  // Calculate investment growth over time
  const calculateROI = () => {
    let calculatedResults: CalculatorResult[] = [];
    let currentInvestment = initialInvestment;
    
    for (let year = 1; year <= years; year++) {
      const annualReturn = currentInvestment * (annualROI / 100);
      const yearEndTotal = currentInvestment + annualReturn;
      
      calculatedResults.push({
        year,
        investment: currentInvestment,
        returns: annualReturn,
        total: yearEndTotal
      });
      
      currentInvestment = yearEndTotal;
    }
    
    setResults(calculatedResults);
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-white">
        <div className="flex items-center mb-4">
          <FaCalculator className="text-2xl mr-3" />
          <h3 className="text-2xl font-bold">Investment ROI Calculator</h3>
        </div>
        <p className="text-amber-100">
          Calculate the potential returns on your agricultural investment with Harvest Brothers
        </p>
      </div>
      
      <div className="p-6">
        {/* Initial Investment Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <FaMoneyBillWave className="mr-2 text-amber-600" />
              <span>Initial Investment</span>
            </div>
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              $
            </span>
            <input
              type="number"
              min="1000"
              max="10000000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full pl-8 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                onClick={() => setInitialInvestment(initialInvestment - 1000)}
                disabled={initialInvestment <= 1000}
                className="h-full px-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setInitialInvestment(initialInvestment + 1000)}
                className="h-full px-2 text-gray-500 hover:text-gray-700"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {/* Annual ROI Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <FaPercentage className="mr-2 text-amber-600" />
              <span>Annual ROI (%)</span>
            </div>
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              min="1"
              max="15"
              value={annualROI}
              onChange={(e) => setAnnualROI(Number(e.target.value))}
              className="w-full pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
              %
            </span>
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="5"
              max="10"
              step="0.5"
              value={annualROI}
              onChange={(e) => setAnnualROI(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>7.5%</span>
              <span>10%</span>
            </div>
          </div>
        </div>
        
        {/* Years Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-amber-600" />
              <span>Investment Period (Years)</span>
            </div>
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              min="1"
              max="20"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 yr</span>
              <span>5 yrs</span>
              <span>10 yrs</span>
              <span>15 yrs</span>
            </div>
          </div>
        </div>
        
        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowResults(!showResults)}
          className="w-full py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center"
        >
          <FaChartLine className="mr-2" />
          {showResults ? 'Hide Results' : 'Show Results'}
        </motion.button>
        
        {/* Results Table */}
        {showResults && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-8"
          >
            <h4 className="text-lg font-semibold mb-4">Projected Investment Growth</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Value
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Annual Return
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result) => (
                    <tr key={result.year}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        Year {result.year}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {formatCurrency(result.investment)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">
                        +{formatCurrency(result.returns)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-amber-600 font-bold">
                        {formatCurrency(result.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Summary */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Investment Summary</h5>
              <p className="text-sm text-gray-600">
                An initial investment of <span className="font-semibold">{formatCurrency(initialInvestment)}</span> with a <span className="font-semibold">{annualROI}% annual return</span> would grow to approximately <span className="font-semibold text-amber-600">{formatCurrency(results[results.length - 1]?.total || 0)}</span> after {years} years.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Total growth: <span className="font-semibold text-green-600">{formatCurrency((results[results.length - 1]?.total || 0) - initialInvestment)}</span> ({Math.round(((results[results.length - 1]?.total || 0) / initialInvestment - 1) * 100)}% total return)
              </p>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 italic">
              Note: This calculator provides estimates based on a fixed annual return rate. Actual investment performance may vary.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;