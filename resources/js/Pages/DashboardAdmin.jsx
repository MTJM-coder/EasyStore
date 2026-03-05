import SideBarAdmin from '@/Layouts/SideBarAdmin'
import SidebarEmploye from '@/Layouts/SidebarEmploye'
import React from 'react'
import { useState } from 'react'
import { FaCoins, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaStore ,FaUser} from 'react-icons/fa'
import { FiArrowUpRight, FiBox, FiCalendar, FiAlertTriangle, FiArrowDownRight, FiThumbsDown, FiDownloadCloud, FiUploadCloud, FiArchive, FiMenu, FiCheck, FiPlus } from 'react-icons/fi'


const DashboardAdmin = ({totalCommerces,totalAbonnementsActif, totalAbonnementsExpiré, revenuMensuel, activitesRecente, nouveauxCommerces, abonnementsCritiques}) => {

    const date = new Date()
    const dateFormatee = date.toLocaleDateString('fr-FR', {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    // const activitesRecentes = [
    //     { id: 1, activite: "Nouvel abonnement", message: "Super Market Dupont a souscrit au plan Professionnel", date: "2025-01-15", icon: <FiCheck className="text-green-500" /> },
    //     { id: 2, activite: "Modification d'abonnement", message: "Boulangerie du Centre a modifié son abonnement", date: "2025-02-10", icon: <FiArrowUpRight className="text-blue-500" /> },
    //     { id: 3, activite: "Expiration d'abonnement", message: "Librairie Saint-Michel a expiré son abonnement", date: "2025-03-05", icon: <FiAlertTriangle className="text-yellow-500" /> },
    //     { id: 4, activite: "Nouveau commerçant", message: "Pharmacie de la Gare a été ajoutée à la plateforme", date: "2025-04-15", icon: <FiPlus className="text-purple-500" /> },
    //     { id: 5, activite: "Compte suspendu", message: "Compte de Super Market Dupont suspendu pour non-paiement", date: "2025-05-10", icon: <FiThumbsDown className="text-red-500" /> }
    // ]

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [active,setActive]=useState(1)
    return (
        <div>
            <div className='flex bg-secondary'>
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}
                <SideBarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SideBarAdmin>
                <div className='relative md:ml-64 bg-secondary max-w-max mb-20'>
                    <div className='fixed flex items-center w-full gap-5 pl-5 md:pr-64 justify-between bg-white p-5'>
                        <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl'>Dashboard Administrateur</h1>
                            <p className='text-text-medium'>Vue d'ensemble de la plateforme EasyStore</p>
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

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-3'>
                                        <span className='text-text-medium'>Total commerçants</span>
                                        <div className='w-14 h-14 bg-blue-200 flex justify-center items-center rounded-lg'><FaStore size={20} className='text-text-dark'></FaStore></div>
                                    </div>

                                    <p>
                                        <span className='text-3xl font-bold block mb-3'>{totalCommerces}</span>
                                        <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +8 </span>
                                        <span className='text-green-500'>ce mois</span>
                                    </p>
                                </div>
                            </div>
                            {/* valeur en stock */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-3'>
                                        <span className='text-text-medium'>Abonnements Actifs</span>
                                        <div className='w-14 h-14 bg-green-200 flex justify-center items-center rounded-lg'><FiCheck size={20} className='text-green-700'></FiCheck></div>
                                    </div>

                                    <p>
                                        <span className='text-3xl font-bold'>{totalAbonnementsActif}</span>
                                        <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +8.5% </span>
                                        <span className='text-green-500'>du taux d'activité</span>
                                    </p>
                                </div>
                            </div>
                            {/* Alertes actives */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-3'>
                                        <span className='text-text-medium'>Abonnements Expirés</span>
                                        <div className='w-14 h-14 bg-red-200 flex justify-center items-center rounded-lg'><FiAlertTriangle size={20} className='text-red-700'></FiAlertTriangle></div>
                                    </div>

                                    <p>
                                        <span className='text-3xl font-bold'>{totalAbonnementsExpiré}</span>
                                        <span className='flex items-center text-red-500'><FiArrowUpRight></FiArrowUpRight> -5 </span>
                                        <span className='text-red-500'>vs mois dernier</span>
                                    </p>
                                </div>
                            </div>

                            {/* Sorties Aujourd'hui */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-3'>
                                        <span className='text-text-medium'>Revenus Mensuels</span>
                                        <div className='w-14 h-14 bg-green-200 flex justify-center items-center rounded-lg'><FaCoins size={20} className='text-text-dark'></FaCoins></div>
                                    </div>

                                    <p>
                                        <span className='text-3xl font-bold'>{revenuMensuel}</span>
                                        <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +8.5% </span>
                                        <span className='text-green-500'>ce mois</span>
                                    </p>
                                </div>
                            </div>


                        </div>

                        <div className='flex md:flex-row flex-col gap-4   md:p-5 p-2 '>

                            <div className='rounded-lg border bg-white  md:p-5 p-2 md:w-2/3'>
                                <h1 className='font-bold text-xl'>Activité récente</h1>
                                <div className='mt-4'>
                                    {/* {activitesRecentes.map((activite) => (
                                        <div key={activite.id} className='flex items-center gap-3 py-5 border-b'>
                                            <div className='w-10 h-10 bg-blue-100 flex justify-center items-center rounded-lg'>
                                                {activite.icon}
                                            </div>
                                            <div>
                                                <p className='font-medium'>{activite.activite}</p>
                                                <p className='text-sm text-text-medium'>{activite.message}</p>
                                            </div>
                                        </div>
                                        
                                    ))} */}
                                </div>

                            </div>
                            <div className='border rounded-lg bg-white  md:p-5 p-2 md:w-1/3'>
                                <h1 className='font-bold text-xl'>Nouveaux commerçants</h1>
                                <div className='mt-4'>
                                    {nouveauxCommerces.map((commerce) => (
                                        <div key={commerce.id} className='flex items-center gap-3 py-5 border-b'>
                                            <div className='w-10 h-10 bg-green-100 flex justify-center items-center rounded-lg'>
                                                <FaUser size={20} className='text-green-700'></FaUser>
                                            </div>
                                            <div>
                                                <p className='font-medium'>{commerce.name}</p>
                                                <p className='text-sm text-text-medium'>inscrit le {new Date(commerce.created_at).toLocaleDateString('fr-FR')}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${commerce.commerce_abonnement?.abonnement?.status === 'actif' ? 'bg-green-100 text-green-800' : commerce.commerce_abonnement?.abonnement?.status === 'essai' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                {commerce.commerce_abonnement?.abonnement?.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>

                        <div className='border bg-white rounded-lg md:m-5 md:p-5 p-2'>
                            <div className='mb-5'>
                                <h1 className='font-bold text-xl'>Abonnements nécessitant attention</h1>

                            </div>
                            <hr />
                            <div className='w-full'>
                                <table className='w-full border-collapse overflow-x-auto'>
                                    <thead className='bg-gray-50 border-b-[2px]'>
                                        <tr className=''>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Commerçant</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Plan</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Date d'expiration</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Statut</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase' >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {abonnementsCritiques.map(a => (
                                            <tr key={a.id} className=''>
                                                <td className='border-b-2 py-[1.25rem] px-[1.5rem]'>
                                                    <span className='text-text-dark font-bold'>{a?.commerce?.name}</span>
                                                </td>
                                                <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                    <span className='text-primary-dark font-bold'>{a?.abonnement?.name}</span>
                                                </td>
                                                <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                    <span className='text-text-medium'>{new Date(a?.ends_at).toLocaleDateString()}</span>
                                                </td>
                                                <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                    <span className={`rounded-lg flex gap-2 items-center px-2 py-1 max-w-max ${a.status === "expiré" ? "bg-red-200 text-red-700" : "bg-blue-200 text-blue-700"}`}>
                                                        {a.status === "expiré" ? "Expiré" : "Expire bientôt"}
                                                    </span>
                                                </td>
                                                <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                    <button className='px-4 py-2 rounded-lg bg-primary-dark text-white' onClick={()=>a.status=="expiré"?relancer():notifier()}>
                                                        {a.status === "expiré" ? "Relancer" : "Notifier"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default DashboardAdmin