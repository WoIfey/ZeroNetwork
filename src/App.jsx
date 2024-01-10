import { useState, useEffect } from 'react'

const team = [
  {
    name: 'ImHer0',
    role: 'CEO',
    imageUrl:
      '/ZeroNetwork/imher0.png',
    location: 'United Kingdom',
  },
  {
    name: 'Wolfey',
    role: 'Design',
    imageUrl:
      '/ZeroNetwork/wolfey.png',
    location: 'Finland',
  },
]

function App() {
  const [server1, setServer1] = useState({})
  const [server2, setServer2] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch('https://api.mcsrvstat.us/3/imher0.ddns.net')
        const data1 = await res1.json()

        const res2 = await fetch('https://api.mcsrvstat.us/3/joe.onthewifi.com')
        const data2 = await res2.json()

        setServer1(data1)
        setServer2(data2)
      } catch (error) {
        console.error('Error fetching server data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // When server is offline
  const checkOnline = server1 && server1.online
  const checkPlayers = server1 && server1.players

  return (
    <div className="bg-gray-900">
      {loading && (
        <div className="flex items-center justify-center h-screen bg-gray-900">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
      <main className="relative isolate">
        {/* Background */}
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-3xl pt-24 text-center sm:pt-40">
            <h2 className="text-4xl font-bold tracking-tight bg-[#4e87d1] sm:text-6xl bg-custom bg-clip-text text-transparent">The Im Her Zero Network</h2>
            <div className='mt-4 flex justify-center items-center flex-col text-lg leading-8 text-gray-300'>
              {checkOnline && checkPlayers && (
                <div className='flex justify-center items-center gap-4'>
                  <h1 className='font-bold bg-slate-900 rounded px-2'>{server1.hostname}</h1>
                  <img src={server1.icon} alt="" className='h-10 w-10' />
                  <p>{server1.version}</p>
                </div>
              )}
              {!checkOnline && (
                <div className='italic font-light'>
                  <p className='text-xl'>Server is <span className='text-red-500'>offline.</span></p>
                  <p className='text-sm mt-1'>Check <a href="https://discord.gg/a6JrZMa" target='_blank' className='text-blue-500 underline'>Discord</a> for updates.</p>
                </div>
              )}
              {checkOnline && checkPlayers && (
                <div className='mt-1'>
                  <p className='italic font-light'>"{server1.motd.html}"</p>
                  Server is <span className="text-green-500 font-bold">online</span> and there are <span className='font-bold'>{server1.players.online}/{server1.players.max}</span> players currently playing!
                </div>
              )}
              <div className='text-xs text-slate-500 mt-1'>other server: {server2.hostname} {server2.online ? 'online' : 'offline'}</div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-14 lg:px-8 flex justify-center items-center flex-col">
          <ol className="relative border-s mt-24 border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-400"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2024 <span className={server1.online ? 'text-green-500' : 'text-red-500'}>{server1.online ? 'online' : 'offline'}</span></time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white"><a href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9" target='_blank' className='underline'>All the Mods 9 - ATM9</a></h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">Modpack with a bunch of mods and quests!</p>
              <p className="mb-4 text-xs italic font-light text-gray-500 dark:text-gray-400">Join <a href="https://discord.gg/a6JrZMa" target='_blank' className='text-blue-500 underline'>Discord</a> to find out updates and what version it is on!</p>
              <a href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9/files?page=1&pageSize=10" target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Download <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg></a>
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023 <span className="text-red-800">discontinued</span></time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400">Im Her Zero Survival</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-500">Survival multiplayer server with a lot of plugins and datapacks in 1.19.3</p>
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022 <span className="text-red-800">discontinued</span></time>
              <a href="https://www.feed-the-beast.com/modpacks/91-ftb-oceanblock" target='_blank'>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400 underline">FTB OceanBlock</h3>
              </a>
              <p className="text-base font-normal text-gray-500 dark:text-gray-500">Modded survival in island-based mods!</p>
            </li>
            <li className="ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2021 <span className="text-red-800">discontinued</span></time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400">Javarock v4</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-500">Our custom Java and bedrock compatible survival multiplayer server <br />with plugins and datapacks in 1.18</p>
            </li>
          </ol>
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold  text-white sm:text-4xl">What are we doing?!</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We make minecraft servers for our Discord server! Yippee! <br /> We host modpacks and unique survival multiplayer servers!
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">

          </dl>
        </div>

        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold  text-white sm:text-4xl">The Team</h2>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img className="aspect-[14/13] w-full rounded-2xl object-cover" src={person.imageUrl} alt={person.name} />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-wide text-white uppercase">{person.name}</h3>
                <p className="text-base leading-7 text-gray-300">{person.role}</p>
                <p className="text-sm leading-6 text-gray-500">{person.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex justify-between">
            <p className="text-xs leading-5 text-gray-400">© 2024 Joe, Inc.</p>
            <a href="https://discord.gg/a6JrZMa" target='_blank'>
              <img src='/ZeroNetwork/discord.svg' className="w-6 h-6"></img>
            </a>
          </div>
        </div>
      </footer>
    </div>

  )
}

export default App