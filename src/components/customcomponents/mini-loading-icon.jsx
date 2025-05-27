export default function MiniLoadingIcon() {

    return (
        <div className="flex items-center justify-center h-1/6 bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
    );
}