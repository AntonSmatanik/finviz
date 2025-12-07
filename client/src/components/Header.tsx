import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "../assets/CloseIcon";
import MenuIcon from "../assets/MenuIcon";

const Header = () => {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems = [
		{ path: "/", label: "Search by Full Path" },
		{ path: "/search-by-name", label: "Search by Name" },
		{ path: "/tree", label: "Tree" },
		{ path: "/contact", label: "Contact" },
	];

	const isActive = (path: string) => location.pathname === path;

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isMenuOpen) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isMenuOpen]);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isMenuOpen]);

	return (
		<>
			<header className="bg-gray-800 shadow-md relative z-50">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<div className="flex-shrink-0">
							<Link to="/" className="text-2xl font-bold text-white">
								Finviz
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex space-x-8">
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
										isActive(item.path)
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white"
									}`}
								>
									{item.label}
								</Link>
							))}
						</nav>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<button
								type="button"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-expanded={isMenuOpen}
							>
								<span className="sr-only">Open main menu</span>
								{!isMenuOpen ? <MenuIcon /> : <CloseIcon />}
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Navigation - Full Screen Overlay */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-40 md:hidden">
					<div
						className="absolute inset-0 bg-black bg-opacity-50"
						onClick={() => setIsMenuOpen(false)}
					/>
					<nav className="absolute top-16 left-0 right-0 bg-gray-800 shadow-lg">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									onClick={() => setIsMenuOpen(false)}
									className={`block px-3 py-2 rounded-md text-base font-medium ${
										isActive(item.path)
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white"
									}`}
								>
									{item.label}
								</Link>
							))}
						</div>
					</nav>
				</div>
			)}
		</>
	);
};

export default Header;
