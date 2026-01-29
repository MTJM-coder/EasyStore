import React from 'react'
import { useState, useEffect } from 'react'
import { FiBarChart, FiBox, FiUsers,FiAlertTriangle, FiSmartphone, FiShield } from "react-icons/fi";


const Welcome = () => {
    const [showFirst, setShowFirst] = useState(false)
    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirst(prev => !prev);
        }, 300)
        return clearInterval(interval);
    }, [])

    const [showMenu, setShowMenu] = useState(true);
    return (
        <div className=''>
            <div className='flex md:justify-between px-7 items-center  bg-gray-50 top-0 left-0 z-50 w-full fixed h-28 py-5 '>
                <div className="md:hidden text-2xl cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? "X" : "☰"}
                </div>
                <div className='md:text-3xl text-2xl font-bold md:ml-0 ml-14'>
                    <span className='text-primary-dark font-bold'>Easy</span>Store
                </div>
                <div className={`hidden md:inline-block`}>
                    <ul className='flex gap-12 text-text-medium font-bold text-xl'>
                        <li><a href="#accueil" className='hover:border-b-2 border-primary-dark pb-2 transition-colors duration-300 ease-in-out'>Accueil</a></li>
                        <li><a href="#fonctionnalites" className='hover:border-b-2 border-primary-dark pb-2 transition-colors duration-300 ease-in-out'>Fonctionnalités</a></li>
                        <li><a href="#tarifs" className='hover:border-b-2 border-primary-dark pb-2 transition-colors duration-300 ease-in-out'>Tarifs</a></li>
                        <li><a href="#contact" className='hover:border-b-2 border-primary-dark pb-2 transition-colors duration-300 ease-in-out'>Contact</a></li>
                    </ul>
                </div>
                <div className='hidden md:flex gap-5 '>
                    <button className='px-6 py-3  border-2 border-purple-500 rounded-lg font-bold text-primary hover:bg-primary-dark hover:text-white'>Se connecter</button>
                    <button className='px-6 py-3 border-2 bg-primary-darker text-white border-primary-darker rounded-lg font-bold'>Essai gratuit</button>
                </div>

                {/* menu responsive */}
                {showMenu && (
                    <div className="fixed top-28 left-0 w-full bg-white shadow-lg md:hidden">
                        <ul className="flex flex-col items-center gap-8 py-10 text-xl font-bold">
                            <li><a onClick={() => setShowMenu(false)} href="#accueil">Accueil</a></li>
                            <li><a onClick={() => setShowMenu(false)} href="#fonctionnalites">Fonctionnalités</a></li>
                            <li><a onClick={() => setShowMenu(false)} href="#tarifs">Tarifs</a></li>
                            <li><a onClick={() => setShowMenu(false)} href="#contact">Contact</a></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='flex md:flex-row flex-col bg-gradient-to-r from-pink-50 to-orange-50 lg:w-full md:h-[100vh] max-h-max pt-36 px-10'>
                <div className='lg:w-1/2 md:text-left text-center'>
                    <div className='md:mb-20 mb-10 border-2 border-primary-darker w-max py-2 px-4 bg-purple-100 text-primary-darker font-bold  rounded-3xl '>solution SAAS pour PME</div>
                    <h1 className='md:text-6xl text-3xl font-bold mb-9'>Gérez votre stock <span className='text-primary'>en toute simplicité</span></h1>
                    <p className='text-text-medium text-xl'>EasyStore transforme la gestion de votre inventaire avec une plateforme intuitive, sécurisée et accessible depuis n'importe quel appareil. Dites adieu aux erreurs et aux ruptures de stock.</p>
                    <div className='mt-10 flex gap-8 md:flex-row flex-col mb-10'>
                        <button className='px-6 py-3 border-2 bg-primary-darker text-white border-primary-darker rounded-lg font-bold'>Commencer gratuitement</button>
                        <button className='px-6 py-3  border-2 border-purple-500 rounded-lg font-bold text-primary hover:bg-primary-dark hover:text-white'>Voir la démo</button>
                    </div>
                </div>
                <div className='animate-float md:lg:w-1/2 w-[100%] bg-white rounded-2xl max-h-max shadow-lg'>
                    <div className='rounded-lg  px-5 flex flex-col gap-10 py-10'>
                        <div className='md:justify-between md:gap-0 gap-3 flex px-7 rounded-xl border-l-8 border-primary text-text-dark font-bold md:text-[20px] text-sm bg-gradient-to-r from-white to-orange-50 py-4'>
                            <p>Produits en stock :</p>
                            <p className='text-primary-dark'>247</p>
                        </div>
                        <div className='md:justify-between md:gap-0 gap-3 flex px-7 rounded-xl border-l-8 border-primary text-text-dark font-bold md:text-[20px] text-sm bg-gradient-to-r from-white to-orange-50 py-4'>
                            <p>Valeur totale :</p>
                            <p className='text-primary-dark'>24M</p>
                        </div>
                        <div className='md:justify-between md:gap-0 gap-3 flex px-7 rounded-xl border-l-8 border-primary text-text-dark font-bold md:text-[20px] text-sm bg-gradient-to-r from-white to-orange-50 py-4'>
                            <p>nombre de clients:</p>
                            <p className='text-primary-dark'>24</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* fonctionnalités */}
            <div className='mt-10'>
                <div className='m-auto justify-center text-center md:w-max px-10 py-3'>
                    <div className='m-auto bg-purple-200 font-bold text-center w-max px-10 py-3 mb-4 rounded-3xl text-primary justify-center'>
                        <p>Fonctionnalités</p>
                    </div>
                    <p className='md:text-6xl m-auto font-bold mb-4 text-4xl'>Tout ce dont vous avez besoin</p>
                    <p className='text-text-medium md:text-xl text-[17px] inline-block md:w-3/4'>Une solution complète pour optimiser la gestion de votre stock et booster votre productivité</p>
                </div>
                {/* les cards de fonctionnalités */}
                {/* premiere partie */}
                <div className='p-5 flex md:flex-row flex-col gap-4'>
                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiBox size={24} className='text-white'></FiBox>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Suivi en temps réel</h1>
                            <p className='text-text-medium text-xl'>Visualisez l'état de votre stock instantanément avec des mises à jour automatiques à chaque mouvement.</p>
                        </div>
                    </div>
                    <div className='p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiBarChart size={24} className='text-white'></FiBarChart>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Rapports intelligents</h1>
                            <p className='text-text-medium text-xl'>Générez des rapports détaillés et prenez des décisions éclairées basées sur des données précises.</p>
                        </div>
                    </div>
                    <div className='p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiAlertTriangle size={24} className='text-white'></FiAlertTriangle>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Alertes automatiques</h1>
                            <p className='text-text-medium text-xl'>Recevez des notifications lorsque vos produits atteignent le seuil de réapprovisionnement.</p>
                        </div>
                    </div>
                </div>
                    {/* deuxieme partie */}
                 <div className='p-5 flex md:flex-row flex-col gap-4'>
                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiUsers size={24} className='text-white'></FiUsers>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Multi-utilisateurs</h1>
                            <p className='text-text-medium text-xl'>Gérez plusieurs employés avec des permissions personnalisées et une traçabilité complète.</p>
                        </div>
                    </div>
                   
                    <div className='p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiSmartphone size={24} className='text-white'></FiSmartphone>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Accessible partout</h1>
                            <p className='text-text-medium text-xl'>Accédez à votre stock depuis votre ordinateur, tablette ou smartphone, où que vous soyez.</p>
                        </div>
                    </div>
                     <div className='p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiShield size={24} className='text-white'></FiShield>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Sécurité garantie</h1>
                            <p className='text-text-medium text-xl'>Vos données sont protégées avec un chiffrement de niveau bancaire et des sauvegardes quotidiennes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome