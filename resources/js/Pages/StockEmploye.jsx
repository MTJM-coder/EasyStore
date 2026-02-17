import SidebarEmploye from '@/Layouts/SidebarEmploye'
import React from 'react'
import { useState, useEffect } from 'react'
import { FaFileExport } from 'react-icons/fa'
import { FiSearch, FiBox, FiCheck, FiAlertTriangle,FiMenu } from 'react-icons/fi'
import { MdEmergency } from 'react-icons/md'

const StockEmploye = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
    const produits = [
        { nom: "Riz parfumé 2kg", reference: "riz-02", quantite: 2, seuil: 15, statut: 'critique' },
        { nom: "Huile de tournesol 1L", reference: "huile-01", quantite: 10, seuil: 20, statut: 'faible' },
        { nom: "Pâtes penne 500g", reference: "pates-01", quantite: 50, seuil: 30, statut: 'suffisant' },
        { nom: "Lentilles corail 1kg", reference: "lentilles-01", quantite: 5, seuil: 10, statut: 'faible' },
        { nom: "Farine de blé 1kg", reference: "farine-01", quantite: 0, seuil: 20, statut: 'rupture' },
        { nom: "Sucre en poudre 1kg", reference: "sucre-01", quantite: 25, seuil: 30, statut: 'suffisant' },
        { nom: "Café moulu 250g", reference: "cafe-01", quantite: 8, seuil: 15, statut: 'faible' },
        { nom: "Thé vert 100g", reference: "the-01", quantite: 30, seuil: 20, statut: 'suffisant' },
        { nom: "Chocolat noir 100g", reference: "chocolat-01", quantite: 12, seuil: 15, statut: 'faible' },
        { nom: "Biscuits sablés 200g", reference: "biscuits-01", quantite: 18, seuil: 25, statut: 'suffisant' },
        { nom: "Confiture fraise 250g", reference: "confiture-01", quantite: 4, seuil: 10, statut: 'faible' },
        { nom: "Miel naturel 250g", reference: "miel-01", quantite: 22, seuil: 20, statut: 'suffisant' },
        { nom: "Jus d'orange 1L", reference: "jus-01", quantite: 0, seuil: 15, statut: 'rupture' },
        { nom: "Eau minérale 1.5L", reference: "eau-01", quantite: 40, seuil: 30, statut: 'suffisant' },
        { nom: "Fromage râpé 200g", reference: "fromage-01", quantite: 6, seuil: 15, statut: 'faible' },
        { nom: "Yaourt nature 125g", reference: "yaourt-01", quantite: 28, seuil: 20, statut: 'suffisant' },
        { nom: "Beurre doux 250g", reference: "beurre-01", quantite: 3, seuil: 10, statut: 'faible' },
        { nom: "Œufs frais 12pcs", reference: "oeufs-01", quantite: 15, seuil: 20, statut: 'suffisant' },
        { nom: "Poulet entier 1.5kg", reference: "poulet-01", quantite: 0, seuil: 5, statut: 'rupture' },
        { nom: "Steak haché 500g", reference: "steak-01", quantite: 9, seuil: 15, statut: 'faible' },
        { nom: "Œufs frais 12pcs", reference: "oeuf-01", quantite: 15, seuil: 20, statut: 'suffisant' },
        { nom: "Poulet entier 1.5kg", reference: "pulet-01", quantite: 0, seuil: 5, statut: 'rupture' },
        { nom: "Steak haché 500g", reference: "stea-01", quantite: 9, seuil: 15, statut: 'faible' },

    ]
    const getBadge = (produit) => {
        if (produit.quantite === 0) return "rupture";
        if (produit.quantite < produit.seuil) return "faible";
        return "suffisant";
    };

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOption, setSortOption] = useState('');

    const nbrePages = Math.ceil(produits.length / 20);
    const nbreProduitsParPage = 20;
    const [pagesActive, setPagesActive] = useState(1);
    const numeroPages = [];
    for (let i = 1; i <= nbrePages; i++) {
        numeroPages.push(i);
    }

    const produitFiltered = produits.filter(produit => {
        const matchesStatus = !statusFilter || produit.statut === statusFilter;
        const matchesSearch = produit.nom.toLowerCase().includes(search.toLowerCase()) ||
            produit.reference.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const produitsTries = [...produitFiltered];
    if (sortOption === "nom_asc") {
        produitsTries.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sortOption === "nom_desc") {
        produitsTries.sort((a, b) => b.nom.localeCompare(a.nom));
    } else if (sortOption === "qte_asc") {
        produitsTries.sort((a, b) => a.quantite - b.quantite);
    } else if (sortOption === "qte_desc") {
        produitsTries.sort((a, b) => b.quantite - a.quantite);
    }

    const produitsAffiches = produitsTries.slice((pagesActive - 1) * nbreProduitsParPage, pagesActive * nbreProduitsParPage);

    const totalProduits = produits.length;
    const stockSuffisant = produits.filter(p => p.statut == 'suffisant').length;
    const stockFaible = produits.filter(p => p.statut == "faible").length;
    const stockRupture = produits.filter(p => p.statut == "rupture").length;
    const stockCritique = produits.filter(p => p.statut == "critique").length;

    const handleExport = () => {
        alert("Exportation du stock au format CSV (fonctionnalité à implémenter)");
        // const csvContent = "data:text/csv;charset=utf-8,"
        //     + ["Nom Reference Quantite Seuil Statut", ...produits.map(p => `${p.nom} ${p.reference} ${p.quantite} ${p.seuil} ${p.statut}`)].join("\n");
        // const encodedUri = encodeURI(csvContent);
        // const link = document.createElement("a");
        // link.setAttribute("href", encodedUri);
        // link.setAttribute("download", "stock.csv");
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    };

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [sidebarOpen]);
    const [active, setActive] = useState(2);



    return (
        <div>
            <div className='flex bg-secondary'>
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <SidebarEmploye sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive}></SidebarEmploye>
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
                                        <h1 className='font-bold text-2xl'>Consultation du Stock</h1>
                                        <p className='text-text-medium'>Visualisez et gérez l'ensemble de vos produits</p>
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
                                    <option value="">Tous les statuts</option>
                                    <option value="suffisant">Stock suffisant</option>
                                    <option value="faible">Stock faible</option>
                                    <option value="rupture">Rupture critique</option>
                                </select>

                                <select
                                    className='md:w-1/4 w-full border-[1.5px] border-gray-300 rounded-lg py-2'
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option value="">Trier par</option>
                                    <option value="nom_asc">Nom (A-Z)</option>
                                    <option value="nom_desc">Nom (Z-A)</option>
                                    <option value="qte_asc">Quantité (asc)</option>
                                    <option value="qte_desc">Quantité (desc)</option>
                                </select>

                                <button
                                    className='md:w-auto w-full bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2'
                                    onClick={() => handleExport()}
                                >
                                    <FaFileExport />
                                    Exporter
                                </button>

                            </div>

                        </div>
                    </div>

                    {/* corps de la page */}

                    <div className=''>
                        {/* les cartes */}
                        <div className='flex md:flex-row flex-col md:justify-between gap-3 mt-40 px-5'>
                            <div className='flex md:flex-row flex-col gap-3 px-5'>
                                <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                    <div className='w-12 h-12 bg-purple-200 flex justify-center items-center rounded-lg'><FiBox size={30} className='text-text-dark'></FiBox></div>
                                    <div className='flex flex-col'>
                                        <span className='text-text-medium'>Produits en stock</span>
                                        <span className='text-3xl font-bold'>{totalProduits}</span>
                                    </div>
                                </div>

                                {/* stock suffisant */}
                                <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                    <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'>
                                        <FiCheck size={30} className='text-green-500'></FiCheck>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-text-medium'>Stock suffisant</span>
                                        <span className='text-3xl font-bold'>{stockSuffisant}</span>
                                    </div>
                                </div>

                                {/* stok faible */}
                                <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                    <div className='w-12 h-12 bg-yellow-200 flex justify-center items-center rounded-lg'>
                                        <FiAlertTriangle size={30} className='text-yellow-300'></FiAlertTriangle>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-text-medium'>Stock faible</span>
                                        <span className='text-3xl font-bold'>{stockFaible}</span>
                                    </div>
                                </div>

                                <div className='bg-white rounded-lg px-5 py-5 flex gap-4 items-center border'>
                                    <div className='w-12 h-12 bg-red-200 flex justify-center items-center rounded-lg'>
                                        <MdEmergency size={30} className='text-red-500'></MdEmergency>
                                        {/* <mdiSiren size={30} className='text-red-500'></mdiSiren> */}
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-text-medium'>Stock critique</span>
                                        <span className='text-3xl font-bold'>{stockCritique}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* liste des produits */}

                        <div className='mx-10 my-5 p-5 bg-white'>
                            <div className=''>
                                <h1 className='text-2xl font-bold'>Liste des produits</h1>
                            </div>

                            <hr />
                            <div className='w-full'>
                                <table className='w-full border-collapse'>
                                    <thead className='bg-gray-50 border-b-[2px]'>
                                        <tr className=''>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>PRODUIT</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>REFERENCE</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>QUANTITE DISPONNIBLE</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>SEUIL DE REAPPRO.</th>
                                            <th className='text-text-medium py-[1rem] px-[1.5rem] text-left font-bold'>STATUT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produitsAffiches.map(produit => (
                                            <tr key={produit.reference} className=''>
                                                <td className='py-[1.25rem] px-[1.5rem] border-b-2'>
                                                    <span className='text-text-dark font-bold'>{produit.nom}</span>
                                                </td>
                                                <td className='py-[1.25rem] px-[1.5rem] border-b-2'>
                                                    <span className='text-text-medium'>{produit.reference}</span>
                                                </td>
                                                <td className='py-[1.25rem] px-[1.5rem] border-b-2'>

                                                    {getBadge(produit) == "suffisant" && (
                                                        <div className='flex items-center gap-4 rounded border justify-center py-1 bg-green-200 text-green-800 font-bold max-w-max px-10'>
                                                            <span className='inline-block h-2 w-2 rounded-full bg-green-500'></span>
                                                            <span>{produit.quantite} unités</span>
                                                        </div>
                                                    )}

                                                    {getBadge(produit) == "faible" && (
                                                        <div className='flex items-center gap-4 rounded border justify-center py-1 bg-yellow-100 text-yellow-800 font-bold max-w-max px-10'>
                                                            <span className='inline-block h-2 w-2 rounded-full bg-yellow-500'></span>
                                                            <span>{produit.quantite} unités</span>
                                                        </div>
                                                    )}

                                                    {getBadge(produit) == "rupture" && (
                                                        <div className='flex items-center gap-4 rounded border justify-center py-1 bg-red-200 text-red-800 font-bold max-w-max px-10'>
                                                            <span className='inline-block h-2 w-2 rounded-full bg-red-500'></span>
                                                            <span>{produit.quantite ?? 0} unité</span>
                                                        </div>
                                                    )}

                                                </td>

                                                <td className='py-[1.25rem] px-[1.5rem] text-sm text-text-medium border-b-2'>{produit.seuil} unités</td>
                                                <td className='py-[1.25rem] px-[1.5rem]  border-b-2'>
                                                    <span className={`${getBadge(produit) == "suffisant" ? "text-green-500" : getBadge(produit) == "faible" ? "text-yellow-500" : "text-red-500"} font-bold`}>{produit.statut}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='flex gap-5 justify-end mt-5'>
                                    {/* les bouton pour les pages */}
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
            </div>
        </div>
    )
}

export default StockEmploye