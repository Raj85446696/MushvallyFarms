import React from 'react'
import { useNavigate } from "react-router-dom";
function Footor() {
     const navigate = useNavigate();
    return (
        <>
            <footer className="bg-[#3e2f26] text-[#f3ede2] py-14 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                    {/* About */}
                    <div className="md:w-1/3">
                        <h3 className="font-bold text-xl mb-6">Mushvalley Farms</h3>
                        <p className="text-[#b7c6a0] mb-4">
                            Merging nature and innovation to bring you the finest mushroom-based products sustainably crafted since 2025.
                        </p>
                        <p>© 2025 Mushvalley Farms. All rights reserved.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:w-1/3">
                        <h4 className="font-semibold mb-6">Quick Links</h4>
                        <ul>
                            <li className="mb-2 hover:text-[#d9b382] cursor-pointer" onClick={()=>navigate('/')}>Home</li>
                            <li className="mb-2 hover:text-[#d9b382] cursor-pointer" onClick={()=>navigate('/aboutus')}>About Us</li>
                            <li className="mb-2 hover:text-[#d9b382] cursor-pointer" onClick={()=>navigate('/ourblog')}>Blog</li>
                            <li className="mb-2 hover:text-[#d9b382] cursor-pointer" onClick={()=>navigate('/ourproduct')}>Our Products</li>
                            <li className="mb-2 hover:text-[#d9b382] cursor-pointer" onClick={()=>console.log('hy')}>Contact</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:w-1/3">
                        <h4 className="font-semibold mb-6">Newsletter</h4>
                        <p className="text-[#b7c6a0] mb-4">Subscribe to get the latest updates and offers.</p>
                        <form className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="rounded px-4 py-2 flex-grow text-[#3e2f26]"
                            />
                            <button
                                type="submit"
                                className="bg-[#d9b382] text-[#3e2f26] font-semibold px-6 py-2 rounded hover:bg-[#b7c6a0]"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footor