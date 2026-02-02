import React from 'react'
import { FaKey } from 'react-icons/fa'
import { FiHome, FiKey, FiLock, FiMail, FiPhone, FiShoppingCart, FiUser, FiXOctagon } from 'react-icons/fi'
import { useEffect } from 'react'

const Register = ({ showRegister, setShowRegister,showLogin,setShowLogin }) => {
    useEffect(() => {
        if (showRegister) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            //   document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showRegister])

    if (!showRegister) return null


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg relative">
                <button onClick={() => setShowRegister(false)} className="absolute top-4 right-4 text-red-600 text-2xl">
                    <FiXOctagon />
                </button>



                <div className='flex flex-col gap-2 px-10 py-4  overflow-auto'>
                    <div className='flex md:flex-row flex-col md:gap-5 gap-2'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label className='font-bold text-text-medium' htmlFor="">Nom & prénom</label>
                            <div className='relative'>
                                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiUser>
                                <input className='w-full rounded-lg border pl-10  focus:border-primary-dark' required type="text" />
                            </div>
                        </div>
                        {/* <div className='md:flex flex-col gap-2  hidden'>
                            <label className='font-bold text-text-medium' htmlFor="">Prénom</label>
                            <div className='relative'>
                                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiUser>
                                <input className='w-full rounded-lg border pl-10  focus:border-primary-dark' required type="text" />
                            </div>
                        </div> */}
                    </div>


                    <div className='flex flex-col gap-2 w-full'>
                        <label className='font-bold text-text-medium' htmlFor="">Email</label>
                        <div className='relative'>
                            <FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiMail>
                            <input className='w-full rounded-lg border pl-10' placeholder="" type="Email" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label className='font-bold text-text-medium' htmlFor="">Téléphone</label>
                        <div className='relative '>
                            <FiPhone className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiPhone>

                            <input className='w-full rounded-lg border pl-10' placeholder='' type="tel" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label className='font-bold text-text-medium' htmlFor="">Nom du commerce</label>
                        <div className='relative'>
                            <FiHome className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiHome>
                            <input className='w-full pl-10 rounded-lg border' placeholder='' required type="text" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-ful'>
                        <label className='font-bold text-text-medium' htmlFor="">Mot de passe</label>
                        <div className='relative'>
                            <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiLock>

                            <input className='w-full pl-10 rounded-lg border' required type="Password" placeholder='minimun 08 carateres' />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='border-2 border-x-text-medium w-1/12'></div>
                        <p className='text-text-medium md:text-xl text-xs'>En vous inscrivant, vous acceptez nos CGU</p>
                        <div className='border-2 border-x-text-medium w-1/12'></div>
                    </div>
                    <div className=''>
                        <button className='px-5 py-3 bg-primary text-white w-full rounded-lg border md:text-xl text-xs  '>Créer mon compte Gratuitement</button>
                    </div>

                    <div>
                        <span className='cursor-pointer text-medium' onClick={()=>{setShowRegister(false),setShowLogin(true)}}>Vous avez deja un compte ? <span className='text-primary' >Connectez-vous.</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register