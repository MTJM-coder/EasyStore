import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'

const FlashMessage = () => {
    const { flash } = usePage().props
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (flash.success || flash.error) {
            setVisible(true)
            const timer = setTimeout(() => setVisible(false), 4000)
            return () => clearTimeout(timer)
        }
    }, [flash])

    if (!visible) return null

    return (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ${flash.success ? 'bg-green-500' : 'bg-red-500'}`}>
            {flash.success 
                ? <FiCheckCircle size={20} /> 
                : <FiXCircle size={20} />
            }
            <p className='font-bold'>
                {flash.success || flash.error}
            </p>
            <button onClick={() => setVisible(false)} className='ml-3 text-white font-bold'>✕</button>
        </div>
    )
}

export default FlashMessage