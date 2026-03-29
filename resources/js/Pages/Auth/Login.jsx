import React from 'react'
import { FaKey } from 'react-icons/fa'
import { FiHome, FiKey, FiLock, FiMail, FiPhone, FiShoppingCart, FiUser, FiXOctagon } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

const Login = ({ showLogin, setShowLogin, showRegister, setShowRegister }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { errors } = usePage().props
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/auth/login', formData, {
            onSuccess: () => {
                setShowLogin(false)
            }
        })
        setFormData({
            email: '',
            password: ''
        })
    }
    useEffect(() => {
        if (showLogin) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            //   document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showLogin])

    if (!showLogin) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg relative">

                <button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-4 right-4 text-red-600 text-2xl"
                >
                    <FiXOctagon />
                </button>

                <div className="flex flex-col gap-4 px-10 py-8">
                    <h1 className="text-primary font-bold text-2xl">EasyStore</h1>

                    <div>
                        <h2 className="text-2xl font-bold">Bienvenue </h2>
                        <p className="text-text-medium">
                            Connectez-vous à votre espace en toute sécurité
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="font-bold text-text-medium">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-medium" />
                                <input
                                    className="w-full rounded-lg border pl-10 py-2 focus:border-primary"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                />
                            </div>
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span> }
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <label className="font-bold text-text-medium">Mot de passe</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-medium" />
                                <input
                                    className="w-full rounded-lg border pl-10 py-2"
                                    type="password"
                                    placeholder="Minimum 8 caractères"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span> }
                        </div>

                        <span className="text-right text-primary cursor-pointer">
                            Mot de passe oublié ?
                        </span>

                        <button className="bg-primary text-white py-3 rounded-lg font-bold">
                            Se connecter
                        </button>

                        <p className="text-center">
                            Pas de compte ?
                            <span className="text-primary cursor-pointer ml-1" onClick={() => { setShowLogin(false), setShowRegister(true) }}>
                                Créer un compte
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login