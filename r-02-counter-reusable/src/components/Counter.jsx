import { useState } from 'react'

// Note Props is an Object so the function will have and object as a parameter
function Counter({init_val=0,step=1,title='Generic Counter'}) {
    const [count, setCount] = useState(init_val);

    // The setter function of useState can update state directly
    // as well as can take the function to update as follows
    // const increment = ()=>{setCount(count+1)} -> Unpdating Directly

    const increment = ()=>{setCount(prev => prev+step)}
    const decrement = ()=>{setCount(prev => prev-step)}
    const reset = ()=>{setCount(init_val)}
    return (
        <div className="flex flex-col font-sans items-center justify-center p-2 m-2 border-1 border-pink-100 b-gray-50 shadow-lg">
            <h1 className='text-2xl text-purple-500 mb-2'>{title}</h1>
            <p className='text-5xl font-bold mb-3 border-2 border-pink-200 p-5 rounded-2xl bg-gray-50 shadow-lg'>Count: {count}</p>
            <div class="row flex">
            <button
                class="rounded-md rounded-r-none bg-slate-800 py-2 px-4 border-2 border-slate-500 text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={increment}
            >
                Increment
            </button>
            <button
                class="rounded-none bg-slate-800 py-2 px-4 border-2 border-l-0 border-r-0 border-slate-500 text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={decrement}
            >
                Decrement
            </button>
            <button
                class="rounded-md rounded-l-none bg-slate-800 py-2 px-4 border-2 border-slate-500 text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={reset}
            >
                Reset
            </button>
            </div>
        </div>
    );
}

export default Counter;