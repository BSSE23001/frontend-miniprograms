import { useEffect, useState } from 'react';
import {useOnboarding, useOnboardingDispatch} from '../OnboardingProvider';

const animateValue = (start, end, duration, cb) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if(!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        cb(Math.floor(progress*(end-start) + start));
        if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const StepIncomeExpenses = ({onNext, onBack}) => {
    const {finances} = useOnboarding();
    const dispatch = useOnboardingDispatch();

    const [income, setIncome] = useState(finances.income);
    const [expenses, setExpenses] = useState(finances.expenses);

    const [animatedIncome, setAnimatedIncome] = useState(income);
    const [animatedExpenses, setAnimatedExpenses] = useState(expenses);

    useEffect(() => {
        animateValue(animatedIncome,income,500, setAnimatedIncome);
    },[income]);

    useEffect(() => {
        animateValue(animatedExpenses,expenses,500, setAnimatedExpenses);
    },[expenses]);

    const handleNext = () => {
        dispatch({ type: "SET_FINANCES", payload: {income, expenses} });
        onNext();
    }

    return (
        <div className='bg-slate-800 p-6 rounded space-y-4'>
            <h2 className='text-2xl font-bold mb-2'>Your Finances</h2>
            <div>
                <label className="block mb-1">Monthly Income: ${animatedIncome}</label>
                <input
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={income}
                onChange={e => setIncome(Number(e.target.value))}
                className="w-full"
                />
            </div>
            <div>
                <label className="block mb-1">Monthly Expenses: ${animatedExpenses}</label>
                <input
                type="range"
                min="500"
                max="9000"
                step="100"
                value={expenses}
                onChange={e => setExpenses(Number(e.target.value))}
                className="w-full"
                />
            </div>
            <div className="flex justify-between">
                <button
                onClick={onBack}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                >
                Back
                </button>
                <button
                onClick={handleNext}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                >
                Next
                </button>
            </div>
        </div>
    );
}

export default StepIncomeExpenses;