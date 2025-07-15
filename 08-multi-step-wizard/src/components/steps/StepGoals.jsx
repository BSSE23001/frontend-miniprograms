import { useOnboarding, useOnboardingDispatch } from '../OnboardingProvider';
import { AnimatePresence, motion } from 'framer-motion';

const allGoals = [
  { id: 'house', icon: '🏠', label: 'Buy a house' },
  { id: 'travel', icon: '✈️', label: 'Travel the world' },
  { id: 'car', icon: '🚗', label: 'New car' },
  { id: 'retire', icon: '🧓', label: 'Retire early' },
  { id: 'education', icon: '🎓', label: 'Education fund' },
];

const StepGoals = ({onNext, onBack}) => {
    const {goals} = useOnboarding();
    const dispatch = useOnboardingDispatch();

    const toggleGoal = (id) => {
        const newGoals = goals.includes(id)
        ? goals.filter(g => g !== id)
        : [...goals, id];
        dispatch({ type: "SET_GOALS", payload: newGoals });
    };
    
    return (
    <div className="bg-slate-800 p-6 rounded space-y-6">
      <h2 className="text-2xl font-bold mb-2">Your Goals</h2>
      <div className='grid grid-cols-2 gap-4'>
        {allGoals.map(goal => (
            <motion.div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            whileTap={{scale: .95}}
            className={`cursor-pointer p-4 rounded border-2
                ${goals.includes(goal.id)
                    ? 'border-green-500 bg-green-800/30'
                    : 'border-gray-600'}`}
            >
                <div className='text-4xl mb-2'>{goal.icon}</div>
                <div>{goal.label}</div>
            </motion.div>
        ))}
      </div>
        <div className="flex justify-between">
            <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
            >
            Back
            </button>
            <button
            onClick={onNext}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            >
            Next
            </button>
        </div>
    </div>
    );
}

export default StepGoals;
