import { useEffect, useState } from "react";

function PostViewer() {
    // There can be many posts to be listed so it must be an array
    const [posts, setPosts] = useState([]);

    // Loading is a UI functionality so the initaitor must only be a boolean
    const [loading, setLoading] = useState(true);

    // Mostly Error is an object
    const [error, setError] = useState(null);

    // Post can be selected to view its contents or do some operations on them like deletion
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(()=>{
        // NOTE anywhere in the function there is some work done by awaiting
        // the function must be declared as sync.
        const fetchPosts = async () => {
            try {
                // Initially we will see the loading UI
                setLoading(true);
                // Initially there is no error
                setError(null);

                // Fetching the data using fetch api
                const res = await fetch('https://jsonplaceholder.typicode.com/posts')

                // If response is not ok then the error is somewhat from HTTP connection
                if(!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                // Extracting data which will be an array. Its because we know what data will
                // be returned means we know that the array is being returned
                const data = await res.json();

                // Setting the data into the posts array
                setPosts(data);
            } catch (error) {
                // Catching and setting the error to display
                setError(error);
            } finally {
                // A the end we stop showin loading UI
                setLoading(false);
            }
        }
        // Above we only decalred the function and not called it so calling it yet
        fetchPosts();
    }, []); // Empty dependency array allows only one run

    useEffect(() => {
        if(selectedPostId === null) {
            setSelectedPost(null);
            return;
        }
        
        const fetchPostDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}`)
                if(!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setSelectedPost(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPostDetails();

    },[selectedPostId]);

    const renderContent = () => {
        if(loading && !selectedPostId) {
            return (
                <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                    <svg class="w-16 h-16 animate-spin text-gray-900/50" viewBox="0 0 64 64" fill="none"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                        </path>
                    </svg>
                    <h3>Loading....</h3>
                </div> 
            )
        }

        if (error) {
            return (
                <div role="alert" class="mt-3 relative flex w-full p-3 text-sm text-slate-600 rounded-md bg-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>    
                    {error}
                    <button class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-slate-200 active:bg-slate-200 absolute top-1.5 right-1.5" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-slate-600" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            )
        }

        if (posts.length === 0 && !loading) {
            return (
                <div className="flex ">
                    Sorry No posts till now.
                </div>
            )
        }

        return (
            <>
                <h2 className="text-3xl font-bold mb-6 text-slate-800">All Posts</h2>
                <div className="space-y-3 grid-auto-cols justify-self-center">
                    {posts.map(post => (
                        <div
                            key={post.id}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-sm transition cursor-pointer}`}
                            onClick={() => setSelectedPostId(post.id)}
                        >
                            <h3>{post.title}</h3>
                            <p>{post.body.substring(0,100)}</p>
                        </div>                        
                    ))}

                    {selectedPostId && (
                        <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                        {loading ? (
                            <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                                <svg class="w-16 h-16 animate-spin text-gray-900/50" viewBox="0 0 64 64" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                    <path
                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path
                                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                                    </path>
                                </svg>
                                <h3>Loading....</h3>
                            </div>
                        ) : error ? (
                            <div role="alert" class="mt-3 relative flex w-full p-3 text-sm text-slate-600 rounded-md bg-slate-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>    
                                {error}
                                <button class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-slate-200 active:bg-slate-200 absolute top-1.5 right-1.5" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-slate-600" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                        ) : selectedPost ? (
                            <div class="p-4">
                                <h5 class="mb-2 text-slate-800 text-xl font-semibold">
                                {selectedPost.title}
                                </h5>
                                <p class="text-slate-600 leading-normal font-light">
                                {selectedPost.body}
                                </p>
                                <button class="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                                onClick={() => setSelectedPostId(null)}>
                                Close Details
                                </button>
                            </div>
                        ) : null}
                        </div>
                    )}
                </div>
            </>
        )
    }

    return (
        <div className="container">
        {renderContent()}
        </div>
    );
}

export default PostViewer;