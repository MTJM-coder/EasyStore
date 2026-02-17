import React from 'react'
import Header from '../Layouts/Header'
import { useState } from 'react'
import { FiInfo, FiRefreshCcw, FiSave, FiUser, FiMenu } from 'react-icons/fi'
import SidebarEmploye from '@/Layouts/SidebarEmploye'

const Profile = () => {
    const [active, setActive] = useState(6)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div>
            {/* <Header></Header> */}
            <div className='bg-secondary '>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}
                
                <SidebarEmploye active={active} setActive={setActive} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></SidebarEmploye>

                <div className={`relative md:ml-64 w-full mb-20 md:bg-secondary bg-white md:text-sm text-xs ${sidebarOpen ? 'overflow-auto text-xs bg-white' : ''} `}>
                    <div className='fixed flex items-center w-full gap-5 pl-5 md:pr-64 justify-between bg-white p-5'>
                        <div className='flex justify-between items-center md:hidden shadow-md' onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <button className='bg-primary text-white px-4 py-4 rounded-lg'><FiMenu></FiMenu></button>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl'>Mon profil</h1>
                            <p className='text-text-medium'>Gérez vos informations personnelles et paramètres de compte</p>
                        </div>
                       
                    </div>

                    <div className=' pt-32 flex md:flex-row flex-col w-full gap-5 md:px-10 px-2 mb-5'>
                        <div className='bg-white flex flex-col gap-4 p-10 md:w-1/3 rounded-lg border'>
                            <div className='min-w-max p-6 bg-secondary flex items-center justify-center rounded-full w-20 h-20 m-auto'>
                                <FiUser className='text-center' size={36}></FiUser>
                            </div>

                            <div className='flex flex-col gap-3 m-auto'>
                                <p className='text-2xl font-bold'>Jaudel Merlando</p>
                                <p className='max-w-max border-[1.7px] px-6 py-2 inline-block text-center rounded-2xl  bg-purple-100 border-primary font-bold text-primary'>Proprietaire</p>
                                <p className='text-sm text-text-medium'>Jaudel@gmail.comoiidhdod</p>
                            </div>
                            <hr />
                            <div className='flex flex-col gap-5'>
                                <p className='justify-between flex'><span className='font-bold'>Compte créé</span><span className='text-text-medium'>01/02/2026</span> </p>
                                <p className='justify-between flex'><span className='font-bold'>Derniere mise a jour</span><span className='text-text-medium'>01/02/2026</span> </p>
                                <p className='justify-between flex'><span className='font-bold'>Derniere connexion</span><span className='text-text-medium'>Aujord'hui</span></p>

                            </div>
                        </div>


                        <div className='bg-white p-10 md:w-2/3 rounded-lg border'>
                            <h1 className='mb-5 text-2xl font-bold'>Informations personnelles</h1>
                            <hr />
                            <div className='flex gap-5 pt-5 flex-col'>
                                <div className='flex md:flex-row flex-col md:gap-10 gap-2'>
                                    <div className=' flex flex-col gap-2 mb-4'>
                                        <label className='text-text-medium' htmlFor="">NOM*</label>
                                        <input type="text" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                    </div>
                                    <div className=' flex flex-col gap-2 mb-4'>
                                        <label className='text-text-medium' htmlFor="">EMAIL*</label>
                                        <input type="text" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                    </div>
                                </div>
                                <div className='flex md:flex-row flex-col md:gap-10 gap-2'>
                                    <div className=' flex flex-col gap-2 mb-4'>
                                        <label className='text-text-medium' htmlFor="">TELEPHONE*</label>
                                        <input type="text" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                    </div>
                                    <div className=' flex flex-col gap-2 mb-4'>
                                        <label className='text-text-medium' htmlFor="">VILLE</label>
                                        <input type="text" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                    </div>
                                </div>
                                <div className='flex md:flex-row flex-col md:gap-10 gap-2'>
                                    <button className='bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-4'> <FiSave></FiSave>Enregistrer les modifications</button>
                                    <button className='bg-white text-text-medium font-bold px-5 py-3 rounded-lg flex items-center gap-4 border-[1.5px]'><FiRefreshCcw></FiRefreshCcw> Annuler</button>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className='flex md:flex-row flex-col w-full gap-5 md:px-10 px-2'>
                        <div className='bg-white flex flex-col gap-4 p-10 md:w-1/3 rounded-lg border'>
                            <h1 className='text-2xl font-bold'>Securité et mot de passe</h1>
                            <hr />
                            <div className='flex flex-col gap-5'>
                                <div className=' flex flex-col gap-2 mb-2'>
                                    <label className='text-text-medium' htmlFor="">Mot de passe actuel *</label>
                                    <input type="password" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                </div>
                                <div className=' flex flex-col gap-2 mb-2'>
                                    <label className='text-text-medium' htmlFor="">Nouveau mot de passe *</label>
                                    <input type="password" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                </div>

                                <div className=' flex flex-col gap-2 mb-2'>
                                    <label className='text-text-medium' htmlFor="">Confirmer le mot de passe *</label>
                                    <input type="password" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                </div>
                                <div>
                                    <button className='bg-primary text-white px-5 py-3 rounded-lg'>Changer de mot de passe</button>
                                </div>
                            </div>

                        </div>



                        <div className='bg-white p-10 md:w-2/3 rounded-lg border'>
                            <h1 className='mb-5 text-2xl font-bold'>Informations du commerce</h1>
                            <hr />
                            <div className='flex gap-5 pt-5 flex-col'>
                                <div>
                                    <p className='flex items-center gap-2 bg-blue-200 border border-blue-500 text-blue-500 px-10 py-3 rounded-lg text-center'><FiInfo className='text-blue-500'></FiInfo> Ces informations sont partagées avec votre équipe</p>
                                </div>


                                <div className=' flex flex-col gap-2 mb-2'>
                                    <label className='text-text-medium' htmlFor="">NOM DU COMMERCE *</label>
                                    <input type="text" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'valeur'} />
                                </div>

                                <div className='flex md:flex-row flex-col md:gap-10 gap-2'>
                                    <div className=' flex flex-col gap-2 mb-2'>
                                        <label className='text-text-medium' htmlFor="">TYPE DE COMMERCE </label>
                                        <select name="type" id="" className='rounded-lg bg-secondary border-[1.5px] border-gray-300'>
                                            <option selected>Épicerie / Alimentaire</option>
                                            <option value={"détail"}>Magasin de détail</option>
                                            <option value={"Grossiste"}>Grossiste</option>
                                            <option value={"Pharmacie"}>Pharmacie</option>
                                            <option value={"Quincaillerie"}>Quincaillerie</option>
                                            <option value={"electronique"}>Électronique</option>
                                            <option value={"Mode"}>Textile / Mode</option>
                                            <option value={"Autre"}>Autre</option>
                                        </select>
                                    </div>
                                    <div className=' flex flex-col gap-2 mb-2'>
                                        <label className='text-text-medium' htmlFor="">NUMERO D"IMMATRICULATION</label>
                                        <input type="text" className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'BLABLABLABLABLA'} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 mb-2'>
                                    <label className='text-text-medium' htmlFor="">NUMERO D'IDENTIFIANT UNIQUE</label>
                                    <input type="text" readOnly className='rounded-lg bg-secondary border-[1.5px] border-gray-300' value={'BLABLABLABLABLA'} />
                                </div>
                                <div className='flex md:flex-row flex-col md:gap-10 gap-2'>
                                    <button className='bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-4'> <FiSave></FiSave>Mettre a jour</button>
                                    <button className='bg-white text-text-medium font-bold px-5 py-3 rounded-lg flex items-center gap-4 border-[1.5px]'><FiRefreshCcw></FiRefreshCcw> Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile