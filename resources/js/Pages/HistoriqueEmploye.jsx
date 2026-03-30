import React from 'react'
import { useState } from 'react'
import SidebarEmploye from '../Layouts/SidebarEmploye'
import { FaFileExport } from 'react-icons/fa'
import { FiBookOpen, FiClock, FiDownload, FiHome, FiUser, FiUpload, FiSearch, FiMenu } from 'react-icons/fi'
import { usePage } from '@inertiajs/react'
import SideBarBoss from '@/Layouts/SideBarBoss'

const HistoriqueEmploye = ({ historiqueMouvements }) => {
    const { auth } = usePage().props
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")
    const [pagesActive, setPagesActive] = useState(1)

    const getRelativeTime = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now - date
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return "à l'instant"
        if (diffMins < 60) return `il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`
        if (diffHours < 24) return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
        if (diffDays < 7) return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
        return date.toLocaleDateString('fr-FR')
    }

    const filteredMouvements = historiqueMouvements.filter(m => {
        const matchesSearch = m.produit.name.toLowerCase().includes(search.toLowerCase()) || (m?.produit?.ref && m.produit?.ref.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus = statusFilter ? m.type === statusFilter : true;
        const matchesDate = dateFilter ? m.date_mouvement.startsWith(dateFilter) : true;
        return matchesSearch && matchesStatus && matchesDate;
    })

    const totalMouvement = historiqueMouvements.length;
    const totalEntrees = historiqueMouvements.filter(m => m.type == "in").length;
    const totalSorties = historiqueMouvements.filter(m => m.type == "out").length;

    const handleExport = () => {
        console.log('Exporting data...');
    }

    const [active, setActive] = useState(6)
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

                    {auth?.user?.role === 'employe' && (
                        <SidebarEmploye sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={5} setActive={setActive}></SidebarEmploye>
                    )}
                    {auth?.user?.role === 'commerce' && (
                        <SideBarBoss sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SideBarBoss>
                    )}
                    <div className={`relative md:ml-64 w-full mb-20 md:bg-secondary bg-white md:text-sm text-xs ${sidebarOpen ? 'overflow-auto text-xs bg-white' : ''} `}>
                        {/* entete de la parle */}

                        <div className='fixed flex gap-2 w-full bg-white p-5'>

                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-5'>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                                            <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                                        </div>
                                        <div className='flex flex-col'>
                                            <h1 className='font-bold text-2xl'>Historique des Mouvements</h1>
                                            <p className='text-text-medium'>Consultez l'ensemble des entrées et sorties de stock</p>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex flex-col md:flex-row md:gap-3 gap-1 w-full'>

                                    <div className='md:w-1/3 w-full relative'>
                                        <FiSearch className='absolute mt-3 ml-3 text-gray-400' />
                                        <input
                                            onChange={(e) => setSearch(e.target.value)}
                                            type="text"
                                            className='border-[1.5px] border-gray-300 rounded-lg w-full pl-10 py-2'
                                            placeholder='Rechercher un produit par nom ou reference'
                                        />
                                    </div>

                                    <select
                                        className='md:w-1/4 w-full border-[1.5px] border-gray-300 rounded-lg py-2'
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="">Tous les mouvements</option>
                                        <option value="in">Entrées uniquement</option>
                                        <option value="out">Sorties uniquement</option>
                                    </select>

                                    <input type="date" placeholder='entrez une date' className='md:w-1/4 w-full border-[1.5px] border-gray-300 rounded-lg py-2'
                                        onChange={(e) => setDateFilter(e.target.value)}
                                    />
{/* 

                                    <button
                                        className='md:w-auto w-full bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2'
                                        onClick={() => handleExport()}
                                    >
                                        <FaFileExport />
                                        Exporter
                                    </button> */}

                                </div>

                            </div>
                        </div>
                        {/* corps de la page */}
                        <div className=''>
                            {/* les cartes */}
                            <div className='flex md:flex-row flex-col md:justify-between gap-3 mt-40 md:px-5'>
                                <div className='flex md:flex-row flex-col gap-3 px-5 justify-between w-full'>
                                    <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3'>
                                        <div className='w-12 h-12 bg-purple-200 flex justify-center items-center rounded-lg'><FiBookOpen size={30} className='text-purple-500'></FiBookOpen></div>
                                        <div className='flex flex-col'>
                                            <span className='text-text-medium'>Tous les mouvements</span>
                                            <span className='text-3xl font-bold'>{totalMouvement}</span>
                                        </div>
                                    </div>

                                    {/* stock suffisant */}
                                    <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3'>
                                        <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'>
                                            <FiDownload size={30} className='text-green-500'></FiDownload>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-text-medium'>Entrées</span>
                                            <span className='text-3xl font-bold'>{totalEntrees}</span>
                                        </div>
                                    </div>

                                    {/* stok faible */}
                                    <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3'>
                                        <div className='w-12 h-12 bg-red-200 flex justify-center items-center rounded-lg'>
                                            <FiUpload size={30} className='text-red-500'></FiUpload>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-text-medium'>Sorties</span>
                                            <span className='text-3xl font-bold'>{totalSorties}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* liste des produits */}

                            <div className='md:mx-10 my-5 md:p-5 py-5 px-2 bg-white rounded-lg border'>
                                <div className=''>
                                    <h1 className='ms:text-2xl text-xl font-bold'>Chronologie des mouvements</h1>
                                </div>

                                <hr />
                                <div className='w-full flex flex-col gap-10 rounded-lg mt-5'>
                                    {filteredMouvements.map(m => (
                                        <div key={m.id} className='flex gap-2 hover:ml-2 transition-all duration-300 w-full rounded-lg '>
                                            <div className={`h-5 w-5 border-2 rounded-full p-2 flex justify-center items-center ${m.type === "out" ? "border-red-500 " : "border-green-500"}`}>
                                                <div className={`h-4 w-4 rounded-full ${m.type === "out" ? "bg-red-500" : "bg-green-500"}`}></div>
                                            </div>
                                            <div className='border  shadow-sm p-5 w-full rounded-lg bg-gray-50'>
                                                <p className='flex justify-between items-center'>
                                                    <span className='font-bold text-text-dark text-xl'>{m?.produit?.name}</span>
                                                    {m.type === "out" ? (
                                                        <span className='text-red-500 font-bold text-2xl'>{m.quantity_change}</span>
                                                    ) : (
                                                        <span className='text-green-500 font-bold text-2xl'>+ {m.quantity_change}</span>
                                                    )}
                                                </p>
                                                <div className='flex md:flex-row flex-col md:gap-10 gap-3 md:items-center'>
                                                    <p className={`mt-3 md:mb-1 capitalize inline-block max-w-max px-3 py-1 rounded ${m.type === "out" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}`}>{m.type==='in'?'Entrée':'Sortie'}</p>
                                                    {m.type === "out" ?
                                                        (
                                                            <p className='inline-block max-w-max px-3 py-1 mt-2 border border-blue-300 text-blue-800 rounded '>{m?.motif}</p>
                                                        ) :
                                                        (
                                                            <p className='flex gap-2 items-center text-text-medium'>
                                                                <FiHome></FiHome>
                                                                <span>{m?.fournisseur?.name}</span>
                                                            </p>
                                                        )}

                                                    <p className='flex gap-2 items-center text-text-medium'>
                                                        <FiUser></FiUser>
                                                        <span>{m?.user?.name}</span>
                                                    </p>
                                                    <p className='flex gap-2 items-center text-text-medium'>
                                                        <FiClock></FiClock>
                                                        <span>{getRelativeTime(m.created_at)} </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoriqueEmploye