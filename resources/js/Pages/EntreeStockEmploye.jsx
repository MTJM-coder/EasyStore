import React from 'react'
import SidebarEmploye from '../Layouts/SidebarEmploye'
import SideBarBoss from '../Layouts/SideBarBoss'
import { useState} from 'react'
import { FiInfo, FiRefreshCw, FiSave, FiMenu } from 'react-icons/fi'
import { router, usePage } from '@inertiajs/react'
import FlashMessage from '@/Components/FlashMessage'

const EntreeStrockEmploye = ({ entrees, produits, fournisseurs }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const {auth}=usePage().props;

    const formatDate = (dateString) => {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const entreeDate = new Date(dateString)

        const resetTime = (date) => {
            date.setHours(0, 0, 0, 0)
            return date
        }

        today.setHours(0, 0, 0, 0)
        yesterday.setHours(0, 0, 0, 0)
        entreeDate.setHours(0, 0, 0, 0)

        const dateFormatted = entreeDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })


        if (entreeDate.getTime() === today.getTime()) {
            return `Aujourd'hui `
        } else if (entreeDate.getTime() === yesterday.getTime()) {
            return `Hier `
        } else {
            return `${dateFormatted} `
        }
    }
    const [formdata, setFormData] = useState({
        produit_id: '',
        fournisseur_id: '',
        quantite: '',
        date: '',
        commentaire: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/mouvements/entree', formdata);
        setFormData({
            produit_id: '',
            fournisseur_id: '',
            quantite: '',
            date: '',
            commentaire: ''
        })
    }
    const [active, setActive] = useState(3)
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
                        {/* entete de la parle */}

                        <div className='fixed flex gap-2 w-full bg-white p-5 border'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                                        <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Entrée en stock</h1>
                                        <p className='text-text-medium'>Enregistrer une reception produits</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* corps de la page */}
                        <div className='mt-32 px-5 border bg-white rounded-lg'>
                            <div className=''>
                                <div className='flex flex-col p-5 gap-2 border-b-2'>
                                    <h1 className='font-bold text-2xl'>Novelle entrée en stock</h1>
                                    <p className='text-text-medium'>Remplissez les informations pour enregistrer une nouvelle entrée</p>
                                </div>
                            </div>

                            <div className='bg-blue-100 rounded-lg border border-blue-500 p-5 flex gap-5 items-center my-5'>
                                <FiInfo className='text-3xl text-blue-500 '></FiInfo>
                                <p className='text-xs text-blue-800'>Une entrée de stock correspond à un approvisionnement de produits provenant d'un fournisseur. Cette opération augmente automatiquement la quantité disponible en stock.</p>
                            </div>

                            <div className='mb-5'>
                                <form action="" onSubmit={handleSubmit}>
                                    <div className='flex flex-col gap-2 w-full mb-5'>
                                        <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Produit <span className='text-red-600'>*</span></label>
                                        <select className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' name="produit_id" id="" onChange={(e) => setFormData({ ...formdata, produit_id: e.target.value })} value={formdata.produit_id}>
                                            <option value="">Sélectionnez un produit</option>
                                            {produits.map(p => (
                                                <option value={p.id}>{p.ref}--{p.name}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className='flex flex-col gap-2 w-full mb-5'>
                                        <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Fournisseur</label>
                                        <select className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' name="fournisseur_id" id="" onChange={(e) => setFormData({ ...formdata, fournisseur_id: e.target.value })} value={formdata.fournisseur_id}>
                                            <option value="">Sélectionnez un fournisseur</option>
                                            {fournisseurs.map(f => (
                                                <option value={f.id}>{f.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex flex-col md:flex-row items-center gap-10'>
                                        <div className='flex flex-col gap-2 w-full mb-5'>
                                            <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Quantité entrée <span className='text-red-600'>*</span></label>
                                            <input className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' type="number" placeholder='Entrez la quantité reçue' onChange={(e) => setFormData({ ...formdata, quantite: e.target.value })} value={formdata.quantite} />
                                        </div>
                                        <div className='flex flex-col gap-2 w-full mb-5'>
                                            <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Date de réception <span className='text-red-600'>*</span></label>
                                            <input className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' type="date" onChange={(e) => setFormData({ ...formdata, date: e.target.value })} value={formdata.date} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full mb-5'>
                                        <label htmlFor="" className='text-sm font-bold text-gray-500 uppercase'>Commentaire(optionnel)</label>
                                        <textarea name="commentaire" id="" placeholder='EX: Livraison conforme des produits,facture numéro 1234.....' className='w-full rounded-lg border-[1.5px] py-2 px-3 focus:border-primary-dark border-gray-300' onChange={(e) => setFormData({ ...formdata, commentaire: e.target.value })} value={formdata.commentaire}></textarea>

                                    </div>
                                    <div className='flex w-full'>
                                        <button type='submit' className='bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-2 w-2/3 justify-center '><FiSave></FiSave> Enregistrer</button>
                                        <button type='reset' className='ml-2 bg-gray-400 text-white px-5 py-3 rounded-lg flex items-center gap-2 w-1/3 justify-center'><FiRefreshCw></FiRefreshCw>Réinitialiser</button>
                                    </div>
                                </form>
                            </div>



                        </div>
                        <div className='flex flex-col mt-5 p-5 gap-2 bg-white border rounded-lg'>
                            <h1 className='text-xl font-bold text-gray-700 mx-5'>Dernières entrées de stock enregistrées</h1>
                            <div className='flex flex-col'>
                                {entrees.map((entree) => (
                                    <div key={entree.id} className='border-b py-2 flex justify-between items-center bg-gray-50 my-2 hover:ml-4 transition-all duration-300 px-5 rounded-lg'>
                                        <div className='flex flex-col gap-1'>
                                            <p className='text-xl font-bold text-text-dark'>{entree?.produit?.name}</p>
                                            <p className='text-sm text-gray-500'>{entree?.fournisseur?.name ?? 'Fournisseur inconnu'} - {formatDate(entree.date_mouvement)}</p>
                                        </div>
                                        <div>
                                            <p className='text-green-600 text-xl font-bold'>+{entree?.quantity_change}</p>
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

export default EntreeStrockEmploye