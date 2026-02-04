import React from 'react'
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
  return (
    <div className='relative'>
        <div className='w-full items-center flex fixed bg-white z-50 justify-between py-4 md:px-10 px-2'>
            <div className=''>
                <span className='text-primary-darker md:text-2xl text-xl font-bold'>EasyStore</span>
            </div>

            <div className=' clear-start flex gap-4'>
                <div className='min-w-max p-2 rounded-full text-white bg-primary'>
                    <span>JM</span>
                </div>
                <button  className='border md:px-10 px-5 rounded-lg text-text-medium cursor-pointer flex items-center gap-2 group hover:border-red-600 hover:bg-red-200 hover:text-red-600'> <FiLogOut></FiLogOut> Déconnexion</button>
            </div>

        </div>
    </div>
  )
}

export default Header