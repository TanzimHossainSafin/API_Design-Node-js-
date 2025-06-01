export default function Footer() {
    return (
        <footer className="w-full bg-[#111827] text-gray-400 py-4 px-8 border-t border-[#23272f] text-center text-sm">
            <span>
                &copy; {new Date().getFullYear()} <span className="text-blue-400 font-semibold">Tanzim</span> &mdash; All rights reserved.
            </span>
        </footer>
    )
}
