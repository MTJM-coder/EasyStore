import React, { useState } from 'react'
import { FiBarChart2, FiBell, FiBookmark, FiBox, FiChevronsDown, FiChevronsUp, FiCreditCard, FiDatabase, FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import Header from './Header'
import { FaStore } from 'react-icons/fa'
import { Link } from '@inertiajs/react'

const SideBarAdmin = ({ sidebarOpen, setSidebarOpen,active,setActive }) => {
    
    const handleLogout = function () {
        if (confirm("Etes-vous sur de vouloir vous deconnecter?")) {
            alert("disconnected!")
        }
    }

    const liens = [
        { id: 1, nom: "Tableau de bord", type: "administration", icon: <FiBarChart2></FiBarChart2>,lien:'/admin/dashboard' },
        { id: 2, nom: "Commercants", type: "administration", icon: <FaStore></FaStore>,lien:'/admin/commerces' },
        { id: 3, nom: "Abonnements", type: "administration", icon: <FiCreditCard></FiCreditCard>,lien:'/admin/abonnements' },
        { id: 4, nom: "Notifications", type: "systeme", icon: <FiBell></FiBell>,lien:'/admin/notifications'},
        { id: 5, nom: "Log & Audits", type: "systeme", icon: <FiBookmark></FiBookmark>,lien:'/admin/logs' },
        { id: 6, nom: "Parametres", type: "systeme", icon: <FiSettings></FiSettings>,lien:'/profile' }

    ]

    return (
        <div className={`relative`}>
            <div className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 border overflow-y-auto transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <p className='text-primary text-2xl font-bold py-3 ml-3'>EasyStore</p>
                <hr />
                <div className='flex items-center gap-3 py-3 px-3'>
                    <div className='flex justify-center items-center p-3  rounded-full bg-primary-darker'>
                        <span>JM</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='font-bold max-w-max inline-block'>Jaudel Merlando</span>
                        <span className='text-sm text-text-medium flex items-center gap-2'><FiUser></FiUser>Employé</span>
                    </div>
                </div>
                <hr />


                <div className='flex flex-col gap-1 mt-4'>
                    {/* Administration */}
                    <div className='w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer '>Administration</div>
                    {liens.filter(l => l.type == "administration").map(element =>
                    (
                        <Link
                            href={element.lien}
                            onClick={() => setActive(element.id)}
                            key={element.id} className={`w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer 
                            ${element.id == active ? 'bg-purple-400 text-white border-r-[3px] border-primary' : 'hover:bg-purple-100 duration-300  transition-all hover:text-primary'}`} >
                            <p className='text-2xl'>{element.icon}</p>
                            <p>{element.nom}</p>
                        </Link>
                    )
                    )}
                    {/* systeme */}
                    <div className='w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer '>Système</div>
                    {liens.filter(l => l.type == "systeme").map(element =>
                    (
                        <Link

                            href={element.lien}
                            onClick={() => setActive(element.id)}
                            key={element.id} className={`w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer 
                            ${element.id == active ? 'bg-purple-400 text-white border-r-[3px] border-primary' : 'hover:bg-purple-100 duration-300  transition-all hover:text-primary'}`} >
                            <p className='text-2xl'>{element.icon}</p>
                            <p>{element.nom}</p>
                        </Link>
                    )
                    )}
                    <hr />
                </div>
                <div className='py-2 flex items-center justify-center'>
                    <button onClick={() => handleLogout()} className='rounded-lg text-text-medium bg-white  flex items-center gap-4 border-[1.5px] border-gray-300 py-2 px-5  hover:border-red-600 hover:bg-red-200 hover:text-red-600'><FiLogOut></FiLogOut> Déconnexion</button>
                </div>
            </div>
        </div>
    )
}

export default SideBarAdmin