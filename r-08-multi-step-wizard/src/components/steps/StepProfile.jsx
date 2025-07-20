import { useEffect, useRef, useState } from 'react';
import {useOnboarding, useOnboardingDispatch} from '../OnboardingProvider';
import {motion, AnimatePresence} from 'framer-motion';

const StepProfile = ({onNext}) => {
    const { profile } = useOnboarding();
    const dispatch = useOnboardingDispatch();

    const [form, setForm] = useState(profile);
    const [errors, setErrors] = useState({});

    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current.focus();
    },[]);

    const validate = () => {
        const err = {};
        if(!form.name || form.name.length < 2) err.name = "Name at least 2 chars";
        if(!form.age || isNaN(form.age) || form.age < 10) err.age = "Age must be >= 10";
        if(!form.email || !/^\S+@\S+.\S+$/.test(form.email)) err.email = "Invalid Email";
        return err;
    };

    const handleNext = () => {
        const err = validate();
        setErrors(err);
        if(Object.keys(err).length === 0) {
            dispatch({ type: "SET_PROFILE", payload: form });
            onNext();
        }
    };

    return (
        <div className='bg-slate-800 p-6 space-y-4'>
            <h2 className='text-2xl font-bold mb-2'>Profile Info</h2>
            <div>
                <input
                ref={nameInputRef}
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Name"
                className={`w-full p-3 rounded ${errors.name ? 'border border-red-500' : ''}`}
                />
                <AnimatePresence>
                {errors.name && (
                    <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-red-400"
                    >
                    {errors.name}
                    </motion.p>
                )}
                </AnimatePresence>
            </div>

            <div>
                <input
                type="number"
                value={form.age}
                onChange={e => setForm({...form, age: e.target.value})}
                placeholder="Age"
                className={`w-full p-3 rounded ${errors.age ? 'border border-red-500' : ''}`}
                />
                <AnimatePresence>
                {errors.age && (
                    <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-red-400"
                    >
                    {errors.age}
                    </motion.p>
                )}
                </AnimatePresence>
            </div>

            <div>
                <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="Email"
                className={`w-full p-3 rounded ${errors.email ? 'border border-red-500' : ''}`}
                />
                <AnimatePresence>
                {errors.email && (
                    <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-red-400"
                    >
                    {errors.email}
                    </motion.p>
                )}
                </AnimatePresence>
            </div>

            <div className="flex justify-end space-x-2">
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

export default StepProfile;