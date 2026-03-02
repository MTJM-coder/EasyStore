import SidebarEmploye from '@/Layouts/SidebarEmploye'
import React from 'react'
import { FiPlus, FiSearch, FiMenu, FiBox, FiCheck, FiAlertTriangle, FiEdit, FiTrash2, FiSave, FiRefreshCcw, FiXCircle, FiMail, FiPhone, FiMapPin, FiTruck } from 'react-icons/fi';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import SideBarBoss from '@/Layouts/SideBarBoss';
import FlashMessage from '@/Components/FlashMessage';

const GestFournisseur = ({ fournisseurs, totalFournisseursActifs }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active, setActive] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFournisseur, setSelectedFournisseur] = useState(null)


    const TotalFournisseurs = fournisseurs.length;
    const filteredFournisseurs = fournisseurs.filter(f => f.name?.toLowerCase().includes(searchTerm.toLowerCase()) || f.ville?.toLowerCase().includes(searchTerm.toLowerCase()))


    const [showAddForm, setShowAddForm] = useState(false)

    const [formData, setFormData] = useState({
        name: null,
        telephone: null,
        email: null,
        quantite: null,
        ville: null,
        pays: null,
        adresse: null,
        type: null
    })

    const closeForm = () => {
        setShowAddForm(false);
        setSelectedFournisseur(null);
        setFormData({
            name: null,
            telephone: null,
            email: null,
            ville: null,
            pays: null,
            adresse: null,
            type: null
        })
    }
    const handleDelete = (fournisseurId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
            router.delete(`/suppliers/${fournisseurId}`);
        }
    }

    const handleEdit = (fournisseur) => {
        setFormData({
            name: fournisseur.name,
            telephone: fournisseur.telephone,
            ville: fournisseur.ville,
            pays: fournisseur.pays,
            // adresse: fournisseur.adresse,
            email: fournisseur.email,
            type: fournisseur.type
        })
        setSelectedFournisseur(fournisseur)
        setShowAddForm(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedFournisseur) {
            router.put(`/suppliers/${selectedFournisseur.id}`, formData);
        } else {
            router.post('/suppliers', formData);
        }
        setShowAddForm(false);
        setFormData({
            name: null,
            telephone: null,
            email: null,
            quantite: null,
            ville: null,
            pays: null,
            // adresse: null

        })

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

                <SideBarBoss sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive} ></SideBarBoss>
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
                                        <h1 className='font-bold text-2xl'>Gestion des Fournisseurs</h1>
                                        <p className='text-text-medium'>Gérez vos partenaires et fournisseurs</p>
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
                                    Ajouter un fournisseur
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* cards */}
                    <div className='md:mx-5 md:p-5 md:mt-36 mt-60 flex md:flex-row flex-col gap-4 items-center md:justify-between'>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-purple-200 flex justify-center items-center rounded-lg'><FiBox size={30} className='text-purple-600'></FiBox></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Total fournisseur</span>
                                <span className='text-3xl font-bold'>{TotalFournisseurs}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'><FiCheck size={30} className='text-green-600'></FiCheck></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Fornisseurs avec produits actifs</span>
                                <span className='text-3xl font-bold'>{totalFournisseursActifs?.total ?? 0}</span>
                            </div>
                        </div>


                    </div>

                    {/* liste des fournisseurs */}

                    <div className="md:mx-10 my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredFournisseurs.map(f => (
                            <div key={f.id} className="bg-white rounded-lg border p-5">
                                <div className="flex justify-between">
                                    <div className="bg-gray-200 h-10 w-10 rounded flex justify-center items-center">
                                        <FiTruck size={25} className='text-text-dark'></FiTruck>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="bg-orange-400 text-white px-5 py-1 rounded-lg" onClick={() => { setSelectedFournisseur(f); handleEdit(f) }}>Modifier</button>
                                        <button className="bg-red-600 text-white px-5 py-1 rounded-lg" onClick={() => handleDelete(f.id)}>Supprimer</button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 mb-5">
                                    <p className="text-xl font-bold">{f.name} </p>
                                    <p className="border text-primary-darker text-sm py-1 px-5 max-w-max bg-purple-50 rounded">{f.type}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="flex gap-2 text-text-medium text-xs"><FiMail size={15} /> {f.email}</p>
                                    <p className="flex gap-2 text-text-medium text-xs"><FiPhone size={15} /> {f.telephone}</p>
                                    <p className="flex gap-2 text-text-medium text-xs"><FiMapPin size={15} /> <span>{f.ville}, {f.pays}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            {showAddForm && (

                <div className='bg-white mx-auto p-5 md:w-1/2 w-full z-50 fixed md:top-1 top-0 left-0 md:left-1/2 md:transform md:-translate-x-1/2 border rounded-lg max-h-[100vh] overflow-auto'>
                    <button className='w-full text-end  flex justify-end'>
                        <FiXCircle className='text-red-500 ' size={30} onClick={() => closeForm()}></FiXCircle>
                    </button>
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className='mb-5 text-xl font-bold '>Ajouter un fourniseur</h1>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Nom du fournisseur<span className='text-red-500'>*</span></label>
                            <input type="text" name="name" id="nom" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.name} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Type de fournisseur <span className='text-red-500'>*</span></label>
                            <select name="type" id="type" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                <option value="alimentaire">Alimentaire</option>
                                <option value="electromenager">Electroménager</option>
                                <option value="informatique">Informatique</option>
                                <option value="textile">Mode et textile</option>
                                <option value="Hygiene">Hygiene</option>
                                <option value="Autres">Autres</option>

                            </select>
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-5 md:mb-3 '>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Email </label>
                                <input type="email" name="email" id="email" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.email} required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>telephone<span className='text-red-500'>*</span></label>
                                <input type="number" name="telephone" id="telephone" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} required />
                            </div>
                        </div>
                        {/* <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Adresse complete </label>
                            <input type="text" name="adresseComplete" id="adresseComplete" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.adresseComplete} onChange={(e) => setFormData({ ...formData, adresseComplete: e.target.value })} />
                        </div> */}
                        <div className='flex flex-col md:flex-row md:gap-5 md:mb-1'>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Ville </label>
                                <input type="text" name="ville" id="ville" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.ville} onChange={(e) => setFormData({ ...formData, ville: e.target.value })} required />
                            </div>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Pays</label>
                                <input type="text" name="pays" id="pays" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.pays} onChange={(e) => setFormData({ ...formData, pays: e.target.value })} required />
                            </div>

                        </div>


                        <div className='flex md:gap-20 gap-4'>
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
        </div >
    )
}

export default GestFournisseur