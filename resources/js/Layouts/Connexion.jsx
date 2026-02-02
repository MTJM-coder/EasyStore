import React from 'react'
import { FaKey } from 'react-icons/fa'
import { FiHome, FiKey, FiLock, FiMail, FiPhone, FiShoppingCart, FiUser, FiXOctagon } from 'react-icons/fi'
import { useEffect } from 'react'

const Register = ({showLogin,setShowLogin}) => {
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
    <div className='max-w-max shadow-lg rounded-2xl absolute bg-white top-10 left-96 z-50'>
        <div className='p-3'>
            <FiXOctagon className='text-2xl text-red-600 cursor-pointer' onClick={()=>setShowRegister(false)}></FiXOctagon>
            
        </div>
        
        <div className='flex flex-col gap-5 px-10 py-4'>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-text-medium' htmlFor="">Nom</label>
                    <div className='relative'>
                        <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiUser>
                        <input className='rounded-lg border pl-10  focus:border-primary-dark' required type="text" />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-text-medium' htmlFor="">Prénom</label>
                     <div className='relative'>
                        <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiUser>
                        <input className='rounded-lg border pl-10  focus:border-primary-dark' required type="text" />
                    </div>
                </div>
            </div>
         

            <div className='flex flex-col gap-2 w-full'>
                <label className='font-bold text-text-medium' htmlFor="">Email</label>
                <div className='relative'>
                    <FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiMail>
                    <input className='w-full rounded-lg border pl-10' placeholder="" type="Email" />
                 </div>
            </div>

            


             <div className='flex flex-col gap-2 w-ful'>
                <label className='font-bold text-text-medium'htmlFor="">Mot de passe</label>
                <div className='relative'>
                    <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-text-medium'></FiLock>
                
                    <input className='w-full pl-10 rounded-lg border' required type="Password" placeholder='minimun 08 carateres' />
                </div>
            </div>
           
            <div className=''>
                <button className='px-5 py-3 bg-primary text-white w-full rounded-lg border '>Créer mon compte Gratuitement</button>
            </div>

            <div>
                <span className=' text-medium'>Vous avez deja un compte ? <a className='text-primary' href="">Connectez-vous.</a></span>
            </div>
        </div>
    </div>
  )
}

export default Register