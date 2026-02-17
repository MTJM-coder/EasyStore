import SidebarEmploye from '@/Layouts/SidebarEmploye'
import React from 'react'
import { FiPlus, FiSearch, FiMenu, FiBox, FiCheck, FiAlertTriangle, FiEdit, FiTrash2, FiSave, FiRefreshCcw, FiXCircle, FiMail, FiPhone, FiMapPin, FiTruck, FiUsers, FiShieldOff, FiClock } from 'react-icons/fi';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaStore } from 'react-icons/fa';
import SideBarAdmin from '@/Layouts/SideBarAdmin';

const GestCommerce = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active,setActive]=useState(2);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const comercants = [
        { id: 1, commercant: "joe lapoubelle", commerce: "Super Market Dupont", telephone: 675432545, email: "joelapoubelle@gmail.com", ville: 'Douala', pays: "cameroun", created_at: "2024-01-01", statut: "actif" },
        { id: 2, commercant: "paul sam", commerce: "Boutique Akwa", telephone: 33333333, email: "paulsam@gmail.com", ville: 'Yaoundé', pays: "cameroun", statut: "actif" },
        { id: 3, commercant: "parie bodd", commerce: "Boutique Akwa", telephone: 44444444, email: "pb@gmail.com", ville: 'Buea', pays: "cameroun", statut: "inactif" },
        { id: 4, commercant: "marie tchou", commerce: "Magasin chaussure buea", telephone: 55555555, email: "mt@gmail.com", ville: 'Edea', pays: "cameroun", statut: "actif" },
        { id: 5, commercant: "jean pierre", commerce: "sopress sarl", telephone: 66666666, email: "jp@gmail.com", ville: 'Bafoussam', pays: "cameroun", statut: "actif" },
        { id: 6, commercant: "marie tchou", commerce: "dodo sarl", telephone: 77777777, email: "mt@gmail.com", ville: 'Bafoussam', pays: 'cameroun', statut: "actif" },
        { id: 7, commercant: "jean marc", commerce: "magasin de produits de base", telephone: 88888888, email: "jm@gmail.com", ville: 'Bafoussam', pays: "cameroun", statut: "actif" },

    ]


    const TotalCommerce = comercants.length
    const TotalCommercesActifs = comercants.filter(e => e.statut === "actif").length
    const TotalCommercesInactifs = comercants.filter(e => e.statut === "inactif").length
    const TotalCommerceEnEssai=0

    const filteredCommerces = comercants.filter(f => f.commercant.toLowerCase().includes(searchTerm.toLowerCase()) || f.ville.toLowerCase().includes(searchTerm.toLowerCase()) || f.commerce.toLowerCase().includes(searchTerm.toLowerCase()))


    const [showAddForm, setShowAddForm] = useState(false)

    const [formData, setFormData] = useState({
        nom: null,
        telephone: null,
        email: null,
        ville: null,
        pays: null,
        commerce: null,
        typeCommerce: null
    })

    const handleDelete = (emploId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce commerçant ?")) {
            router.delete(`/commerces/${emploId}`);
        }
    }

    const handleEdit = (com) => {
        setFormData({
            nom: com.nom,
            telephone: com.telephone,
            email: com.email,
            ville: com.ville,
            pays: com.pays,
            commerce: com.commerce,
            typeCommerce: com.typeCommerce
        })
        setShowAddForm(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.nom && formData.typeCommerce && formData.telephone) {

            if (selectedCommerce) {
                router.put(`/commerces/${selectedCommerce.id}`, formData);
            } else {
                router.post('/commerces', formData);
            }
            setShowAddForm(false);
            setFormData({
                nom: null,
                telephone: null,
                email: null,
                ville: null,
                pays: null,
                commerce: null,
                typeCommerce: null
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

                <SideBarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SideBarAdmin>
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
                                        <h1 className='font-bold text-2xl'>Gestion des Commerçants</h1>
                                        <p className='text-text-medium'>Gérez les comptes commerçants de la plateforme</p>
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
                                    Crée un compte
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* cards */}
                    <div className='md:mx-5 md:p-5 md:mt-36 mt-60 flex md:flex-row flex-col gap-4 items-center md:justify-between'>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-purple-200 flex justify-center items-center rounded-lg'><FaStore size={30} className='text-text-dark'></FaStore></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Total commerces</span>
                                <span className='text-3xl font-bold'>{TotalCommerce}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'><FiCheck size={30} className='text-green-600'></FiCheck></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Comptes actifs</span>
                                <span className='text-3xl font-bold'>{TotalCommercesActifs}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-orange-200 flex justify-center items-center rounded-lg'><FiClock size={30} className='text-orange-600'></FiClock></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>En période d'essai</span>
                                <span className='text-3xl font-bold'>{TotalCommerceEnEssai}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-yellow-100 flex justify-center items-center rounded-lg'><FiShieldOff size={30} className='text-yellow-600'></FiShieldOff></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Comptes suspendus</span>
                                <span className='text-3xl font-bold'>{TotalCommercesInactifs}</span>
                            </div>
                        </div>
                    </div>
                    {/* liste des commerces */}
                    <div className='md:mx-10 my-5 md:p-5 bg-white'>
                        <div className=''>
                            <h1 className='text-2xl font-bold'>Liste des commerces</h1>
                        </div>

                        <hr />
                        <div className='w-full'>
                            <table className='w-full border-collapse overflow-x-auto'>
                                <thead className='bg-gray-50 border-b-[2px]'>
                                    <tr className=''>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Commerçant</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Commerce</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Téléphone</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Inscription</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold uppercase'>Statut</th>



                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold' >ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCommerces.map(com => (
                                        <tr key={com.id} className=''>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem]  flex items-center gap-2'>

                                                <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2'>
                                                    <span className='text-text-dark font-bold'>{com.commercant.charAt(0)}</span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <span className='text-text-dark font-bold'>{com.commercant}</span>
                                                    <span className='text-xs text-text-medium'>{com.email}</span>
                                                </div>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className='text-text-medium'>{com.commerce}</span>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className='text-text-medium'>{com.telephone}</span>
                                            </td>
                                            
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className='text-text-medium'>{com.created_at}</span>
                                            </td>


                                            <td className={`border-b-2 py-[1.25rem] px-[1.5rem] text-sm text-text-medium capitalize font-bold ${com.statut === 'actif' ? 'text-green-600' : 'text-red-600'}`}>{com.statut}</td>
                                            <td className='border-b-2 px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark '>
                                                <button onClick={() => { setSelectedCommerce(com); handleEdit(com) }} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark'><FiEdit className="text-primary-dark" /></button>
                                            </td>
                                            <td className='border-b-2 px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark '>
                                                <button onClick={() => handleDelete(com.id)} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark ml-2'><FiTrash2 className="text-red-500" /></button>
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

                <div className='bg-white mx-auto p-5 w-1/2 z-50 fixed top-0 left-0 border rounded-lg'>
                    <button className='w-full text-end  flex justify-end'>
                        <FiXCircle className='text-red-500 ' size={30} onClick={() => setShowAddForm(false)}></FiXCircle>
                    </button>
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className='my-5 text-xl font-bold '>Créer un compte commerçant</h1>

                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Nom <span className='text-red-500'>*</span></label>
                            <input type="text" name="nom" id="nom" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.nom} required onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Email <span className='text-red-500'>*</span></label>
                            <input type="email" name="email" id="email" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.email} required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Telephone <span className='text-red-500'>*</span></label>
                            <input type="tel" name="telephone" id="telephone" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.telephone} required onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
                        </div>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Nom du commerce <span className='text-red-500'>*</span></label>
                            <input type="text" name="nomCommerce" id="nomCommerce" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.nomCommerce} required onChange={(e) => setFormData({ ...formData, nomCommerce: e.target.value })} />
                        </div>

                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Type de commerce <span className='text-red-500'>*</span></label>
                            <select name="typeCommerce" id="typeCommerce" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.typeCommerce} required onChange={(e) => setFormData({ ...formData, typeCommerce: e.target.value })}>
                                <option value="">Sélectionnez un type</option>
                                <option value="Boutique">Boutique</option>
                                <option value="Marché">Marché</option>
                                <option value="Magasin">Magasin</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>

                        <div className='mt-5 flex gap-10'>
                            <button type="submit" className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg flex gap-2 items-center'>
                                <FiSave></FiSave>
                                Creer un compte
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

export default GestCommerce