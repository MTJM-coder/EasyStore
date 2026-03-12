import React from 'react'
import { useState } from 'react'
import { FaCoins, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaStore, FaUser } from 'react-icons/fa'
import { FiSearch, FiArrowUpRight, FiBox, FiCalendar, FiAlertTriangle, FiArrowDownRight, FiThumbsDown, FiDownloadCloud, FiUploadCloud, FiArchive, FiMenu, FiCheck, FiPlus, FiEdit, FiPause, FiPlay, FiX, FiInfo, FiKey, FiTrash ,FiEye} from 'react-icons/fi'
import SidebarEmploye from '@/Layouts/SidebarEmploye'
import SideBarAdmin from '@/Layouts/SideBarAdmin'

const Logs = ({logs}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [active,setActive]=useState(5);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [userFilter, setUserFilter] = useState("");
    const [periodeFilter, setPeriodeFilter] = useState("");

    const filteredLogs = logs.filter(log => {
        return (
            (typeFilter === "" || log.action.toLowerCase() === typeFilter.toLowerCase()) && 
            (userFilter === "" || log.user.role.toLowerCase() === userFilter.toLowerCase()) &&
            (periodeFilter === "" || log.created_at.includes(periodeFilter))
        );
    }); 
const totalConnexions = logs.filter(log => log.action.toLowerCase() === "connexion").length;
const totalCreations = logs.filter(log => log.action.toLowerCase() === "créé").length;
const totalModifications = logs.filter(log => log.action.toLowerCase() === "modifié").length;
const totalSuppressions = logs.filter(log => log.action.toLowerCase() === "supprimé").length;
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

                    <div className='fixed flex gap-2 w-full bg-white p-5'>

                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                                        <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-2xl'>Logs & Audit</h1>
                                        <p className='text-text-medium'>Historique des connexions et actions critiques</p>
                                    </div>
                                </div>

                            </div>
                            <div className='flex flex-col md:flex-row md:gap-3 gap-1 w-full justify-between'>

                                <div className='md:w-1/4 w-full  flex items-center gap-3'>
                                    <label htmlFor="">Type:</label>
                                    <select
                                        className=' border-[1.5px] border-gray-300 rounded-lg py-2'
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                    >
                                        <option value="">Tous</option>
                                        <option value="connexion">Connexion</option>
                                        <option value="créé">Creation</option>
                                        <option value="modifié">Modification</option>

                                    </select>
                                </div>
                                <div className='md:w-1/4 w-full  flex items-center gap-3'>
                                    <label htmlFor="">Utilisateur:</label>
                                    <select
                                        className='border-[1.5px] border-gray-300 rounded-lg py-2'
                                        onChange={(e) => setUserFilter(e.target.value)}
                                    >
                                        <option value="">Tous </option>
                                        <option value="admin">Admin</option>
                                        <option value="employe">Employé</option>
                                        <option value="commerce">Client</option>
                                    </select>
                                </div>

                                {/* <div className='md:w-1/4 w-full  flex items-center gap-3'>
                                    <label htmlFor="">Période:</label>
                                    <select
                                        className='border-[1.5px] border-gray-300 rounded-lg py-2'
                                        onChange={(e) => setPeriodeFilter(e.target.value)}
                                    >
                                        <option value={''}>Aujourd'hui</option>
                                        <option value="week">Cette semaine</option>
                                        <option value="month">Ce mois</option>
                                        <option value="year">Cette année</option>
                                        <option value="">Tout</option>
                                    </select>
                                </div> */}

                            </div>

                        </div>
                    </div>
                    {/* cards */}
                    <div className='mt-32 px-5 md:mx-5 md:p-5 p-2 flex md:flex-row flex-col gap-5'>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-blue-200 flex justify-center items-center rounded-lg'><FiKey size={30} className='text-blue-600'></FiKey></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Connexions (24h)</span>
                                <span className='text-3xl font-bold'>{totalConnexions}</span>
                            </div>
                        </div>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'><FiCheck size={30} className='text-green-600'></FiCheck></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Créations</span>
                                <span className='text-3xl font-bold'>{totalCreations}</span>
                            </div>
                        </div>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-orange-200 flex justify-center items-center rounded-lg'><FiEdit size={30} className='text-orange-600'></FiEdit></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Modifications</span>
                                <span className='text-3xl font-bold'>{totalModifications}</span>
                            </div>
                        </div>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-red-200 flex justify-center items-center rounded-lg'><FiTrash size={30} className='text-red-600'></FiTrash></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Suppressions</span>
                                <span className='text-3xl font-bold'>{totalSuppressions}</span>
                            </div>
                        </div>
                        <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border md:w-1/3 w-full'>
                            <div className='w-12 h-12 bg-purple-200 flex justify-center items-center rounded-lg'><FiEye size={30} className='text-purple-600'></FiEye></div>
                            <div className='flex flex-col'>
                                <span className='text-text-medium'>Visites</span>
                                <span className='text-3xl font-bold'>{0}</span>
                            </div>
                        </div>
                    </div>
                    {/* table */}
                    <div className='mt-5 px-5 md:mx-5 md:p-5 p-2'>
                        <h1 className='text-2xl font-bold'>Historique des actions</h1>
                        <table className='w-full border-collapse bg-white rounded-lg overflow-hidden'>
                            <thead className='bg-secondary'>
                                <tr>
                                    <th className='text-left p-3 border-b'>Utilisateur</th>
                                    <th className='text-left p-3 border-b'>Role</th>
                                    <th className='text-left p-3 border-b'>Magasin</th>
                                    <th className='text-left p-3 border-b'>Action</th>
                                    <th className='text-left p-3 border-b'>Entité</th>
                                    <th className='text-left p-3 border-b'>Nom de l'entité</th>
                                    <th className='text-left p-3 border-b'>Date & Heure</th>
                                    <th className='text-left p-3 border-b'>IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Exemple de ligne */}
                                {filteredLogs.map((log, index) => (
                                    <tr key={index} className='hover:bg-gray-100 cursor-pointer'>
                                        <td className='p-3 border-b'>{log?.user?.name}</td>
                                        <td className='p-3 border-b'>{log?.user?.role=='commerce'?'Proprietaire':log?.user?.role}</td>
                                         <td className='p-3 border-b'>{log?.commerce?.name}</td>
                                        <td className='p-3 border-b'>{log?.action}</td>
                                        <td className='p-3 border-b'>{log?.entite}</td>
                                        <td className='p-3 border-b'>{log?.entite_name??''}</td>
                                        <td className='p-3 border-b'>{new Date(log?.created_at).toLocaleDateString()} à {new Date(log?.created_at).toLocaleTimeString()}</td>
                                        <td className='p-3 border-b'>{log?.ip_address}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>

                    </div>
                </div>
            </div>
            )
}

            export default Logs