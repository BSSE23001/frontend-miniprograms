import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);

    const increment = ()=>{setCount(count+1)}
    const decrement = ()=>{setCount(count-1)}
    const reset = ()=>{setCount(0)}
    return (
        <div className="flex flex-col min-h-screen font-sans items-center box-border justify-center p-2 m-2 space-y-5 text-pink-900 text-lg bg-gray-200">
            <h1 className='text-lg text-purple-500 mb-2'>Simple Counter</h1>
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