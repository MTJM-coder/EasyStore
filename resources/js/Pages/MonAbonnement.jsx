import React from 'react'
import { FiMenu, FiBox, FiCheck,FiX} from 'react-icons/fi';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import SideBarBoss from '@/Layouts/SideBarBoss';

const MonAbonnement = ({historiqueAbonnement,abonnementActuel}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active, setActive] = useState(11);
    const dateFormatee = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
    const joursRestants = (dateFin) => {
        const today = new Date();
        const endDate = new Date(dateFin);
        const diffTime = endDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? `${diffDays} jours` : "Abonnement expiré";
    };
    const abonnements=[
        {id:1,date:"15 Jan 2026",montant:12000,methode:"mobile money",statut:"payé"},
        {id:2,date:"15 Feb 2026",montant:12000,methode:"mobile money",statut:"payé"},
        {id:3,date:"15 Mar 2026",montant:12000,methode:"mobile money",statut:"payé"},
        {id:4,date:"15 Apr 2026",montant:12000,methode:"mobile money",statut:"payé"},
        {id:5,date:"15 May 2026",montant:12000,methode:"mobile money",statut:"payé"}
    ]

    return (
        <div>
            <div className='flex bg-secondary'>
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <SideBarBoss sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SideBarBoss>
                <div className={`relative md:ml-64 w-full mb-20 md:bg-secondary bg-white md:text-sm text-xs ${sidebarOpen ? 'overflow-auto text-xs bg-white' : ''} `}>
                    {/* entete de la parle */}

                    <div className='fixed flex gap-2 w-screen p-5 bg-white border'>

                        <div className='flex flex-col gap-2 w-full'>
                            {/* <div className='flex items-center gap-5'> */}
                            <div className='flex items-center gap-4'>
                                <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className='font-bold text-2xl'>Gestion de l'Abonnement</h1>
                                    <p className='text-text-medium'>Gérez votre abonnement à EasyStore</p>
                                </div>
                            </div>

                            {/* </div> */}

                        </div>
                    </div>

                    {/* cards */}
                    <div className='md:mx-5 mx-2 p-1 md:p-5 md:mt-36 mt-40 flex flex-col gap-4 justify-between bg-primary rounded-lg'>
                        <div className='flex items-center justify-between'>
                            <p className='flex flex-col gap-2'>
                                <h1 className='text-xl font-bold text-white'>{abonnementActuel?.abonnement?.name??'plan gratuit'}</h1>
                                <span className='text-gray-100 font-mono'>{abonnementActuel?.abonnement?.price??'00'} FCFA / mois</span>
                            </p>

                            <p className={`flex items-center gap-1 rounded-2xl ${abonnementActuel?.status === 'actif' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-1`}><FiCheck></FiCheck>{abonnementActuel?.status??'Inactif'}</p>
                        </div>
                        <div className='mx-10 flex items-center justify-between'>
                            <p className='flex flex-col gap-2'>
                                <span className='text-gray-100 font-mono'>Date Souscription</span>
                                <h1 className='text-xl font-bold text-white'>{dateFormatee(abonnementActuel?.starts_at)}</h1>
                            </p>
                            <p className='flex flex-col gap-2'>
                                <span className='text-gray-100 font-mono'>Prochain paiement</span>
                                <h1 className='text-xl font-bold text-white'>{dateFormatee(abonnementActuel?.ends_at)}</h1>
                            </p>
                            <p className='flex flex-col gap-2'>
                                <span className='flex flex-col gap-2 text-gray-100'>Jours restants</span>
                                <h1 className='text-xl font-bold text-white'>{joursRestants(abonnementActuel?.ends_at)}</h1>
                            </p>
                        </div>
                    </div>

                    <div className='md:m-5 m-2 flex flex-col gap-5 md:p-5 p-2 border rounded-lg bg-white'>
                        <h1 className='font-bold text-2xl'>Renouveler mon abonnement</h1>
                        <p className='text-text-medium'>Prolongez votre abonnement pour un mois supplémentaire. Le paiement sera effectué via Mobile Money (MTN, Orange) ou virement bancaire.</p>
                        <button className='max-w-max px-7 py-3 rounded-lg text-white bg-primary-dark font-bold'>Renouveler maintenant</button>
                    </div>

                    {/* Historique */}

                    <div className='md:mx-5 my-5 md:p-5 bg-white mx-1'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-2xl font-bold'>Historique des paiements</h1>
                            <p className='text-text-medium mb-5'>Consultez l'historique de vos paiements et factures.</p>
                        </div>

                        <hr />
                        <div className='w-full overflow-x-auto'>
                            <table className='w-full border-collapse'>
                                <thead className='bg-gray-50 border-b-[2px]'>
                                    <tr className=''>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>DATE</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>MONTANT</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>METHODE</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>STATUT</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold' >Facture</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historiqueAbonnement.map(a => (
                                        <tr key={a.id} className=''>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem]'>
                                                <span className='text-text-dark font-bold'>{dateFormatee(a.created_at)}</span>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className='text-primary-dark font-bold'>{a?.abonnement?.price} FCFA</span>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className='text-text-medium'>{'Mobile'}</span>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className={`rounded-lg flex gap-2 items-center px-2 py-1 max-w-max ${a.status === "actif" ? "bg-green-200 text-green-700" : a.status === "En attente" ? "bg-yellow-200 text-yellow-700" : "bg-red-200 text-red-700"}`}>
                                                    {a.status === "payé" ? <FiCheck className="" /> : <FiX className="" />}  {a.status}
                                                </span>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <button className='px-4 py-2 rounded-lg bg-primary-dark text-white'>Télécharger</button>
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
    )
}

export default MonAbonnement