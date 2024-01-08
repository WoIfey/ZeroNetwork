import { useState, useEffect } from 'react'

const team = [
  {
    name: 'ImHer0',
    role: 'CEO',
    imageUrl:
      'public/imher0.png',
    location: 'United Kingdom',
  },
  {
    name: 'Wolfey',
    role: 'Design',
    imageUrl:
      'public/wolfey.png',
    location: 'Finland',
  },
]

export default function Example() {
  const [serverData, setServerData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      {
        const response = await fetch('https://mcapi.us/server/status?ip=imher0.ddns.net')
        const data = await response.json()
        console.log(serverData)
        setServerData(data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-gray-900">
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
          <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">The Im Her Zero Network</h2>
            <div className='mt-6 text-lg leading-8 text-gray-300'>
              <div className='flex justify-center items-center gap-4'>
                <h1>imher0.ddns.net</h1>
                <img src={serverData.favicon} alt="" className='h-10 w-10' />
                <p>{serverData.server.name}</p>
              </div>
              <p className='italic font-light tracking-wider'>{/* "{serverData.motd_json}" */}</p>
              <div className='mt-2'>
                Server is <span className={serverData.online ? 'text-green-500' : 'text-red-500'}>{serverData.online ? 'online' : 'offline'}</span> and there are <span>{serverData.players.now}/{serverData.players.max}</span> players
                currently playing!
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-14 lg:px-8 flex justify-center items-center flex-col">
          <ol className="relative border-s mt-32 border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-400"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2024 <span className={serverData.online ? 'text-green-500' : 'text-red-500'}>{serverData.online ? 'online' : 'offline'}</span></time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All the Mods 9</h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">ATM9 modpack!</p>
              <a href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-9" target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Download Pack <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400">Oceanblock</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-500">Oceanblock modpack!</p>
            </li>
            <li className="ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2021 <span className="text-red-800">discontinued</span></time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400">JavaRock</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-500">Java and bedrock survival multiplayer server with plugins and datapacks in 1.17.3</p>
            </li>
          </ol>
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What are we doing?!</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We make minecraft server! Yippee!
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">

          </dl>
        </div>

        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The team</h2>
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
            <p className="text-xs leading-5 text-gray-400">&copy; 2024 Joe, Inc.</p>
            <a href="https://discord.gg/a6JrZMa">
              <img src='public/discord.svg' className="w-6 h-6"></img>
            </a>
          </div>
        </div>
      </footer>
    </div>

  )
}
