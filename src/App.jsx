import { useEffect, useState } from 'react'
import axios from 'axios'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { authClient } from '@/lib/auth'

function App() {
    const {
        data: session,
        loading,
        error,
    } = authClient.useSession()

    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('mounted', session);

        async function getUser() {
            try {
                const response = await axios.get('/api/v1/test', {});
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }

        getUser();
        
        return () => {
            console.log('unmounted')
        }
    }, [])

    return (
        <div className='bg-slate-400 flex justify-center items-center flex-col gap-5 h-screen w-screen'>
            <div className='flex gap-5'>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='flex justify-center items-center flex-col w-fit gap-5'>
                <button onClick={() => setCount((count) => count + 1)} className='rounded-lg bg-blue-200 p-5'>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

            <button onClick={async() => {
                await authClient.signIn.social({
                    provider: 'github'
                })
            }} className='rounded-lg bg-blue-200 p-5'>
                Sign In with GitHub
            </button>

            <button onClick={async() => {
                await authClient.signIn.social({
                    provider: 'google'
                })
            }} className='rounded-lg bg-blue-200 p-5'>
                Sign In with Google
            </button>

            <button onClick={async() => {
                await authClient.signOut()
            }} className='rounded-lg bg-blue-200 p-5'>
                Sign Out
            </button>
        </div>
    )
}

export default App
