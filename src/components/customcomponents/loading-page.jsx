export default function LoadingPage() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
    );
}