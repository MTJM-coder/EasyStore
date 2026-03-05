import SidebarEmploye from '@/Layouts/SidebarEmploye'
import SideBarBoss from '@/Layouts/SidebarBoss'
import React from 'react'
import { FiPlus, FiSearch, FiMenu, FiBox, FiCheck, FiAlertTriangle, FiEdit, FiTrash2, FiSave, FiRefreshCcw, FiXCircle } from 'react-icons/fi';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

const ProduitsBoss = ({ produits }) => {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active, setActive] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduit, setSelectedProduit] = useState(null);

    const getBadge = (produit) => {
       if(produit.current_quantity==0){
        return "rupture"
       }
       else if(produit.current_quantity<=produit.seuil){
        return "faible"
       }
       else{
        return "suffisant"
       }
       
        
    }
    const TotalProduits = produits.length
    const TotalProduitsSuffisant = produits.filter(p => p.current_quantity > p.seuil).length
    const TotalAlertes = produits.filter(p => p.current_quantity <= p.seuil && p.current_quantity > 0).length

    const filteredProduits = produits.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.ref.toLowerCase().includes(searchTerm.toLowerCase()))

    const [pagesActive, setPagesActive] = useState(1)
    const nombreProduitParPage = 20
    const nbrePages = Math.ceil(filteredProduits.length / nombreProduitParPage);
    const numeroPages = [];
    for (let i = 1; i <= nbrePages; i++) {
        numeroPages.push(i);
    }

    const produitsAfficher = filteredProduits.slice((pagesActive - 1) * nombreProduitParPage, (pagesActive * nombreProduitParPage))
    const [showAddForm, setShowAddForm] = useState(false)

    const [formData, setFormData] = useState({
        name: null,
        ref: null,
        seuil: null,
        current_quantity: null,
        purchasing_price: null,
        selling_price: null
    })


    const handleDelete = (produitId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            router.delete(`/products/${produitId}`);
        }
    }

    const handleEdit = (produit) => {
        setFormData({
            name: produit.name,
            ref: produit.ref,
            seuil: produit.seuil,
            current_quantity: produit.current_quantity,
            purchasing_price: produit.purchasing_price,
            selling_price: produit.selling_price
        })
        setShowAddForm(true)
    }

    const closeForm = () => {
        setShowAddForm(false);
        setSelectedProduit(null);
        setFormData({
            name: null,
            ref: null,
            seuil: null,
            current_quantity: null,
            purchasing_price: null,
            selling_price: null
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.ref && formData.seuil && formData.current_quantity) {
            if (selectedProduit) {
                router.put(`/products/${selectedProduit.id}`, formData);
            } else {
                router.post('/products', formData);
            }
            setShowAddForm(false);
            setFormData({
                name: null,
                ref: null,
                seuil: null,
                current_quantity: null,
                purchasing_price: null,
                selling_price: null
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

                {auth.user.role === 'commerce' && (
                    <SideBarBoss sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SideBarBoss>
                )}

                {auth.user.role === 'employee' && (
                    <SidebarEmploye sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SidebarEmploye>
                )}
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
                                        <h1 className='font-bold text-2xl'>Gestion des Produits</h1>
                                        <p className='text-text-medium'>Ajoutez, modifiez et gérez votre catalogue de produits</p>
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
                                        placeholder='Rechercher un produit par nom ou reference'
                                    />
                                </div>

                                <button
                                    className='md:w-auto w-full bg-primary text-white px-4 py-2 rounded-lg flex items-center md:justify-center justify-start gap-2 whitespace-nowrap font-bold'
                                    onClick={() => setShowAddForm(true)}
                                >
                                    <FiPlus />
                                    Ajouter un produit
                                </button>

                            </div>



                        </div>
                    </div>

                    {/* cards */}
                    <div className='md:mx-5 md:p-5 md:mt-36 mt-60 flex md:flex-row flex-col gap-4 items-center md:justify-between'>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-purple-200 flex justify-center items-center rounded-lg'><FiBox size={30} className='text-purple-600'></FiBox></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Total prodits</span>
                                <span className='text-3xl font-bold'>{TotalProduits}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'><FiCheck size={30} className='text-green-600'></FiCheck></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Stock suffisant</span>
                                <span className='text-3xl font-bold'>{TotalProduitsSuffisant}</span>
                            </div>
                        </div>

                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-yellow-100 flex justify-center items-center rounded-lg'><FiAlertTriangle size={30} className='text-yellow-600'></FiAlertTriangle></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Alertes actives</span>
                                <span className='text-3xl font-bold'>{TotalAlertes}</span>
                            </div>
                        </div>
                    </div>

                    {/* liste des produits */}

                    <div className='md:mx-10 my-5 md:p-5 bg-white'>
                        <div className=''>
                            <h1 className='text-2xl font-bold'>Liste des produits</h1>
                        </div>

                        <hr />
                        <div className='w-full'>
                            <table className='w-full border-collapse overflow-x-auto'>
                                <thead className='bg-gray-50 border-b-[2px]'>
                                    <tr className=''>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>PRODUIT</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>REFERENCE</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>QUANTITE DISPONNIBLE</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>SEUIL DE REAPPRO.</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>STATUT</th>
                                        <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold' colSpan={2}>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produitsAfficher.map(produit => (
                                        <tr key={produit.reference} className=''>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem]  flex flex-col items-center '>
                                                <span className='text-text-dark font-bold'>{produit.name}</span>
                                                {/* <span className='text-xs text-text-medium'>{produit.categorie}</span> */}
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>
                                                <span className='text-text-medium'>{produit.ref}</span>
                                            </td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] '>

                                                {getBadge(produit) == "suffisant" && (
                                                    <div className='flex items-center gap-4 rounded border justify-center py-1 bg-green-200 text-green-800 font-bold max-w-max px-5'>

                                                        <span>{produit.current_quantity} unités</span>
                                                    </div>
                                                )}

                                                {getBadge(produit) == "faible" && (
                                                    <div className='flex items-center gap-4 rounded border justify-center py-1 bg-yellow-100 text-yellow-800 font-bold max-w-max px-5'>
                                                        <span>{produit.current_quantity} unités</span>
                                                    </div>
                                                )}

                                                {getBadge(produit) == "rupture" && (
                                                    <div className='flex items-center gap-4 rounded border justify-center py-1 bg-red-200 text-red-800 font-bold max-w-max px-5'>
                                                        <span>{produit.current_quantity ?? 0} unité</span>
                                                    </div>
                                                )}


                                            </td>

                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem] text-sm text-text-medium '>{produit.seuil} unités</td>
                                            <td className='border-b-2 py-[1.25rem] px-[1.5rem]  '>
                                                <span className={`${getBadge(produit) == "suffisant" ? "text-green-500" : getBadge(produit) == "faible" ? "text-yellow-500" : "text-red-500"} font-bold`}>{getBadge(produit)}</span>
                                            </td>
                                            <td className='border-b-2 px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark '>
                                                <button onClick={() => { setSelectedProduit(produit); handleEdit(produit) }} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark'><FiEdit className="text-primary-dark" /></button>
                                            </td>
                                            <td className='border-b-2 px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark '>
                                                <button onClick={() => handleDelete(produit.id)} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark ml-2'><FiTrash2 className="text-red-500" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className='flex gap-5 justify-end mt-5'>


                                {pagesActive > 1 && <button onClick={() => setPagesActive(pagesActive - 1)} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark'>&lt;</button>
                                }
                                {numeroPages.map(num =>
                                (
                                    <button key={num} onClick={() => setPagesActive(num)} className={`border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark ${pagesActive == num && 'border-primary text-primary border-2'}`}>{num}</button>
                                ))}
                                {pagesActive < nbrePages && <button onClick={() => setPagesActive(pagesActive + 1)} className='border px-4 py-1 rounded-lg bg-white text-text-medium hover:border-primary-darker hover:text-primary-dark'>&gt;</button>
                                }

                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {showAddForm && (

                <div className='bg-white mx-auto p-5 w-1/2 z-50 fixed top-0 left-0 border rounded-lg'>
                    <button className='w-full text-end  flex justify-end'>
                        <FiXCircle className='text-red-500 ' size={30} onClick={() => closeForm()}></FiXCircle>
                    </button>
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className='my-5 text-xl font-bold '>Ajouter un produit</h1>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="" className='text-text-medium font-bold uppercase'>Nom du produit <span className='text-red-500'>*</span></label>
                            <input type="text" name="name" id="name" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.name} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-5 md:mb-3 '>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Reference <span className='text-red-500'>*</span></label>
                                <input type="text" name="ref" id="ref" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.ref} required onChange={(e) => setFormData({ ...formData, ref: e.target.value })} />
                            </div>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Categorie</label>
                                <select name="categorie" id="categorie" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.categorie} onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}>
                                    <option value="alimentaire">Alimentaire</option>
                                    <option value="electromenager">Electroménager</option>
                                    <option value="informatique">Informatique</option>
                                    <option value="textile">Textile</option>
                                    <option value="Hygiene">Hygiene</option>
                                    <option value="Autres">Autres</option>

                                </select>
                            </div>
                        </div>
                        {selectedProduit?(
                            <div className='mb-3 flex flex-col'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Seuil de réapprovisionnement <span className='text-red-500'>*</span></label>
                                <input type="number" name="seuilReapprovisionnement" id="seuilReapprovisionnement" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.seuil} onChange={(e) => setFormData({ ...formData, seuil: e.target.value })} required />
                            </div>

                        ) :
                        (
                            <div className='flex flex-col md:flex-row md:gap-5 md:mb-3'>
                                <div className='mb-3 flex flex-col md:w-1/2'>
                                    <label htmlFor="" className='text-text-medium font-bold uppercase'>Quantite initiale <span className='text-red-500'>*</span></label>
                                    <input type="number" name="quantiteInitiale" id="quantiteInitiale" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.current_quantity} onChange={(e) => setFormData({ ...formData, current_quantity: e.target.value })} required />
                                </div>
                                <div className='mb-3 flex flex-col md:w-1/2'>
                                    <label htmlFor="" className='text-text-medium font-bold uppercase'>Seuil de réapprovisionnement <span className='text-red-500'>*</span></label>
                                    <input type="number" name="seuilReapprovisionnement" id="seuilReapprovisionnement" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.seuil} onChange={(e) => setFormData({ ...formData, seuil: e.target.value })} required />
                                </div>
                            </div>
            )}
            
            

                        <div className='flex flex-col md:flex-row md:gap-5 md:mb-3'>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Prix unitaire d'achat(FCFA) </label>
                                <input type="number" name="prixUnitaireAchat" id="prixUnitaireAchat" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.purchasing_price} onChange={(e) => setFormData({ ...formData, purchasing_price: e.target.value })} />
                            </div>
                            <div className='mb-3 flex flex-col md:w-1/2'>
                                <label htmlFor="" className='text-text-medium font-bold uppercase'>Prix unitair de vente </label>
                                <input type="number" name="prixUnitaireVente" id="prixUnitaireVente" className='border-[1.5px] border-gray-300 rounded-lg bg-gray-50' value={formData.selling_price} onChange={(e) => setFormData({ ...formData, selling_price: e.target.value })} />
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
        </div >
    )
}

export default ProduitsBoss