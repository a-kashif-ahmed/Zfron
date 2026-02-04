import React from "react";

function Footer() {
    return (

        <footer class="bg-white shadow-sm dark:bg-black mt-7 ">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py- text-center">
                <div class="sm:flex sm:items-center sm:justify-between ">
                    
                        
                        <span class="  self-center text-2xl font-semibold whitespace-nowrap dark:text-white mr-auto ">ZOCOSTO</span>
                    
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        
                        <li>
                            <a href="/products" class="hover:underline me-4 md:me-6">Products</a>
                        </li><li>
                            <a href="/about" class="hover:underline me-4 md:me-6">Contact us</a>
                        </li>
                        
                        {/* <li>
                            <a href="/av/login" class="hover:underline me-4 md:me-6">Vendor </a>
                        </li> */}
                        {/* <li>
                            <a href="/about" class="hover:underline">Contact</a>
                        </li> */}
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-white-700 lg:my-8" />
                <span class="block text-sm text-white-900 sm:text-center dark:text-white">© 2025 ZOCOSTO™. All Rights Reserved.</span>
                <br/>
                <p className="block text-sm text-white-900 sm:text-center dark:text-gray-300"><a href="https://www.linkedin.com/in/a-kashif-ahmed/" target="_blank" className="text-white-200">Developer</a></p>
            </div>
        </footer>


    )
}


export default Footer;