import { useState, useEffect } from 'react'

const team = [
  {
    name: 'ImHer0',
    role: 'CEO',
    href: 'https://github.com/ImHer0',
    src:
      '/ZeroNetwork/imher0.png',
    location: 'United Kingdom',
  },
  {
    name: 'Wolfey',
    role: 'Design',
    href: 'https://github.com/WoIfey',
    src:
      '/ZeroNetwork/wolfey.png',
    location: 'Finland',
  },
]

const facts = [
  {
    name: 'On 24/7',
    description: "Besides updates, it shouldn't crash!",
    src: '/ZeroNetwork/clock.svg',
  },
  {
    name: 'Stable server',
    description: 'Usually no lag!',
    src: '/ZeroNetwork/wifi.svg',
  },
  {
    name: 'Always updated',
    description: 'Never outdated!',
    src: '/ZeroNetwork/check-circle.svg',
  },
  {
    name: 'Great community',
    description: 'No cap!',
    src: '/ZeroNetwork/discord.svg',
  },
]

function App() {
  const [server1, setServer1] = useState({})
  const [server2, setServer2] = useState({})
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  // When server is offline
  const checkOnline = server1 && server1.online
  const checkPlayers = server1 && server1.players

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch('https://api.mcsrvstat.us/3/play.hypixel.net')
        const data1 = await res1.json()

        const res2 = await fetch('https://api.mcsrvstat.us/3/joe.onthewifi.com')
        const data2 = await res2.json()

        setServer1(data1)
        setServer2(data2)
      } catch (error) {
        console.log('😥 oops wolfeys code sucks cuz:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch (err) {
      console.log('🤨 it failed to copy to clipboard because: ', err)
    }
  }

  return (
    <div className="bg-gray-900">
      {loading && (
        <div className="fixed inset-0 bg-black opacity-90 z-50 flex items-center justify-center">
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

        {/* Header */}
        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-3xl pt-24 text-center sm:pt-40">
            <h2 className="text-4xl font-bold tracking-tight bg-[#4e87d1] md:text-6xl bg-custom bg-clip-text text-transparent">The Im Her Zero Network</h2>
            <div className='mt-8 flex justify-center items-center flex-col text-lg leading-8 text-gray-300'>
              {checkOnline && checkPlayers && (
                <div className='flex flex-col justify-center items-center gap-1'>
                  <div className='flex flex-col sm:flex-row'>
                    <div className='flex gap-2'>
                      <div className="group flex relative">
                        <h1 className='font-bold dark:bg-slate-900 bg-gray-200 text-slate-500 dark:text-white rounded px-2 cursor-pointer' onClick={() => copy(server1.hostname)}>{server1.hostname}</h1>
                        <span className="pointer-events-none group-hover:opacity-100 transition-opacity bg-gray-700 px-2 py-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -translate-y-[2.9rem] opacity-0 m-4 mx-auto">{copied ? 'Copied!' : 'Copy'}</span>
                      </div>
                      <img src={server1.icon} alt="Icon" className='h-8 w-8' />
                    </div>
                    <div>
                      <p className='sm:ml-2 font-bold'>{server1.version}</p>
                    </div>
                  </div>
                </div>

              )}
              {!checkOnline && (
                <div className='italic font-light'>
                  <p className='text-2xl'>Server is currently <span className='text-red-500'>offline.</span></p>
                  <p className='text-base mt-2'>Check our <a href="https://discord.gg/a6JrZMa" target='_blank' className='text-blue-500 underline'>Discord Server</a> for updates.</p>
                </div>
              )}
              {checkOnline && checkPlayers && (
                <div className='mt-2'>
                  Server is <span className="text-green-500 font-bold">online</span> and there are <span className='font-bold'>{server1.players.online}/{server1.players.max}</span> players currently playing!
                  <p className='italic font-light text-sm mt-2'>"{server1.motd.clean}"</p>
                </div>
              )}
              <div className="text-xs mt-2 flex justify-center items-center relative gap-1">
                <p className='text-slate-400'>other server:</p>
                <div className="relative group flex">
                  <h1 className='dark:bg-slate-900 bg-gray-200 text-slate-500 dark:text-slate-400 font-bold rounded py-0.5 px-2 cursor-pointer relative' onClick={() => copy(server2.hostname)}>
                    {server2.hostname}
                  </h1>
                  <span className="pointer-events-none group-hover:opacity-100 transition-opacity bg-gray-700 px-2 py-1 text-sm text-gray-100 rounded-md absolute 
            -translate-x-1/2 -translate-y-14 opacity-0 m-4 mx-auto top-1/2 left-1/2 transform">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </div>
                <p className={server2.online ? 'text-[#618d5c]' : 'text-[#8b6464]'}>{server2.online ? 'online' : 'offline'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-6 pt-14 lg:px-8 flex justify-center items-center flex-col">
          <ol className="relative border-s mt-24 border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-400"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2024 <span className={server1.online ? 'text-green-500' : 'text-red-500'}>{server1.online ? 'online' : 'offline'}</span></time>
              <h3 className="text-lg font-semibold text-white"><a href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9" target='_blank' className='hover:underline'>All the Mods 9 - ATM9</a></h3>
              <p className="text-base font-normal text-gray-400">Survival modpack with a bunch of mods and quests!</p>
              <p className="mb-4 text-xs italic font-light text-gray-400">Get more information and version in our <a href="https://discord.gg/a6JrZMa" target='_blank' className='text-blue-500 hover:underline'>Discord Server</a>!</p>
              <div className='flex'>
                <a href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9/files?page=1&pageSize=3" target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"><img src="/ZeroNetwork/download.svg" alt="->" className="w-4 h-4 mr-2 text-gray-400" /> Download</a>
              </div>
            </li>

            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023 <span className="text-red-800">discontinued</span></time>
              <h3 className="text-lg font-semibold text-gray-400">Im Her Zero Survival</h3>
              <p className="text-base font-normal text-gray-500">Survival multiplayer server with a lot of plugins and datapacks in 1.19.3</p>
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022 <span className="text-red-800">discontinued</span></time>
              <h3 className="text-lg font-semibold text-gray-400"><a href="https://www.feed-the-beast.com/modpacks/91-ftb-oceanblock" target='_blank' className='hover:underline'>FTB OceanBlock</a></h3>
              <p className="text-base font-normal text-gray-500">Survival modpack in island-based mods!</p>
            </li>
            <li className="ms-4">
              <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2021 <span className="text-red-800">discontinued</span></time>
              <h3 className="text-lg font-semibold text-gray-400">Javarock v4</h3>
              <p className="text-base font-normal text-gray-500">Our custom Java and bedrock compatible survival multiplayer server <br />with plugins and datapacks in 1.18</p>
            </li>
          </ol>
        </div>

        {/* Description */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What are we doing?!</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We host fun minecraft servers for our <a href="https://discord.gg/a6JrZMa" target='_blank' className='text-blue-500 hover:underline'>Discord Server</a>! Yippee! <br />
              Sometimes we host modpacks and sometimes survival servers!
            </p>
          </div>
          <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {facts.map((fact) => (
              <div key={fact.name} className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <img src={fact.src} className="absolute left-1 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                  {fact.name}
                </dt>{' '}
                <dd className="inline">{fact.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">The Team</h2>
          </div>
          <ul
            role="list"
            className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 min-[440px]:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
          >
            {team.map((person) => (
              <li key={person.name}>
                <a href={person.href} target='_blank'>
                  <img className="aspect-[14/13] w-full rounded-2xl object-cover bg-gray-800 hover:outline hover:outline-gray-600" src={person.src} alt={person.name} />
                </a>
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-wide text-white uppercase">{person.name}</h3>
                <p className="text-base leading-7 text-gray-300">{person.role}</p>
                <p className="text-sm leading-6 text-gray-500">{person.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </main >

      <footer className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex justify-between items-center">
            <p className="text-xs leading-5 text-gray-400">© 2024 Joe, Inc.</p>
            <a href="https://discord.gg/a6JrZMa" target='_blank' className='rounded-xl'>
              <img src='/ZeroNetwork/discord.svg' className="w-8 h-8 hover:bg-[#2d375a] p-1 rounded-xl transition duration-150"></img>
            </a>
          </div>
        </div>
      </footer>
    </div >

  )
}

export default App