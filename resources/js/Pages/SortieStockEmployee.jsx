import React from 'react'
import SidebarEmploye from '../Layouts/SidebarEmploye'
import { useState } from 'react'
import { FiAlertTriangle, FiHeart, FiInfo, FiRefreshCw, FiSave, FiX, FiXOctagon, FiMenu } from 'react-icons/fi'
import { FaCoins } from 'react-icons/fa'
import { router, usePage } from '@inertiajs/react'
import SideBarBoss from '@/Layouts/SideBarBoss'
import FlashMessage from '@/Components/FlashMessage'

const SortieStockEmployee = ({ sorties, produits }) => {
    
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [formData, setFormData] = useState({
        produit_id: '',
        quantite: '',
        date: '',
        motif: 'Vente'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/mouvements/sortie', formData, {
            onSuccess: () => {
                setFormData({
                    produit_id: '',
                    quantite: '',
                    date: '',
                    motif: 'Vente'
                })
            }
        })
    }

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
        

        if (sortieDate.getTime() === today.getTime()) {
            return `Aujourd'hui `
        } else if (sortieDate.getTime() === yesterday.getTime()) {
            return `Hier `
        } else {
            return `${dateFormatted} `
        }
    }

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
                    {auth.user.role === 'employe' && (
                        <SidebarEmploye sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SidebarEmploye>
                    )}
                    {auth.user.role === 'commerce' && (
                        <SideBarBoss sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SideBarBoss>
                    )}
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



                            <div className='mb-5'>
                                <form action="" onSubmit={handleSubmit}>
                                    <div className='ml-10 flex flex-col gap-5 mb-10'>
                                        <h1 className='font-bold text-lg'>Motif de la sortie</h1>

                                        <div className='flex flex-col md:flex-row gap-5 justify-center'>
                                            <div className={`rounded-lg bg-white border p-10 flex flex-col items-center gap-2 cursor-pointer hover:border-primary hover:border-[1.5px] transition-all duration-300 ${formData.motif === "vente" ? "border-primary border-[1.5px]" : ""}`} onClick={() => setFormData({ ...formData, motif: "vente" })}>
                                                <FaCoins className='text-3xl text-green-600'></FaCoins>
                                                <p className='text-sm text-gray-500'>Vente</p>
                                                <p className=''>Produit vendu à un client</p>
                                            </div>

                                            <div className={`rounded-lg bg-white border p-10 flex flex-col items-center gap-2 cursor-pointer hover:border-primary hover:border-[1.5px] transition-all duration-300 ${formData.motif === "perte" ? "border-primary border-[1.5px]" : ""}`} onClick={() => setFormData({ ...formData, motif: "perte" })}>
                                                <FiXOctagon className='text-3xl text-red-600'></FiXOctagon>
                                                <p className='text-sm text-gray-500'>Perte</p>
                                                <p>Produit perdu ou volé</p>
                                            </div>
                                            <div className={`rounded-lg bg-white border p-10 flex flex-col items-center gap-2 cursor-pointer hover:border-primary hover:border-[1.5px] transition-all duration-300 ${formData.motif === "casse" ? "border-primary border-[1.5px]" : ""}`} onClick={() => setFormData({ ...formData, motif: "casse" })}>
                                                <FiX className='text-3xl text-red-600'></FiX>
                                                <p className='text-sm text-gray-500'>Casse</p>
                                                <p>Produit endommagé ou cassé</p>

                                            </div>

                                        </div>

                                    </div>
                                    <div className='flex flex-col gap-2 w-full mb-5'>
                                        <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Produit <span className='text-red-600'>*</span></label>
                                        <select className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' name="produit_id" id="" value={formData.produit_id} onChange={(e) => setFormData({ ...formData, produit_id: e.target.value })}>
                                            <option value="">Sélectionnez un produit</option>
                                            {produits.map((prod) => (
                                                <option key={prod.id} value={prod.id}>{prod.ref}-{prod.name}</option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className='flex flex-col md:flex-row items-center gap-10'>
                                        <div className='flex flex-col gap-2 w-full mb-5'>
                                            <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Quantité sortie <span className='text-red-600'>*</span></label>
                                            <input className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' type="number" placeholder='Entrez la quantité reçue' value={formData.quantite} onChange={(e) => setFormData({ ...formData, quantite: e.target.value })} />
                                        </div>
                                        <div className='flex flex-col gap-2 w-full mb-5'>
                                            <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Date de sortie <span className='text-red-600'>*</span></label>
                                            <input className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className='flex w-full'>
                                        <button type='submit' className='bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-2 w-2/3 justify-center '><FiSave></FiSave> Enregistrer</button>
                                        <button type='reset' className='ml-2 bg-gray-400 text-white px-5 py-3 rounded-lg flex items-center gap-2 w-1/3 justify-center'><FiRefreshCw></FiRefreshCw>Réinitialiser</button>
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
                                                <span>{sor?.produit?.name}</span>
                                                <span className={`ml-2 px-2 py-1 rounded-lg text-xs ${sor.motif === 'vente' ? 'bg-green-200 text-green-800' : 'bg-red-100 text-red-600'}`}>{sor.motif}</span>
                                            </p>
                                            <p className='text-sm text-gray-500'>{formatDate(sor?.date_mouvement)}</p>
                                        </div>
                                        <div>
                                            <p className='text-red-600 text-xl font-bold'>{sor.quantity_change}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <FlashMessage></FlashMessage>
        </div>
    )
}

export default SortieStockEmployee