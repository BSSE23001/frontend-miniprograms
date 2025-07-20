import { useState } from "react";
import {motion, AnimatePresence} from 'framer-motion';
import StepProfile from './steps/StepProfile';
import StepIncomeExpenses from './steps/StepIncomeExpenses';
import StepGoals from './steps/StepGoals';
import StepSummary from './steps/StepSummary';

const steps = [
    StepProfile,
    StepIncomeExpenses,
    StepGoals,
    StepSummary
];

const Wizard = () => {
    const [stepIndex, setStepIndex] = useState(0);

    const StepComponent = steps[stepIndex];

    return (
        <div className="w-full max-w-lg">
            <div className="mb-4 h-3 bg-gray-700 rounded overflow-hidden">
                <motion.div
                initial={{width:0}}
                animate={{width: `${(stepIndex + 1) / steps.length * 100}%` }}
                className="h-full bg-green-500"
                transition={{ duration: .5 }}
                />
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                key={stepIndex}
                initial={{x:300, opacity:0}}
                animate={{x:0, opacity:1}}
                exit={{x:300, opacity:0}}
                transition={{type: "spring", stiffness: 300, damping: 30}}
                >
                    <StepComponent
                    onNext={() => setStepIndex(i => Math.min(i+1, steps.length-1))}
                    onBack={() => setStepIndex(i => Math.max(i-1,0))}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Wizard;