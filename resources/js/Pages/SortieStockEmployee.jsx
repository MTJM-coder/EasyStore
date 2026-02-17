import React from 'react'
import SidebarEmploye from '../Layouts/SidebarEmploye'
import { useState } from 'react'
import { FiAlertTriangle, FiHeart, FiInfo, FiRefreshCw, FiSave, FiX, FiXOctagon,FiMenu } from 'react-icons/fi'
import { FaCoins } from 'react-icons/fa'

const EntreeStrockEmploye = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const formatDate = (dateString) => {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const sortieDate = new Date(dateString)

        const resetTime = (date) => {
            date.setHours(0, 0, 0, 0)
            return date
        }

        today.setHours(0, 0, 0, 0)
        yesterday.setHours(0, 0, 0, 0)
        sortieDate.setHours(0, 0, 0, 0)

        const dateFormatted = sortieDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
        const timeFormatted = new Date(dateString).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

        if (sortieDate.getTime() === today.getTime()) {
            return `Aujourd'hui à ${timeFormatted}`
        } else if (sortieDate.getTime() === yesterday.getTime()) {
            return `Hier à ${timeFormatted}`
        } else {
            return `${dateFormatted} à ${timeFormatted}`
        }
    }
    const sorties = [
        { id: 1, produit: "Produit 1", fournisseur: "Fournisseur 1", quantite: 20, date: "2024-06-01 14:30", motif: "Vente" },
        { id: 2, produit: "Produit 2", fournisseur: "Fournisseur 2", quantite: 15, date: "2024-06-05 10:15", motif: "Perte" },
        { id: 3, produit: "Produit 3", fournisseur: "Fournisseur 3", quantite: 30, date: "2024-06-10 16:45", motif: "Casse" },
        { id: 4, produit: "Produit 4", fournisseur: "Fournisseur 4", quantite: 25, date: "2024-06-15 9:20", motif: "Vente" },
        { id: 5, produit: "Produit 5", fournisseur: "Fournisseur 5", quantite: 10, date: "2024-06-20 13:10", motif:"Perte" },

    ]
    const [active, setActive] = useState(4)
    return (
        <div>
            <div>
                <div className='flex bg-secondary'>
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 z-40 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        ></div>
                    )}

                    <SidebarEmploye sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SidebarEmploye>
                    <div className={`relative md:ml-64 w-full mb-20 md:bg-secondary bg-white md:text-sm text-xs ${sidebarOpen ? 'overflow-auto text-xs bg-white' : ''} `}>
                        {/* entete de la parge */}

                        <div className='fixed flex gap-2 w-full bg-white p-5 border'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                                        <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Sortie de stock</h1>
                                        <p className='text-text-medium'>Enregistrer une vente,une perte ou une casse.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* corps de la page */}
                        <div className='mt-32 px-5 border bg-white rounded-lg'>
                            <div className=''>
                                <div className='flex flex-col p-5 gap-2 border-b-2'>
                                    <h1 className='font-bold text-2xl'>Novelle sortie de stock</h1>
                                    <p className='text-text-medium'>Enregistrez une vente, une perte ou une casse de produits</p>
                                </div>
                            </div>

                            <div className='bg-yellow-100 rounded-lg border border-yellow-500 p-5 flex gap-5 items-center my-5'>
                                <FiAlertTriangle className='text-3xl text-yellow-500 '></FiAlertTriangle>
                                <p className='text-xs text-yellow-600'><span className='text-yellow-800'>Attention :</span> Une sortie de stock diminue automatiquement la quantité disponible. Assurez-vous que les informations saisies sont correctes avant d'enregistrer.</p>
                            </div>

                            <div className='ml-10 flex flex-col gap-5 mb-10'>
                                <h1 className='font-bold text-lg'>Motif de la sortie</h1>

                                <div className='flex flex-col md:flex-row gap-5 justify-center'>
                                    <div className='rounded-lg bg-white border p-10 flex flex-col items-center gap-2 cursor-pointer hover:border-primary hover:border-[1.5px] transition-all duration-300'>
                                        <FaCoins className='text-3xl text-green-600'></FaCoins>
                                        <p className='text-sm text-gray-500'>Vente</p>
                                        <p className=''>Produit vendu à un client</p>
                                    </div>

                                    <div className=' rounded-lg bg-white border p-10 flex flex-col items-center gap-2 cursor-pointer hover:border-primary hover:border-[1.5px] transition-all duration-300'>
                                        <FiXOctagon className='text-3xl text-red-600'></FiXOctagon>
                                        <p className='text-sm text-gray-500'>Perte</p>
                                        <p>Produit perdu ou volé</p>
                                    </div>
                                    <div className='rounded-lg bg-white border p-10 flex flex-col items-center gap-2 cursor-pointer hover:border-primary hover:border-[1.5px] transition-all duration-300'>
                                        <FiHeart className='text-3xl text-red-600'></FiHeart>
                                        <p className='text-sm text-gray-500'>Casse</p>
                                        <p>Produit endommagé ou cassé</p>

                                    </div>

                                </div>

                            </div>

                            <div className='mb-5'>
                                <form action="">
                                    <div className='flex flex-col gap-2 w-full mb-5'>
                                        <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Produit <span className='text-red-600'>*</span></label>
                                        <select className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' name="" id="">
                                            <option value="">Sélectionnez un produit</option>
                                            <option value="">Produit 1</option>
                                            <option value="">Produit 2</option>
                                            <option value="">Produit 3</option>
                                        </select>

                                    </div>

                                    <div className='flex flex-col md:flex-row items-center gap-10'>
                                        <div className='flex flex-col gap-2 w-full mb-5'>
                                            <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Quantité sortie <span className='text-red-600'>*</span></label>
                                            <input className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' type="number" placeholder='Entrez la quantité reçue' />
                                        </div>
                                        <div className='flex flex-col gap-2 w-full mb-5'>
                                            <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Date de sortie <span className='text-red-600'>*</span></label>
                                            <input className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' type="date" />
                                        </div>
                                    </div>

                                    <div className='flex w-full'>
                                        <button className='bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-2 w-2/3 justify-center '><FiSave></FiSave> Enregistrer</button>
                                        <button className='ml-2 bg-gray-400 text-white px-5 py-3 rounded-lg flex items-center gap-2 w-1/3 justify-center'><FiRefreshCw></FiRefreshCw>Réinitialiser</button>
                                    </div>
                                </form>
                            </div>



                        </div>
                        <div className='flex flex-col mt-5 p-5 gap-2 bg-white border rounded-lg'>
                            <h1 className='text-xl font-bold text-gray-700 mx-5'>Dernières sorties de stock enregistrées</h1>
                            <div className='flex flex-col'>
                                {sorties.map((sor) => (
                                    <div key={sor.id} className='border-b py-2 flex justify-between items-center bg-gray-50 my-2 hover:ml-4 transition-all duration-300 px-5 rounded-lg'>
                                        <div className='flex flex-col gap-1'>
                                            <p className='text-xl font-bold text-text-dark flex gap-3 items-center'>
                                                <span>{sor.produit}</span>
                                                <span className={`ml-2 px-2 py-1 rounded-lg text-xs ${sor.motif === 'Vente' ? 'bg-green-200 text-green-800' : 'bg-red-100 text-red-600'}`}>{sor.motif}</span>
                                            </p>
                                            <p className='text-sm text-gray-500'>{formatDate(sor.date)}</p>
                                        </div>
                                        <div>
                                            <p className='text-red-600 text-xl font-bold'>-{sor.quantite}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EntreeStrockEmploye