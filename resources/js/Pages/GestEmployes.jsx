import SidebarEmploye from '@/Layouts/SidebarEmploye'
import React from 'react'
import { FiPlus, FiSearch, FiMenu, FiBox, FiCheck, FiAlertTriangle, FiEdit, FiTrash2, FiSave, FiRefreshCcw, FiXCircle, FiMail, FiPhone, FiMapPin, FiTruck, FiUsers, FiShieldOff } from 'react-icons/fi';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import SideBarBoss from '@/Layouts/SideBarBoss';
import FlashMessage from '@/Components/FlashMessage';

const GestEmployes = ({ employes }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active, setActive] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmploye, setSelectedEmploye] = useState(null);
   


    const TotalEmployes = employes.length
    const TotalEmployesActifs = employes.filter(e => e.actif === 1).length
    const TotalEmployesInactifs = employes.filter(e => e.actif === 0).length

    const filteredEmployes = employes.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.ville.toLowerCase().includes(searchTerm.toLowerCase()))


    const [showAddForm, setShowAddForm] = useState(false)

    const [formData, setFormData] = useState({
        name: null,
        poste: null,
        telephone: null,
        email: null,
        ville: null,
        pays: null,
        entree_stock: false,
        sortie_stock: false,
        consultation: false,
        historique: false
    })

    const closeForm = () => {
        setShowAddForm(false)
        setFormData({
            name: null,
            poste: null,
            telephone: null,
            email: null,
            ville: null,
            pays: null,
            entree_stock: false,
            sortie_stock: false,
            consultation: false,
            historique: false
        })
        setSelectedEmploye(null)

    }
    
    const handleDelete = (emploId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
            router.delete(`/employes/${emploId}`);
        }
    }

    const handleEdit = (emplo) => {
        setFormData({
            name: emplo.name,
            poste: emplo.employe?.poste || '',
            telephone: emplo.telephone,
            email: emplo.email,
            ville: emplo.ville,
            pays: emplo.pays,
            entree_stock: emplo.employe?.entree_stock || false,
            sortie_stock: emplo.employe?.sortie_stock || false,
            consultation: emplo.employe?.consultation_stock || false,
            historique: emplo.employe?.historique || false
        })
        setShowAddForm(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.telephone) {

            if (selectedEmploye) {
                router.put(`/employes/${selectedEmploye.id}`, formData);
            } else {
                router.post('/employes', formData);
            }
            setShowAddForm(false);
            setFormData({
                name: null,
                poste: null,
                telephone: null,
                email: null,
                ville: null,
                pays: null,
                entree_stock: false,
                sortie_stock: false,
                consultation: false,
                historique: false
            })
        }
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

                <SideBarBoss sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SideBarBoss>
                <div className={`relative md:ml-64 w-full mb-20 md:bg-secondary bg-white md:text-sm text-xs ${sidebarOpen ? 'overflow-auto text-xs bg-white' : ''} `}>
                    {/* entete de la parle */}

                    <div className='fixed flex gap-2 w-screen p-5 bg-white border'>

                        <div className='flex flex-col gap-2 w-full'>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                                        <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Gestion des Employés</h1>
                                        <p className='text-text-medium'>Gérez votre équipe et leurs permissions</p>
                                    </div>
                                </div>

                            </div>
                            <div className='flex flex-col md:flex-row md:gap-3 gap-2 w-full items-stretch'>

                                <div className='md:w-3/5 w-full relative'>
                                    <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        type="text"
                                        className='border-[1.5px] border-gray-300 rounded-lg w-full pl-10 py-2'
                                        placeholder='Rechercher un fournisseur...'
                                    />
                                </div>

                                <button
                                    className='md:w-auto w-full bg-primary text-white px-4 py-2 rounded-lg flex items-center md:justify-center justify-start gap-2 whitespace-nowrap font-bold'
                                    onClick={() => setShowAddForm(true)}
                                >
                                    <FiPlus />
                                    Ajouter un employé
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* cards */}
                    <div className='md:mx-5 md:p-5 md:mt-36 mt-60 flex md:flex-row flex-col gap-4 items-center md:justify-between'>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-purple-200 flex justify-center items-center rounded-lg'><FiUsers size={30} className='text-text-dark'></FiUsers></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Total employés</span>
                                <span className='text-3xl font-bold'>{TotalEmployes}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'><FiCheck size={30} className='text-green-600'></FiCheck></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Employés actifs</span>
                                <span className='text-3xl font-bold'>{TotalEmployesActifs}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-yellow-100 flex justify-center items-center rounded-lg'><FiShieldOff size={30} className='text-yellow-600'></FiShieldOff></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Compte desactivés</span>
                                <span className='text-3xl font-bold'>{TotalEmployesInactifs}</span>
                            </div>
                        </div>
                    </div>
                    {/* liste des employes */}
                    <div className='md:mx-10 my-5 md:p-5 bg-white'>
                        <div className=''>
                            <h1 className='text-2xl font-bold'>Liste des employés</h1>
                        </div>

                        <hr />
                        <div className='w-full overflow-x-auto'>
                            <table className='w-full border-collapse min-w-[800px]'>
                                <thead className='bg-gray-50 border-b-[2px]'>
                                    <tr className=''>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>Nom</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>TELEPHONE</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>PERMISSIONS</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>STATUT</th>

                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold' colSpan={2}>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployes.map(emploi => (
                                        <tr key={emploi.id} className=''>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] gap-2'>

                                                <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2'>
                                                    <span className='text-text-dark font-bold'>{emploi.name.charAt(0)}</span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <span className='text-text-dark font-bold'>{emploi.name}</span>
                                                    <span className='text-xs text-text-medium'>{emploi.employe?.poste || 'Employé sans poste'}</span>
                                                </div>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className='text-text-medium'>{emploi.telephone}</span>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <div className='flex items-center gap-4 rounded border justify-center py-1 bg-blue-100 border-blue-500 font-bold max-w-max px-10'>
                                                    {emploi.employe?.consultation_stock && <span className='flex items-center gap-1 text-green-600'><FiCheck />Consultation</span>}
                                                    {emploi.employe?.entree_stock && <span className='flex items-center gap-1 text-green-600'><FiCheck />Entrée stock</span>}
                                                    {emploi.employe?.sortie_stock && <span className='flex items-center gap-1 text-green-600'><FiCheck />Sortie stock</span>}
                                                    {emploi.employe?.historique && <span className='flex items-center gap-1 text-green-600'><FiCheck />Historique</span>}

                                                </div>
                                            </td>

                                            <td className={`border-b-2 py-[1.25rem] px-[1.5rem] text-sm text-text-medium capitalize font-bold ${emploi.actif ? 'text-green-600' : 'text-red-600'}`}>{emploi.statut}</td>
                                            <td className='border-b-2 px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark '>
                                                <button onClick={() => { setSelectedEmploye(emploi); handleEdit(emploi) }} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark'><FiEdit className="text-primary-dark" /></button>
                                            </td>
                                            <td className='border-b-2 px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark '>
                                                <button onClick={() => handleDelete(emploi.id)} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark ml-2'><FiTrash2 className="text-red-500" /></button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>
            {showAddForm && (

                <div className='bg-white mx-auto p-5 md:w-1/2 w-full z-50 fixed top-0 left-0 border rounded-lg'>
                    <button className='w-full text-end  flex justify-end'>
                        <FiXCircle className='text-red-500 ' size={30} onClick={() => closeForm()}></FiXCircle>
                    </button>
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className='my-5 text-xl font-bold '>Ajouter un employé</h1>

                        <div className='flex md:flex-row flex-col md:gap-5 md:mb-3 w-full'>
                            <div className='mb-3 flex flex-col w-full'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Nom <span className='text-red-500'>*</span></label>
                                <input type="text" name="name" id="name" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.name} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className='mb-3 flex flex-col '>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Poste</label>
                                <select name="poste" id="poste" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.poste} onChange={(e) => setFormData({ ...formData, poste: e.target.value })}>
                                    <option value="vendeur">vendeur(se)</option>
                                    <option value="caissier">caissier(e)</option>
                                    <option value="magasinier">magasinier(e)</option>
                                    <option value="administrateur">administrateur</option>
                                    <option value="autre">Autre</option>
                                </select>

                            </div>

                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Email <span className='text-red-500'>*</span></label>
                            <input type="email" name="email" id="email" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.email} required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Telephone <span className='text-red-500'>*</span></label>
                            <input type="tel" name="telephone" id="telephone" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.telephone} required onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
                        </div>
                        <label htmlFor="" className='text-text-medium font-bold uppercase mb-3'>Permissions</label>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className=' bg-gray-100 border px-4 py-2 flex items-center gap-3 rounded'>

                                <input type="checkbox" name="consultation" id="consultation" checked={formData.consultation} onChange={(e) => setFormData({ ...formData, consultation: e.target.checked })} />
                                <label htmlFor="consultation">Consulter le stock</label>
                            </div>
                            <div className=' bg-gray-100 border px-4 py-2 flex items-center gap-3 rounded'>
                                <input type="checkbox" name="entree_stock" id="entree_stock" checked={formData.entree_stock} onChange={(e) => setFormData({ ...formData, entree_stock: e.target.checked })} />
                                <label htmlFor="entree_stock">Entrée en stock</label>
                            </div>
                            <div className=' bg-gray-100 border px-4 py-2 flex items-center gap-3 rounded'>
                                <input type="checkbox" name="sortie_stock" id="sortie_stock" checked={formData.sortie_stock} onChange={(e) => setFormData({ ...formData, sortie_stock: e.target.checked })} />
                                <label htmlFor="sortie_stock">Sortie  stock</label>
                            </div>
                            <div className=' bg-gray-100 border px-4 py-2 flex items-center gap-3 rounded'>

                                <input type="checkbox" name="historique" id="historique" checked={formData.historique} onChange={(e) => setFormData({ ...formData, historique: e.target.checked })} />
                                <label htmlFor="historique">Voir l'historique</label>
                            </div>

                        </div>



                        <div className='mt-5 flex gap-10'>
                            <button type="submit" className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg flex gap-2 items-center'>
                                <FiSave></FiSave>
                                Enregistrer
                            </button>
                            <button type="reset" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-2 flex gap-2 items-center'>
                                <FiRefreshCcw></FiRefreshCcw>
                                Réinitialiser
                            </button>
                        </div>

                    </form>

                </div >
            )}

            <FlashMessage></FlashMessage>
        </div>

    )
}

export default GestEmployes