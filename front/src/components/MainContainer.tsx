export default function MainContainer({ children }) {
    return (
        <main className="flex justify-between bg-gray-100 sm:px-10 gap-x-10 min-h-screen">
            {children}
        </main>
    );
}
