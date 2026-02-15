import SidebarEmploye from '@/Layouts/SidebarEmploye'
import { router } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { FaCoins, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaStore, FaUser } from 'react-icons/fa'
import { FiMenu, FiCheck, FiPlus, FiEdit, FiPause, FiPlay,FiX, FiInfo ,FiXCircle,FiSave,FiRefreshCcw} from 'react-icons/fi'


const Abonnement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedAbonnement, setSelectedAbonnement] = useState(null)
    const [formData, setFormData] = useState({
        nom: "",
        prixMensuel: "",
        fonctionnalites: "",
    })
    const handleEdit = (abonnement) => {
        setFormData({
            nom: abonnement.nom,
            prixMensuel: abonnement.prixMensuel,
            fonctionnalites: abonnement.fonctionnalites.join(', '),
        })
        setShowAddForm(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAbonnement) {
            router.post(`/abonnements/${selectedAbonnement.id}`, formData)
        } else {
            router.post('/abonnements', formData)
        }
        setFormData({
            nom: "",
            prixMensuel: "",
            fonctionnalites: "",
        })
        setShowAddForm(false)
        }

    const abonnements = [
        { id: 1, nom: "starter", prixMensuel: 5000, fonctionnalites: ["Jusqu'à 100 produits", "Gestion de stock basique", "1 utilisateur", "Support par email"], statut: "actif" },
        { id: 2, nom: "professionnel", prixMensuel: 12000, fonctionnalites: ["produits illimités", "Gestion de stock avancée", "5 utilisateurs", "Rapports et statistiques", "Rapport prioritaire"], statut: "inactif" },
        { id: 3, nom: "entreprise", prixMensuel: 25000, fonctionnalites: ["Toutes les fonctionnalités Pro", "Utilisateurs illimités", "Gestion multi-magasins", "Support téléphonique 24/7", "Formation personnalisée"], statut: "actif" },
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
                <SidebarEmploye sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></SidebarEmploye>
                <div className='relative md:ml-64 bg-secondary max-w-max mb-20'>
                    <div className='fixed flex items-center w-full gap-5 pl-5 md:pr-64 justify-between bg-white p-5'>
                        <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl'>Gestion des Abonnements</h1>
                            <p className='text-text-medium'>Gérez les offres et les tarifs de la plateforme</p>
                        </div>
                        <button onClick={()=>setShowAddForm(true)} className='flex gap-3 items-center border border-primary-dark bg-purple-200 text-primary px-5 md:py-2 rounded-lg mr-4'>
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
                                        <div className={`${ab.statut == "actif" ? "bg-green-400 text-green-700" : "bg-red-400 text-red-700"} px-4 py-1 max-h-max rounded-2xl flex items-center gap-2`}>
                                            {ab.statut == "actif" ? <FiCheck></FiCheck> : <FiX></FiX>}
                                            {ab.statut}
                                        </div>

                                    </div>
                                    <h2 className='font-bold text-xl'>Starter</h2>
                                    <p className='flex flex-col gap-4'><span className='text-3xl font-bold text-primary'>5000</span> <span className='text-text-medium text-sm'>FCFA / mois</span></p>


                                    <ul className='flex flex-col gap-2'>
                                        {ab.fonctionnalites.map((f, index) => (
                                            <li key={index} className='flex items-center gap-2 text-text-medium'><FiCheck className='text-green-500'></FiCheck> {f}</li>
                                        ))}
                                       
                                    </ul>
                                    <div className='flex'>
                                        <button onClick={() => {
                                            handleEdit(ab);
                                            setSelectedAbonnement(ab);
                                            
                                        }} className='flex gap-3 items-center border border-primary-dark bg-purple-200 text-primary px-5 md:py-2 rounded-lg mr-4'>
                                            <FiEdit></FiEdit>

                                        </button>
                                        {ab.statut == "actif" ? <button className='flex gap-3 items-center border border-red-400 bg-red-200 text-red-700 px-5 md:py-2 rounded-lg mr-4'>
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
            
                            <div className='bg-white mx-auto p-5 w-1/2 z-50 fixed top-0 left-0 border rounded-lg border-t-2 border-t-red-500'>
                                <button className='w-full text-end  flex justify-end'>
                                    <FiXCircle className='text-red-500 ' size={30} onClick={() => setShowAddForm(false)}></FiXCircle>
                                </button>
                                <form action="" onSubmit={handleSubmit}>
                                    <h1 className='my-5 text-xl font-bold '>Créer une offre</h1>
            
                                    <div className='mb-3 flex flex-col'>
                                        <label htmlFor="" className='text-text-medium font-bold uppercase'>Nom de l'offre <span className='text-red-500'>*</span></label>
                                        <input type="text" name="nom" id="nom" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.nom} required onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
                                    </div>
                                    <div className='mb-3 flex flex-col'>
                                        <label htmlFor="" className='text-text-medium font-bold uppercase'>Prix mensuel(FCFA) <span className='text-red-500'>*</span></label>
                                        <input type="number" name="prixMensuel" id="prixMensuel" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.prixMensuel} required onChange={(e) => setFormData({ ...formData, prixMensuel: e.target.value })} />
                                    </div>
                                    <div className='mb-3 flex flex-col'>
                                        <label htmlFor="" className='text-text-medium font-bold uppercase'>Fonctionnalités * <span className='text-red-500'>*</span></label>
                                        <textarea name="fonctionnalites" id="fonctionnalites" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.fonctionnalites} required onChange={(e) => setFormData({ ...formData, fonctionnalites: e.target.value })} placeholder='Séparez les fonctionnalités par des virgules'></textarea>
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
        </div>
    )
}

export default Abonnement