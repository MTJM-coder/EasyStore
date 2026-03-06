import FlashMessage from '@/Components/FlashMessage'
import SideBarAdmin from '@/Layouts/SideBarAdmin'
import { router } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { FaCoins, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaStore, FaUser } from 'react-icons/fa'
import { FiMenu, FiCheck, FiPlus, FiEdit, FiPause, FiPlay, FiX, FiInfo, FiXCircle, FiSave, FiRefreshCcw } from 'react-icons/fi'


const Abonnement = ({ abonnements }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [active, setActive] = useState(3)
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedAbonnement, setSelectedAbonnement] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        duration: "",
        fonctionnalites: "",
        max_produits: "",
        max_users: "",
        export_pdf: false,
        rapports_avances: false,
        multi_boutiques: false
    })
    const handleEdit = (abonnement) => {
        setFormData({
            name: abonnement.name,

            price: abonnement.price,
            duration: abonnement.duration || "",
            fonctionnalites: abonnement.fonctionnalites,
            max_produits: abonnement.max_produits || "",
            max_users: abonnement.max_users || "",
            export_pdf: abonnement.export_pdf || false,
            rapports_avances: abonnement.rapports_avances || false,
            multi_boutiques: abonnement.multi_boutiques || false
        })
        setShowAddForm(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAbonnement) {
            router.put(`/abonnements/${selectedAbonnement.id}`, formData)
        } else {
            router.post('/abonnements', formData)
        }
        setFormData({
            name: "",
            price: "",
            duration: "",
            fonctionnalites: "",
            max_produits: "",
            max_users: "",
            export_pdf: false,
            rapports_avances: false,
            multi_boutiques: false
        })
        setShowAddForm(false)
    }

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
                            <h1 className='font-bold text-2xl'>Gestion des Abonnements</h1>
                            <p className='text-text-medium'>Gérez les offres et les tarifs de la plateforme</p>
                        </div>
                        <button onClick={() => setShowAddForm(true)} className='flex gap-3 items-center border border-primary-dark bg-purple-200 text-primary px-5 md:py-2 rounded-lg mr-4'>
                            <FiPlus></FiPlus>
                            créer une offre
                        </button>
                    </div>
                    <div className='md:mt-32 mt-40 px-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                            {abonnements.map(ab => (
                                <div key={ab.id} className='bg-white rounded-lg shadow-md p-5 flex flex-col gap-5 border'>
                                    <div className='flex justify-between'>
                                        <div className='bg-primary-dark rounded-lg p-3 flex justify-center items-start'>
                                            <FaStore className='text-2xl text-white'></FaStore>
                                        </div>
                                        <div className={`${ab.actif == true ? "bg-green-400 text-green-700" : "bg-red-400 text-red-700"} px-4 py-1 max-h-max rounded-2xl flex items-center gap-2`}>
                                            {ab.actif ? <FiCheck></FiCheck> : <FiX></FiX>}
                                            {ab.actif ? 'Actif' : 'Inactif'}
                                        </div>

                                    </div>
                                    <h2 className='font-bold text-xl'>{ab.name}</h2>
                                    <p className='flex flex-col gap-4'><span className='text-3xl font-bold text-primary'>{parseInt(ab.price)}</span> <span className='text-text-medium text-sm'>FCFA / mois</span></p>


                                    <ul className='flex flex-col gap-2'>
                                        <li className='flex items-center gap-2 text-text-medium'><FiCheck className='text-green-500'></FiCheck>{ab.max_produits} produits</li>
                                        <li className='flex items-center gap-2 text-text-medium'><FiCheck className='text-green-500'></FiCheck>{ab.max_users} utilisateurs</li>
                                        {ab.rapports_avances &&
                                            <li className='flex items-center gap-2 text-text-medium'><FiCheck className='text-green-500'></FiCheck>Rapports avancés</li>
                                        }
                                        {
                                            ab.export_pdf &&
                                            (
                                             <li className='flex items-center gap-2 text-text-medium'><FiCheck className='text-green-500'></FiCheck>Export en PDF</li>
                                            )
                                        }
                                        {ab?.fonctionnalites?.split(',').map((f, index) => (
                                            <li key={index} className='flex items-center gap-2 text-text-medium'><FiCheck className='text-green-500'></FiCheck> {f.trim()}</li>
                                        ))}

                                    </ul>
                                    <div className='flex'>
                                        <button onClick={() => {
                                            handleEdit(ab);
                                            setSelectedAbonnement(ab);

                                        }} className='flex gap-3 items-center border border-primary-dark bg-purple-200 text-primary px-5 md:py-2 rounded-lg mr-4'>
                                            <FiEdit></FiEdit>

                                        </button>
                                        {ab.actif === 1 ? <button className='flex gap-3 items-center border border-red-400 bg-red-200 text-red-700 px-5 md:py-2 rounded-lg mr-4'>
                                            <FiPause></FiPause>

                                        </button> : <button className='flex gap-3 items-center border border-green-400 bg-green-200 text-green-700 px-5 md:py-2 rounded-lg mr-4'>
                                            <FiPlay></FiPlay>

                                        </button>}

                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showAddForm && (

                <div className='bg-white mx-auto p-5 w-1/2 z-50 fixed top-0 left-0 border rounded-lg border-t-2 border-t-red-500 overflow-auto h-[99vh]'>
                    <button className='w-full text-end  flex justify-end'>
                        <FiXCircle className='text-red-500 ' size={30} onClick={() => setShowAddForm(false)}></FiXCircle>
                    </button>
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className='my-5 text-xl font-bold '>Créer une offre</h1>

                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Nom de l'offre <span className='text-red-500'>*</span></label>
                            <input type="text" name="name" id="name" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.name} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Durée (en mois) <span className='text-red-500'>*</span></label>
                            <input type="number" name="duration" id="duration" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.duration} required onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Prix mensuel(FCFA) <span className='text-red-500'>*</span></label>
                            <input type="number" name="price" id="price" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.price} required onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='mb-3 flex flex-col'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Max_produits </label>
                                <input type="number" name="maxProduits" id="maxProduits" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.max_produits} onChange={(e) => setFormData({ ...formData, max_produits: e.target.value })} />
                            </div>

                            <div className='mb-3 flex flex-col'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Max_users </label>
                                <input type="number" name="maxUsers" id="maxUsers" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.max_users} onChange={(e) => setFormData({ ...formData, max_users: e.target.value })} />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='mb-3 flex items-center gap-5'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Export_pdf </label>
                                <input type="checkbox" name="exportPdf" id="exportPdf" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' checked={formData.export_pdf} onChange={(e) => setFormData({ ...formData, export_pdf: e.target.checked })} />
                            </div>

                            <div className='mb-3 flex items-center gap-5'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Rapports_avances </label>
                                <input type="checkbox" name="rapportsAvances" id="rapportsAvances" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' checked={formData.rapports_avances} onChange={(e) => setFormData({ ...formData, rapports_avances: e.target.checked })} />
                            </div>

                            <div className='mb-3 flex items-center gap-5'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Multi-boutiques </label>
                                <input type="checkbox" name="multiBoutique" id="multiBoutique" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' checked={formData.multi_boutiques} onChange={(e) => setFormData({ ...formData, multi_boutiques: e.target.checked })} />
                            </div>
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Fonctionnalités * </label>
                            <textarea name="fonctionnalites" id="fonctionnalites" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.fonctionnalites} onChange={(e) => setFormData({ ...formData, fonctionnalites: e.target.value })} placeholder='Séparez les fonctionnalités par des virgules'></textarea>
                        </div>

                        <p className='text-sm text-gray-500 flex items-center gap-2'><FiInfo></FiInfo>Les fonctionnalités sont séparées par des virgules</p>


                        <div className='mt-5 flex gap-10'>
                            <button type="submit" className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg flex gap-2 items-center'>
                                <FiSave></FiSave>
                                Enregistrer
                            </button>
                            <button type="reset" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-2 flex gap-2 items-center'>
                                <FiRefreshCcw></FiRefreshCcw>
                                Annuler
                            </button>
                        </div>

                    </form>

                </div >
            )}

            <FlashMessage></FlashMessage>
        </div>
    )
}

export default Abonnement