import React from 'react'


const Footer = () => {
    return (
        <footer className='bg-black text-white px-6 md:px-16 lg:px-24 pt-14 pb-8 mt-20 border-t border-gray-800'>

            {/* Top Section */}
            <div className='flex flex-col md:flex-row justify-between gap-12'>

                {/* Brand */}
                <div className='max-w-xl'>

                    <h1 className='text-3xl font-bold text-red-500'>
                        ShowSphere
                    </h1>

                    <p className='text-gray-400 mt-4 leading-7'>
                        Your ultimate destination for booking movie tickets,
                        exploring latest trailers, and enjoying cinema like never before.
                    </p>

                </div>

                {/* Contact */}
                <div className='md:text-right'>

                    <h2 className='text-xl font-semibold mb-5'>
                        Contact
                    </h2>

                    <div className='space-y-3 text-gray-400'>

                        <p>
                            IIT (ISM) Dhanbad
                        </p>

                        <p>
                            showsphere@gmail.com
                        </p>

                        <p>
                            +91 6207982584
                        </p>

                        <a
                            href="https://github.com/rathorrajput16/ShowSphere"
                            target="_blank"
                            rel="noreferrer"
                            className='flex md:justify-end items-center gap-2 hover:text-white transition'
                        >
                           
                            GitHub
                        </a>

                    </div>

                </div>

            </div>

            {/* Bottom */}
            <div className='border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm'>

                © 2026 ShowSphere. All Rights Reserved.

            </div>

        </footer>
    )
}

export default Footer