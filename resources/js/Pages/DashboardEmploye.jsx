import SidebarEmploye from '@/Layouts/SidebarEmploye'
import React from 'react'
import { FaCoins, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave } from 'react-icons/fa'
import { FiArrowUpRight, FiBox, FiCalendar, FiAlertTriangle, FiArrowDownRight, FiThumbsDown, FiDownloadCloud, FiUploadCloud, FiArchive } from 'react-icons/fi'

const DashboardEmploye = () => {
    const date = new Date()
    const dateFormatee = date.toLocaleDateString('fr-FR', {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const Alertes = [
        { prodit: "Huile vegetal 1L", niveau: "Stock faible", Description: 'seuil de réapprovisionnement atteint', reste: 12 },
        { produit: "Riz parfumé 25kg", niveau: "Stock critique", Description: "en dessous du seuil minimum", reste: 8 },
        { produit: "Lait concentré NIDO 400g", niveau: "Stock faible", Description: "réapprovisionnement recommandé", reste: 8 },
        { produit: "Savon de Marseille", niveau: "", Description: "Proche du seuil de réapprovisionnement", reste: 15 },
        { produit: "Sucre en poudre 1kg", niveau: "Rupture imminente", Description: "Acton Urgente requise", reste: 1 }
    ]
    return (
        <div>
            <div className='flex bg-secondary'>
                <SidebarEmploye></SidebarEmploye>
                <div className='relative md:ml-64 bg-secondary max-w-max mb-20'>
                    <div className='fixed flex items-center w-full gap-5 pl-5 md:pr-64 justify-between bg-white p-5'>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl'>Tableau de bord</h1>
                            <p className='text-text-medium'>Vue d'ensemble de votre activité et du stock</p>
                        </div>
                        <p className='flex gap-3 items-center border border-primary-dark bg-purple-200 text-primary px-5 md:py-2 rounded-lg mr-4'>
                            <FiCalendar></FiCalendar>
                            {dateFormatee.charAt(0).toUpperCase() + dateFormatee.slice(1)}
                        </p>
                    </div>

                    {/* corps du dashboard */}
                    <div className=''>
                        {/* card */}
                        <div className='flex md:flex-row flex-col md:justify-between gap-3 mt-28 px-5'>
                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                <div className='w-20 h-20 bg-purple-200 flex justify-center items-center rounded-lg'><FiBox size={40} className='text-text-dark'></FiBox></div>
                                <div className='flex flex-col gap-3'>
                                    <span className='text-text-medium'>Produits en stock</span>
                                    <span className='text-3xl font-bold'>240</span>
                                    <p>
                                        <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +3 </span>
                                        <span className='text-green-500'>Aujourd'hui</span>
                                    </p>
                                </div>
                            </div>
                            {/* valeur en stock */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                <div className='w-20 h-20 bg-green-200 flex justify-center items-center rounded-lg'><FaCoins size={40} className='text-text-dark'></FaCoins></div>
                                <div className='flex flex-col gap-3'>
                                    <span className='text-text-medium'>Valeur en stock</span>
                                    <span className='text-3xl font-bold'>2.4M</span>
                                    <p>
                                        <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +8.5% </span>
                                        {/* <span className='text-green-500'>Aujourd'hui</span> */}
                                    </p>
                                </div>
                            </div>

                            {/* Alertes actives */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                <div className='w-20 h-20 bg-yellow-200 flex justify-center items-center rounded-lg'><FiAlertTriangle size={40} className='text-text-dark'></FiAlertTriangle></div>
                                <div className='flex flex-col gap-3'>
                                    <span className='text-text-medium'>Alertes actives</span>
                                    <span className='text-3xl font-bold'>5</span>
                                    <p>
                                        {/* <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +3 </span>
                                <span className='text-green-500'>Aujourd'hui</span> */}
                                        <span className='flex items-center text-red-500'><FiArrowDownRight></FiArrowDownRight> -3 </span>
                                        <span className='text-red-500'>Depuis hier</span>
                                    </p>
                                </div>
                            </div>

                            {/* Sorties Aujourd'hui */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                <div className='w-20 h-20 bg-purple-200 flex justify-center items-center rounded-lg'><FiArrowUpRight size={40} className='text-text-dark'></FiArrowUpRight></div>
                                <div className='flex flex-col gap-3'>
                                    <span className='text-text-medium'>Sorties aujourd'hui</span>
                                    <span className='text-3xl font-bold'>18</span>
                                    <p>
                                        <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +3 </span>
                                        <span className='text-green-500'>vs hier</span>
                                    </p>
                                </div>
                            </div>

                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        {/* Acces rapides */}
                        <h1 className='my-5 ml-5 font-bold text-2xl'>Acces Rapides</h1>
                        <div className='flex md:flex-row flex-col  gap-5 px-5 items-center'>
                            <div className='cursor-pointer flex flex-col gap-5 p-10 border items-center bg-white rounded-lg hover:border-[1.5px]  hover:border-primary duration-300'>
                                <div className='w-20 h-20 rounded-lg bg-primary-darker flex justify-center items-center text-white'>
                                    <FiDownloadCloud size={40}></FiDownloadCloud>
                                </div>
                                <h2 className='font-bold text-2xl'>
                                    Entrées en Stock
                                </h2>
                                <p className='text-text-medium'>Enregistrer une reception des produits</p>

                            </div>

                            <div className='cursor-pointer flex flex-col gap-5 p-10 border items-center bg-white rounded-lg hover:border-[1.5px]  hover:border-primary duration-300'>
                                <div className='w-20 h-20 rounded-lg bg-primary-darker flex justify-center items-center text-white'>
                                    <FiUploadCloud size={40}></FiUploadCloud>
                                </div>
                                <h2 className='font-bold text-2xl'>
                                    Sortie en Stock
                                </h2>
                                <p className='text-text-medium'>Enregistrer une reception des produits</p>

                            </div>


                            <div className='cursor-pointer flex flex-col gap-5 p-10 border items-center bg-white rounded-lg hover:border-[1.5px]  hover:border-primary duration-300'>
                                <div className='w-20 h-20 rounded-lg bg-primary-darker flex justify-center items-center text-white'>
                                    <FiArchive size={40} className=''></FiArchive>
                                </div>
                                <h2 className='font-bold text-2xl'>
                                    Historique
                                </h2>
                                <p className='text-text-medium'>Enregistrer une reception des produits</p>

                            </div>

                        </div>


                        {/* alertes de stock */}
                        <div className='flex flex-col p-5 gap-4 bg-white mt-10 border mx-5 rounded-lg'>
                            <div className='flex justify-between'>
                                <p className='ml-5 font-bold text-2xl'>Alertes actives</p>
                                <p>{Alertes.length} {Alertes.length>1?'produits necessitent votre attention':'produit necessite votre attention'} </p>
                            </div>
                            {Alertes.map(alerte => (
                                <div className={`border p-5 flex rounded-lg items-center justify-between hover:ml-3 duration-300 ${alerte.niveau == "Stock critique" || alerte.niveau == "Rupture imminente" ? 'bg-red-100 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                    <div className='flex items-center gap-4'>
                                        <div className={`w-10 h-10 flex justify-center items-center rounded-lg ${alerte.niveau == "Stock critique" || alerte.niveau == "Rupture imminente" ? 'bg-red-200 text-red-600' : 'bg-yellow-200 text-yellow-600'}`}>
                                            {alerte.niveau == "Stock critique" || alerte.niveau == "Rupture imminente" ? '🚨' : <FiAlertTriangle></FiAlertTriangle>}
                                        </div>
                                        <div>
                                            <p className='font-bold'>{alerte.produit}</p>
                                            <p className='flex items-center gap-3 text-text-medium'>
                                                <span>{alerte.niveau}</span>
                                                <span>-<span className='hidden md:inline-block'>--</span></span>
                                                <span>{alerte.Description}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`font-bold text-end ${alerte.niveau == "Stock critique" || alerte.niveau == "Rupture imminente" ? 'text-red-600' : ' text-yellow-600'} `}>
                                        {alerte.reste} unité(s) restant
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardEmploye