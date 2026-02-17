import React, { useState } from 'react'
import { FiBarChart, FiBarChart2, FiBox, FiChevronsDown, FiChevronsUp, FiCreditCard, FiDatabase, FiLogOut, FiSettings, FiTruck, FiUser, FiUsers } from 'react-icons/fi'
import Header from './Header'

const SideBarBoss = ({ sidebarOpen, setSidebarOpen, active, setActive }) => {
    // const [active, setActive] = useState(1)
    const handleLogout = function () {
        if (confirm("Etes-vous sur de vouloir vous deconnecter?")) {
            alert("disconnected!")
        }
    }

    const liens = [
        { id: 1, nom: "Tableau de bord", type: "vue d'ensemble", icon: <FiBarChart2></FiBarChart2>},
        { id: 2, nom: "Consulter le stock",type: "stock", icon: <FiBox></FiBox> },
        { id: 3, nom: "Entrée en stock",type: "stock", icon: <FiChevronsDown></FiChevronsDown> },
        { id: 4, nom: "Sortie de stock",type: "stock", icon: <FiChevronsUp></FiChevronsUp> },
        { id: 5, nom: "Générer un rapport",type: "rapport", icon: <FiBarChart></FiBarChart> },
        { id: 6, nom: "Historique",type: "rapport", icon: <FiDatabase></FiDatabase> },
        { id: 7, nom: "Parametre",type: "parametre", icon: <FiSettings></FiSettings> },
        { id: 8, nom: "Produit",type: "gestion", icon:<FiBox></FiBox>},
        { id: 9, nom: "Fournisseur", type: "gestion",icon:<FiTruck></FiTruck>},
        { id: 10, nom: "Employe", type:"gestion",icon:<FiUsers></FiUsers>},
        { id: 11,nom: "Abonnement",type: "parametre",icon:<FiCreditCard></FiCreditCard>}

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
                    {/* vu d'ensemble */}
                    <div className='w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer '>Vu d'ensemble</div>
                    {liens.filter(l=>l.type=="vue d'ensemble").map(element =>
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
                    {/* Gestion */}
                    <div className='w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer '>Gestion</div>
                    {liens.filter(l=>l.type=="gestion").map(element =>
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
                    {/* Rapports */}
                    <div className='w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer '>Rapport</div>
                    {liens.filter(l=>l.type=="rapport").map(element =>
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

                    {/* parametre */}

                    <div className='w-full flex items-center gap-3  px-5 py-4 text-text-medium cursor-pointer '>Parametre</div>
                    {liens.filter(l=>l.type=="parametre").map(element =>
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

export default SideBarBoss