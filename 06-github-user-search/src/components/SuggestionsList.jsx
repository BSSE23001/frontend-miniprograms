import { motion, AnimatePresence } from 'framer-motion';

const SuggestionsList = ({suggestions, loading, onSelect}) => (
    <AnimatePresence>
        {
            (loading || suggestions.length > 0) && (
                <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                className='bg=gray-800 rounded p-4 space-y-4'
                >
                    {loading &&
                    <p className='animate-pulse'>Loading...</p>
                    }
                    {suggestions.map(user => (
                        <div
                        key={user.id}
                        onClick={() => onSelect(user)}
                        className='flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded'
                        >
                            <img src={user.avatar_url} alt='' className='w-8 h-8 rounded-full' />
                            <span>{user.login}</span>
                        </div>
                    ))}
                </motion.div>
            )
        }
    </AnimatePresence>
);

export default SuggestionsList;