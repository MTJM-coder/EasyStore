import React, { useState } from 'react'
import { FiBarChart2, FiBox, FiChevronsDown, FiChevronsUp, FiDatabase, FiLogOut, FiUser } from 'react-icons/fi'
import Header from './Header'

const SidebarEmploye = ({ sidebarOpen, setSidebarOpen }) => {
    const [active, setActive] = useState(1)
    const handleLogout = function () {
        if (confirm("Etes-vous sur de vouloir vous deconnecter?")) {
            alert("disconnected!")
        }
    }

    const liens = [
        { id: 1, nom: "Tableau de bord", icon: <FiBarChart2></FiBarChart2> },
        { id: 2, nom: "Consulter le stock", icon: <FiBox></FiBox> },
        { id: 3, nom: "Entrée en stock", icon: <FiChevronsDown></FiChevronsDown> },
        { id: 4, nom: "Sortie de stock", icon: <FiChevronsUp></FiChevronsUp> },
        { id: 5, nom: "Historique", icon: <FiDatabase></FiDatabase> },
        { id: 6, nom: "Mon Profil", icon: <FiUser></FiUser> }

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
                    {liens.map(element =>
                    (
                        <div

                            onClick={() => setActive(element.id)}
                            key={element.id} className={`w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer 
                            ${element.id == active ? 'bg-purple-400 text-white border-r-[3px] border-primary' : 'hover:bg-purple-100 duration-300  transition-all hover:text-primary'}`} >
                            <p className='text-2xl'>{element.icon}</p>
                            <p>{element.nom}</p>
                        </div>
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

export default SidebarEmploye