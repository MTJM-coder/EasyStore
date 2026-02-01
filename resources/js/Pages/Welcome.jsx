import React from 'react'
import { useState, useEffect } from 'react'
import { FiBarChart, FiBox, FiUsers, FiAlertTriangle, FiSmartphone, FiShield, FiCheckCircle, FiPhoneCall, FiMail, FiXOctagon, FiMenu, FiLogIn } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Register from './Auth/Register';


const Welcome = () => {
    const [showFirst, setShowFirst] = useState(false);
    const [showRegister,setShowRegister]=useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirst(prev => !prev);
        }, 300)
        return clearInterval(interval);
    }, [])

    
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className=''>
            <div className='flex md:justify-between px-7 items-center  bg-gray-50 top-0 left-0 z-50 w-full fixed h-28 py-5 '>
                <div className="md:hidden text-2xl cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? <FiXOctagon></FiXOctagon> : <FiMenu></FiMenu>}
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
                    <button className='px-6 py-3 border-2 bg-primary-darker text-white border-primary-darker rounded-lg font-bold' onClick={()=>setShowRegister(true)}> Essai gratuit </button>
                </div>
                
                {/* menu responsive */}
                {showMenu && (
                    <div className="fixed top-28 left-0 max-w-max pl-5 pr-20 bg-white shadow-lg md:hidden rounded-br-lg">
                        <ul className="flex flex-col items-start gap-4 py-10  font-bold">
                            <li className='hover:uppercase hover:text-primary'><a onClick={() => setShowMenu(false)} href="#accueil">Accueil</a></li>
                            <li className='hover:uppercase hover:text-primary'><a onClick={() => setShowMenu(false)} href="#fonctionnalites">Fonctionnalités</a></li>
                            <li className='hover:uppercase hover:text-primary'><a onClick={() => setShowMenu(false)} href="#tarifs">Tarifs</a></li>
                            <li className='hover:uppercase hover:text-primary'><a onClick={() => setShowMenu(false)} href="#contact">Contact</a></li>
                            <li className='border  inline-block text-primary px-6 py-4 rounded-lg'><a className='flex items-center gap-3' onClick={() => setShowMenu(false)} href="#contact"><FiLogIn></FiLogIn>Connexion</a></li>
                        </ul>
                    </div>
                )}
            </div>
            <div id='accueil' className='flex md:flex-row flex-col bg-gradient-to-r from-pink-50 to-orange-50 lg:w-full md:h-[100vh] max-h-max pt-36 px-10'>
                <div className='lg:w-1/2 md:text-left text-center'>
                    <div className='md:mb-20 mb-10 border-2 border-primary-darker w-max py-2 px-4 bg-purple-100 text-primary-darker font-bold  rounded-3xl '>solution SAAS pour PME</div>
                    <h1 className='md:text-6xl text-3xl font-bold mb-9'>Gérez votre stock <span className='text-primary'>en toute simplicité</span></h1>
                    <p className='text-text-medium text-xl'>EasyStore transforme la gestion de votre inventaire avec une plateforme intuitive, sécurisée et accessible depuis n'importe quel appareil. Dites adieu aux erreurs et aux ruptures de stock.</p>
                    <div className='mt-10 flex gap-8 md:flex-row flex-col mb-10'>
                        <button className='px-6 py-3 border-2 bg-primary-darker text-white border-primary-darker rounded-lg font-bold' onClick={()=>setShowRegister(true)}>Commencer gratuitement</button>
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
            <div id='fonctionnalites' className='mt-10'>
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
                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl hover:border-t-[8px] shadow:border-purple-300 hover:shadow-lg transition-all duration-300'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiBox size={24} className='text-white'></FiBox>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Suivi en temps réel</h1>
                            <p className='text-text-medium text-xl'>Visualisez l'état de votre stock instantanément avec des mises à jour automatiques à chaque mouvement.</p>
                        </div>
                    </div>
                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl hover:border-t-[8px] shadow:border-purple-300 hover:shadow-lg transition-all duration-300'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiBarChart size={24} className='text-white'></FiBarChart>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Rapports intelligents</h1>
                            <p className='text-text-medium text-xl'>Générez des rapports détaillés et prenez des décisions éclairées basées sur des données précises.</p>
                        </div>
                    </div>
                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl hover:border-t-[8px] shadow:border-purple-300 hover:shadow-lg transition-all duration-300'>
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
                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl hover:border-t-[8px] shadow:border-purple-300 hover:shadow-lg transition-all duration-300'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiUsers size={24} className='text-white'></FiUsers>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Multi-utilisateurs</h1>
                            <p className='text-text-medium text-xl'>Gérez plusieurs employés avec des permissions personnalisées et une traçabilité complète.</p>
                        </div>
                    </div>

                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl hover:border-t-[8px] shadow:border-purple-300 hover:shadow-lg transition-all duration-300'>
                        <div className='rounded-lg max-w-max p-7 bg-primary-dark flex justify-center items-center'>
                            <FiSmartphone size={24} className='text-white'></FiSmartphone>
                        </div>
                        <div>
                            <h1 className='my-5 text-2xl font-bold'>Accessible partout</h1>
                            <p className='text-text-medium text-xl'>Accédez à votre stock depuis votre ordinateur, tablette ou smartphone, où que vous soyez.</p>
                        </div>
                    </div>
                    <div className=' p-5 flex flex-col bg-secondary shadow-sm border-[1px] border-purple-300 rounded-2xl hover:border-t-[8px] shadow:border-purple-300 hover:shadow-lg transition-all duration-300'>
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
            {/* section tarifs */}
            <div id='tarifs' className='bg-purple-50 pb-36 md:px-10 px-4'>
                <div className='m-auto justify-center text-center md:w-max px-10 py-3'>
                    <div className='m-auto bg-purple-200 font-bold text-center w-max px-10 py-3 mb-4 rounded-3xl text-primary justify-center'>
                        <p>Tarifs</p>
                    </div>
                    <p className='md:text-6xl m-auto font-bold mb-4 text-4xl'>Choisissez votre formule</p>
                    <p className='text-text-medium md:text-xl text-[17px] inline-block md:w-3/4'>Des plan adaptés à la taille de votre commerce.</p>
                </div>

                {/* les cards des plans */}
                <div className='flex md:flex-row flex-col  gap-10 mt-10 items-stretch'>

                    {/* plan debutant */}
                    <div className='bg-white p-10 rounded-2xl border-2 flex-1'>
                        <div className='mb-10'>
                            <h1 className='text-4xl font-bold mb-2'>Starter</h1>
                            <p className='text-text-medium'>Parfait our les petits commerces</p>
                        </div>
                        <p className='mb-10'>
                            FCFA<span className='text-6xl font-bold text-primary'> 5K </span>/mois
                        </p>
                        <div className=''>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Jusqu'à 100 produits</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>2 utilisateurs</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Rapports mensuels</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Support par email</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Historique 3 mois</p></div>
                        </div>

                        <button className='border-2 border-primary-dark px-4 py-2 text-xl w-full rounded-2xl text-primary'>Commencer</button>
                    </div>

                    {/* plan business */}

                    <div className='relative bg-white p-10 rounded-2xl border-2 border-primary hover:scale-105 hover:shadow-lg flex-1'>
                        <div className='absolute -top-4 left-2/3 -translate-x-1/2 px-8 py-2 rounded-3xl bg-orange-400 font-bold shadow'>
                            Populaire
                        </div>


                        <div className='mb-10'>
                            <h1 className='text-4xl font-bold mb-2'>Business</h1>
                            <p className='text-text-medium'>Idéal pour les PME</p>
                        </div>
                        <p className='mb-10'>
                            FCFA<span className='text-6xl font-bold text-primary'> 12K </span>/mois
                        </p>
                        <div className=''>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Produits illimités</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>5 utilisateurs</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Rapports personnalisés</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Historique illimité</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Gestion fournisseurs</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Alertes SMS</p></div>
                        </div>

                        <button className='border-2 border-primary-dark px-4 py-2 bg-primary text-xl w-full rounded-2xl text-white'>Commencer</button>
                    </div>

                    {/* pour entreprise */}

                    <div className='bg-white p-10 rounded-2xl border-2 flex-1'>

                        <div className='mb-10'>
                            <h1 className='text-4xl font-bold mb-2'>Entreprise</h1>
                            <p className='text-text-medium'>Pour les grandes structures</p>
                        </div>
                        <p className='mb-10'>
                            FCFA<span className='text-6xl font-bold text-primary'> 25K </span>/mois
                        </p>
                        <div className=''>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Tout de Business +</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Utilisateurs illimitéss</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Multi-boutiques</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Formation équipe</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Support 24/7</p></div>
                            <div className='my-7 flex items-center gap-10'><FiCheckCircle size={24} className='text-green-600'></FiCheckCircle><p>Manager dédié</p></div>
                        </div>

                        <button className='border-2 border-primary-dark px-4 py-2 text-xl w-full rounded-2xl text-primary'>Commencer</button>
                    </div>

                </div>
            </div>
            {showRegister && (
                <Register showRegister={showRegister} setShowRegister={setShowRegister}></Register>
            )}
            
            {/* la section pour la prise de contact */}
            <div id='contact' className='bg-primary-dark  max-h-max px-8 md:px-10 md:py-64 py-24'>
                <div className='mb-16 flex flex-col justify-center m-auto items-center'>
                    <p className='text-white font-bold text-center mb-6 md:text-6xl text-4xl inline-block md:w-2/4'>Prêt à révolutionner votre gestion ?</p>
                    <p className='text-white text-center text-xl inline-block md:w-2/4'>Rejoignez les centaines de commerces qui ont déjà transformé leur activité avec EasyStore. Essai gratuit 14 jours</p>
                </div>
                <div className=' flex md:flex-row flex-col justify-center m-auto items-center gap-10'>
                    <button className='border px-7 text-primary-dark md:uppercase  bg-white rounded-2xl hover:bg-primary-darker hover:text-white transition-all duration-300 ease-in-out py-5 text-2xl' onClick={()=>setShowRegister(true)}>Commencer gratuitement</button>
                    <button className='border border-white px-7 md:uppercase text-purple-400 bg-transparent  rounded-2xl hover:bg-primary-darker hover:text-white transition-all duration-300 ease-in-out py-5 text-2xl'>Parler à un expert </button>
                </div>
            </div>

            {/* footer */}
            <div className='bg-black px-10 py-10'>
                <div className='flex md:flex-row flex-col gap-16'>
                    <div className='md:w-1/4'>
                        <p className='mb-6 text-primary-darker font-bold text-4xl'>EASYSTORE</p>
                        <p className='mb-10 text-text-medium'>La plateforme SaaS qui propulse les PME africaines vers le futur. Gestion de stock intelligente, sécurisée et accessible.</p>

                        <div className='flex gap-10'>
                            <a href="tel:650090589">
                            <div className='w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-tr from-purple-900 via-black to-purple-950 hover:scale-110 transition-transform duration-300'>
                                <FiPhoneCall className='text-secondary text-2xl' />
                            </div>
                            </a>
                            <a href="https://wa.me/652766351">
                            <div className='w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-tr from-purple-900 via-black to-purple-950 hover:scale-110 transition-transform duration-300'>
                                <FaWhatsapp className='text-secondary text-2xl' />
                            </div>
                            </a>
                            <a href="mailto:EasyStore@contact.com">
                                <div className='w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-tr from-purple-900 via-black to-purple-950 hover:scale-110 transition-transform duration-300'>
                                    <FiMail className='text-secondary text-2xl'/>
                                </div> 
                            </a>

                        </div>
                    </div>

                    <div className='md:w-1/4'>
                        <p className='mb-6 text-white font-bold text-2xl'>Produit</p>


                        <div className='flex flex-col gap-5 text-text-medium '>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Fonctionnalités</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Tarifs</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Demo</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Integration</a>
                        </div>
                    </div>

                    <div className='md:w-1/4'>
                        <p className='mb-6 text-white font-bold text-2xl'>Entreprise</p>

                        <div className='flex flex-col gap-5 text-text-medium '>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">A propos</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Carrieres</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Contact</a>

                        </div>
                    </div>

                    <div className='md:w-1/4'>
                        <p className='mb-6 text-white font-bold text-2xl'>Support</p>

                        <div className='flex flex-col gap-5 text-text-medium'>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Centre d'aide</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Documentation</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Statut</a>
                            <a href="" className="hover:text-primary-dark transition-color duration-300">Confidentialité</a>
                        </div>
                    </div>
                </div>
                <div className='mt-10 text-text-medium border-t-[1px] py-10 m-auto text-center text-xl'>
                    &copy; 2026 EasyStore Technologies. Tous droits réservés. Conçu avec passion pour l'Afrique.
                </div>
            </div>
        </div>
    )
}

export default Welcome