import SideBarBoss from '@/Layouts/SideBarBoss'
import React from 'react'
import { FiPlus, FiSearch, FiMenu, FiBox, FiCheck, FiAlertTriangle, FiEdit, FiTrash2, FiSave, FiRefreshCcw, FiXCircle, FiMail, FiPhone, FiMapPin, FiTruck, FiCloudLightning, FiArrowDown, FiArrowUp, FiMove, FiSettings, FiDollarSign, FiUsers, FiBarChart, FiFile } from 'react-icons/fi';
import { useState } from 'react';
import { router } from '@inertiajs/react';



const Rapport = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active, setActive] = useState(5);
    const [rapportSelect, setRapportSelect] = useState(null);
    const typeRapport = [
        { type: "Rapport du stock actuel", description: "Liste des produits, quantités disponibles, seuils de réapprovisionnement et produits en rupture.", icon: <FiBox size={40}></FiBox> },
        { type: "Rapport des entrées de stock", description: "Produits approvisionnés, quantités entrées, fournisseurs et dates sur la période sélectionnée.", icon: <FiArrowDown size={40}></FiArrowDown> },
        { type: "Rapport des sorties de stock", description: "Produits sortis, quantités, motifs de sortie (vente, perte, casse) et dates associées.", icon: <FiArrowUp size={40}></FiArrowUp> },
        { type: "Rapport des mouvements de stock", description: "Ensemble des entrées et sorties, produits concernés, utilisateurs et dates des opérations.", icon: <FiMove size={40}></FiMove> },
        { type: "Rapport par produit", description: "Pour un produit : stock initial, total des entrées, total des sorties et stock actuel.", icon: <FiBox size={40}></FiBox> },
        { type: "Rapport par fournisseur", description: "Produits fournis, quantités livrées, fréquence des approvisionnements et périodes de livraison.", icon: <FiTruck size={40}></FiTruck> },
        { type: "Rapport des produits sous seuil", description: "Produits dont la quantité est inférieure au seuil de réapprovisionnement pour anticiper les ruptures.", icon: <FiAlertTriangle size={40}></FiAlertTriangle> },
        { type: "Rapport des ajustements de stock", description: "Corrections manuelles effectuées, utilisateurs concernés, motifs et dates de modification.", icon: <FiSettings size={40}></FiSettings> },
        { type: "Rapport d'activité des employés", description: "Nombre d'opérations par employé, types d'actions effectuées et période d'activité.", icon: <FiUsers size={40}></FiUsers> },
        { type: "Rapport de valeur estimative du stock", description: "Valeur globale du stock et valeur des entrées/sorties à partir des prix unitaires.", icon: <FiDollarSign size={40}></FiDollarSign> }
    ]

    const genererRapport = (type) => {
        alert(`Génération du rapport ${type}...`);
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
                                        <h1 className='font-bold text-2xl'>Génération de Rapports</h1>
                                        <p className='text-text-medium'>Créez des rapports d'analyse personnalisés</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className='md:mx-5 md:p-5 p-2 md:mt-36 mt-40 flex items-center gap-5 bg-blue-100 border-blue-500 border rounded-lg mx-3'>
                        <FiCloudLightning size={24} className='text-yellow-600'></FiCloudLightning>
                        <p className=''>
                            <h1 className='text-blue-800 font-bold '>Comment ça marche ?</h1>
                            <p className='text-blue-500 text-sm'>Sélectionnez le type de rapport souhaité, définissez la période d'analyse, puis choisissez le format d'export (PDF ou Excel). Vos rapports seront générés instantanément.</p>
                        </p>
                    </div>


                    <div className='md:m-5 m-2 md:p-5 p-2 bg-white rounded-lg'>
                        <h1 className='text-xl font-bold mb-5'>1. Sélectionnez le type de rapport</h1>

                        <div className="  grid md:grid-cols-2 grid-cols-1 gap-4  ">

                            {typeRapport.map((rapport, index) => (
                                <div
                                    key={index}
                                    className={`p-7 hover:bg-purple-100 hover:border-[1.5px] hover:border-primary-dark hover:shadow-md cursor-pointer border-2 rounded-lg bg-white ${rapportSelect === rapport.type ? 'bg-purple-50 border-primary-dark' : ''
                                        }`}
                                    onClick={() => setRapportSelect(rapport.type)}
                                >
                                    <div className="flex items-center gap-3">
                                        {rapport.icon}
                                        <div>
                                            <h2 className="font-bold text-xl">{rapport.type}</h2>
                                            <p className="text-sm text-text-medium">{rapport.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='md:m-5 m-2  md:p-5 p-2 rounded-lg border bg-white'>
                        <h1 className='text-xl font-bold'>2. Définissez la période d'analyse</h1>
                        <div className='flex md:flex-row flex-col items-center  gap-4 mt-4'>
                            <div className='flex flex-col w-full'>
                                <label className='text-sm font-medium uppercase text-text-medium'>Date de début</label>
                                <input type="date" className='p-2 rounded-md bg-gray-50 border-[1.5px] border-gray-200' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='text-sm font-medium uppercase text-text-medium'>Date de fin</label>
                                <input type="date" className='p-2 rounded-md bg-gray-50 border-[1.5px] border-gray-200' />
                            </div>
                        </div>
                    </div>

                    <div className='md:m-5 m-2 md:p-5 p-2 rounded-lg border bg-white'>
                        <h1 className='text-xl font-bold'>3. Choisissez le format d'export</h1>
                        <div className='flex items-center gap-4 mt-4'>
                            <button className='flex items-center gap-3 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark' onClick={()=>genererRapport('pdf')}><FiFile className='mr-2'></FiFile>Générer en PDF</button>
                            <button className='flex items-center gap-3 bg-secondary text-primary px-4 py-2 rounded-md hover:bg-secondary-dark' onClick={()=>genererRapport('excel')}><FiBarChart className='mr-2'></FiBarChart>Générer en Excel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rapport