import { useOnboarding, useOnboardingDispatch } from '../OnboardingProvider';
import confetti from 'canvas-confetti';
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const StepSummary = ({onBack}) => {
    const {profile, finances, goals} = useOnboarding();
    const dispatch = useOnboardingDispatch();

    const remaining = finances.income - finances.expenses;
    const savingsRate = Math.max(0, remaining) / finances.income * 100;

    const data = {
        labels: ['Expenses', 'Savings'],
        datasets: [{
            data: [finances.income, remaining],
            backgroundColor: ['#ef4444', '#22c55e'],
            borderWidth: 1
        }]
    };

    const handleFinish = () => {
        confetti({ particleCount: 200, spread: 70 });
        dispatch({ type: 'RESET' });
    };


    return (
        <div className="bg-slate-800 p-6 rounded space-y-6">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Age:</strong> {profile.age}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                </div>

                <div>
                    <p><strong>Monthly Income:</strong> ${finances.income}</p>
                    <p><strong>Monthly Expenses:</strong> ${finances.expenses}</p>
                    <p><strong>Estimated Savings Rate:</strong> {savingsRate.toFixed(1)}%</p>
                </div>

                <div>
                    <p><strong>Goals:</strong> {goals.length > 0 ? goals.join(', ') : 'None selected'}</p>
                </div>

                <div className='max-w-xs mx-auto'>
                    <Doughnut data={data}/>
                </div>

                <div className="flex justify-between">
                    <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                    >
                    Back
                    </button>
                    <button
                    onClick={handleFinish}
                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                    >
                    Finish
                    </button>
                </div>
        </div>
    );
}

export default StepSummary;