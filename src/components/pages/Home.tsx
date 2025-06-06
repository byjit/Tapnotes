export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4">Welcome to Nano Agent Builder</h1>
            <p className="text-lg mb-8">
                Build and manage your nano agents with ease.
            </p>
            <a
                href="/builder"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Get Started
            </a>
        </div>
    );
};
