import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <nav className="w-full bg-[#111827] border-b border-[#23272f] px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-extrabold text-blue-500 tracking-tight select-none">
                    Hola
                </Link>
              
                {isLoggedIn && (
                    <Link
                        to="/restaurant"
                        className="ml-2 px-4 py-2"
                    >
                        Restaurant
                    </Link>
                )}
            </div>
            <div className="flex items-center gap-3">
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:from-orange-600 hover:to-orange-800 transition cursor-pointer"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to="/signup"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:from-blue-600 hover:to-blue-800 transition"
                        >
                            Join now
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:from-blue-600 hover:to-blue-800 transition "
                        >
                            Login
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
