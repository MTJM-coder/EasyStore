import React from 'react'
import SidebarEmploye from '@/Layouts/SidebarEmploye'
import { FiAlertTriangle, FiArrowDownRight, FiArrowUpRight, FiCalendar, FiDownloadCloud, FiUploadCloud, FiArchive, FiBox, FiMenu, } from 'react-icons/fi'
import { FaCoins } from 'react-icons/fa'
import { MdEmergency } from 'react-icons/md'
import { useState } from 'react'
import SideBarBoss from '@/Layouts/SideBarBoss'

const DashboardCommercant = (props) => {
    const { totalProduits, totalProduitsRupture, dernieresMouvements, ProduitCritique, totalvaleurStock, alertes, statsWeek } = props
    const totalSousSeuil = ProduitCritique.filter(p => p.current_quantity <= p.seuil).length
    const date = new Date()
    const dateFormatee = date.toLocaleDateString('fr-FR', {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const joursLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    const statWeek = joursLabels.map((jour, index) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - index))
        const dateStr = date.toISOString().split('T')[0]

        const entree = statsWeek.find(s => s.jour === dateStr && s.type === 'in')
        const sortie = statsWeek.find(s => s.jour === dateStr && s.type === 'out')

        return {
            jour,
            entree: entree?.total ?? 0,
            sortie: sortie?.total ?? 0,
        }
    })
     // Formater la valeur du stock
    const formatMontant = (montant) => {
        if (montant >= 1000000) return (montant / 1000000).toFixed(1) + 'M'
        if (montant >= 1000) return (montant / 1000).toFixed(0) + 'K'
        return montant
    }

    const maxValue = Math.max(...statsWeek.map(s => Math.max(s.entree, s.sortie)));


    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [active, setActive] = useState(1)


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
                <div className='relative md:ml-64 bg-secondary max-w-max mb-20'>
                    <div className='fixed z-40 flex items-center w-full gap-5 pl-5 md:pr-64 justify-between bg-white p-5'>
                        <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl'>Tableau de bord</h1>
                            <p className='text-text-medium'>Vue globale de votre commerce</p>
                        </div>
                        <p className='flex gap-3 items-center border border-primary-dark bg-purple-200 text-primary px-5 md:py-2 rounded-lg mr-4'>
                            <FiCalendar></FiCalendar>
                            {dateFormatee.charAt(0).toUpperCase() + dateFormatee.slice(1)}
                        </p>
                    </div>

                    {/* corps du dashboard */}
                    <div className=''>
                        {/* card */}
                        <div className='flex md:flex-row flex-col md:justify-between gap-3 md:mt-28 mt-38 px-5'>
                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-3'>
                                        <span className='text-text-medium text-sm'>Stock global</span>
                                        <div className='w-14 h-14 bg-purple-200 flex justify-center items-center rounded-lg'><FiBox size={20} className='text-text-dark'></FiBox></div>
                                    </div>
                                    <p>
                                        <span className='inline-block text-3xl font-bold my-3'>{totalProduits}</span>
                                        {/* <span className='flex items-center text-green-500 text-xs'><FiArrowUpRight></FiArrowUpRight> +3 </span>
                                        <span className='text-green-500 text-sm'>Aujourd'hui</span> */}
                                    </p>
                                </div>
                            </div>

                            {/* valeur en stock */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-3'>
                                        <span className='text-text-medium'>Valeur en stock</span>
                                        <div className='w-14 h-14 bg-green-200 flex justify-center items-center rounded-lg'><FaCoins size={20} className='text-text-dark'></FaCoins></div>
                                    </div>

                                    <p>
                                        <span className='text-3xl font-bold'>{formatMontant(totalvaleurStock)}  FCFA</span>
                                        {/* <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +8.5% </span> */}
                                        {/* <span className='text-green-500'>Aujourd'hui</span> */}
                                    </p>
                                </div>
                            </div>

                            {/* Alertes actives */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-3'>
                                        <span className='text-text-medium'>Produits sous seuil</span>
                                        <div className='w-14 h-14 bg-yellow-200 flex justify-center items-center rounded-lg'><FiAlertTriangle size={20} className='text-text-dark'></FiAlertTriangle></div>
                                    </div>

                                    <p>
                                        <span className='text-3xl font-bold'>{totalSousSeuil}</span>
                                        {/* <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> +3 </span>
                                                    <span className='text-green-500'>Aujourd'hui</span> */}
                                        {/* <span className='flex items-center text-red-500'><FiArrowDownRight></FiArrowDownRight> -3 </span>
                                        <span className='text-red-500'>Depuis hier</span> */}
                                    </p>
                                </div>
                            </div>

                            {/* Sorties Aujourd'hui */}

                            <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-1'>
                                        <span className='text-text-medium'>Rupture de stock</span>
                                        <div className='w-14 h-14 bg-red-200 flex justify-center items-center rounded-lg'>
                                            <MdEmergency size={20} className='text-red-500'></MdEmergency>
                                        </div>
                                    </div>

                                    <p>
                                        <span className='text-3xl font-bold'>{totalProduitsRupture}</span>
                                        {/* <span className='flex items-center text-green-500'><FiArrowUpRight></FiArrowUpRight> </span>
                                        <span className='text-green-500'>vs hier</span> */}
                                    </p>
                                </div>
                            </div>


                        </div>
                        {/* statistiques */}
                        <div className='flex md:flex-row flex-col gap-4 mt-10 mx-5'>
                            <div className='border rounded-lg md:w-2/3 w-full bg-white p-5'>
                                <h1 className='font-bold text-xl mb-5'>Statistiques de la semaine</h1>
                                <div>
                                    {statWeek.map(sw => (
                                        <div key={sw.jour} className='flex justify-between p-3 gap-5 items-center'>

                                            {/* Jour */}
                                            <p className='font-bold inline-block w-1/2 px-2 py-1'>
                                                {sw.jour}
                                            </p>

                                            {/* Entrée */}
                                            <div className='bg-gray-200 rounded w-full relative h-8'>


                                                <div
                                                    style={{ width: `${sw.entree / maxValue * 100}%` }}
                                                    className='h-8 bg-green-500 rounded'
                                                ></div>


                                                <span className='absolute inset-0 flex items-center justify-end pr-2 font-bold text-gray-500 whitespace-nowrap'>
                                                    Entrée: {sw.entree}
                                                </span>

                                            </div>


                                            {/* Sortie */}
                                            <div className='bg-gray-200 rounded w-full relative h-8'>


                                                <div
                                                    style={{ width: `${sw.sortie / maxValue * 100}%` }}
                                                    className='h-8 bg-red-500 rounded'
                                                ></div>


                                                <span className='absolute inset-0 flex items-center justify-end pr-2 font-bold text-gray-500 whitespace-nowrap'>
                                                    Sortie: {sw.sortie}
                                                </span>

                                            </div>

                                        </div>
                                    ))}
                                </div>


                            </div>
                            <div className='border rounded-lg md:w-1/3 w-full bg-white p-5'>
                                <h1 className='font-bold text-xl mb-5'>Produits critiques</h1>
                                {ProduitCritique.map(pc => (
                                    <div key={pc.id} className='flex items-center justify-between p-5'>
                                        <p className='font-bold'>{pc.name}</p>
                                        <p className={`font-bold ${pc.current_quantity < pc.seuil - 5 ? 'text-red-500' : 'text-orange-700'}`}>{pc.current_quantity}</p>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* alertes */}

                        <div className='flex flex-col p-5 gap-4 bg-white mt-10 border mx-5 rounded-lg'>
                            <div className='flex justify-between'>
                                <p className='ml-5 font-bold text-2xl'>Alertes et notifications</p>
                                <p>{alertes.length} {alertes.length > 1 ? 'Alertes actives' : 'Alerte active'} </p>
                            </div>
                            {alertes.map(alerte => {
                                const enRupture = alerte.current_quantity === 0
                                const critique = alerte.current_quantity < alerte.seuil / 2

                                const getNiveau = () => {
                                    if (enRupture) return 'Rupture de stock'
                                    if (critique) return 'Stock critique'
                                    return 'Stock faible'
                                }

                                const getDescription = () => {
                                    if (enRupture) return 'Produit en rupture, réapprovisionnez rapidement'
                                    if (critique) return 'En dessous du seuil minimum de réapprovisionnement'
                                    return 'Seuil de réapprovisionnement atteint'
                                }

                                const isDanger = enRupture || critique

                                return (
                                    <div key={alerte.id} className={`border p-5 flex rounded-lg items-center justify-between hover:ml-3 duration-300 ${isDanger ? 'bg-red-100 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                        <div className='flex items-center gap-4'>
                                            <div className={`w-10 h-10 flex justify-center items-center rounded-lg ${isDanger ? 'bg-red-200 text-red-600' : 'bg-yellow-200 text-yellow-600'}`}>
                                                {isDanger ? <MdEmergency /> : <FiAlertTriangle />}
                                            </div>
                                            <div>
                                                <p className='font-bold'>{alerte.name}</p>
                                                <p className='flex items-center gap-3 text-text-medium text-sm'>
                                                    <span className='font-bold'>{getNiveau()}</span>
                                                    <span>---</span>
                                                    <span>{getDescription()}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`font-bold text-end ${isDanger ? 'text-red-600' : 'text-yellow-600'}`}>
                                            {alerte.current_quantity} {alerte.unit}(s) restant
                                        </div>
                                    </div>
                                )
                            })}

                        </div>


                    </div>
                </div>

            </div>
        </div>
        // </div >
    )
}

export default DashboardCommercant