import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import confetti from 'canvas-confetti';
import {AnimatePresence, motion} from 'framer-motion';
import * as yup from 'yup';

// Defining the yup object schema
const schema = yup.object({
    name: yup.string()
            .required("Name is Required")
            .min(3,"At least 3 characters"),
    email: yup.string()
            .required("Email is required")
            .email("Must be valid"),
    password: yup.string()
                .required("Password required")
                .min(6, "Min 6 chars"),
    confirmPassword: yup.string()
                        .oneOf([yup.ref("password")], "Password must match")
                        .required("Confirm your password"),
    acceptTerms: yup.boolean()
                    .oneOf([true], "You must accept terms")
});

const SignUpForm = () => {
    const {
        register, handleSubmit, formState: {errors, isSubmitting}, reset, setFocus
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const onSubmit = async data => {
        // Here we are only simulating a dummy api call
        await new Promise(resolve => setTimeout(resolve, 2000));
        confetti({ particleCount: 150, spread: 70 });
        reset();
    };

    const onError = () => {
        const firstError = Object.keys(errors)[0];
        if(firstError) setFocus(firstError);
    };

    return (
        <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className='bg-slate-800 p-8 rounded max-w-md w-full space-y-4'
        >
            <div>
                <input
                {...register('name')}
                placeholder='Name'
                className={`w-full p-3 rounded ${errors.name ? 'border border-red-500' : ''}`}
                />
                <AnimatePresence>
                    {errors.name && (
                        <motion.p
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -10}}
                        className='text-red-400'
                        >
                            {errors.name.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div>
                <input
                {...register('email')}
                placeholder='Email'
                className={`w-full p-3 rounded ${errors.email ? 'border border-red-500' : ''}`}
                />
                <AnimatePresence>
                    {errors.email && (
                        <motion.p
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -10}}
                        className='text-red-400'
                        >
                            {errors.email.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div>
                <input
                type='password'
                {...register('password')}
                placeholder='Password'
                className={`w-full p-3 rounded ${errors.password ? 'border border-red-500' : ''}`}
                />
                <AnimatePresence>
                    {errors.password && (
                        <motion.p
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -10}}
                        className='text-red-400'
                        >
                            {errors.password.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div>
                <input
                type='password'
                {...register('confirmPassword')}
                placeholder='Confirm Password'
                className={`w-full p-3 rounded ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                />
                <AnimatePresence>
                    {errors.confirmPassword && (
                        <motion.p
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -10}}
                        className='text-red-400'
                        >
                            {errors.confirmPassword.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div className='flex items-center space-x-2'>
                <input
                type='checkbox'
                {...register('acceptTerms')}
                />
                <span>I accept the terms</span>
                <AnimatePresence>
                    {errors.acceptTerms && (
                        <motion.p
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -10}}
                        className='text-red-400'
                        >
                            {errors.acceptTerms.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <button
            type='submit'
            disabled={isSubmitting}
            className='w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50'
            >
                {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
        </form>
    );

}

export default SignUpForm;