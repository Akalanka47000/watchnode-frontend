import { useState } from 'react'
import { CloudUploadIcon } from '@heroicons/react/solid'
import { Footer, Header, Layout } from '../components/layout'
import useEffectOnce from '../hooks/useEffectOnce'
import { addSchedule, getLatestSchedule } from '../services/schedule'
import toast from '../libs/toastify'

const Home = () => {
  const [schedule, setSchedule] = useState({})

  useEffectOnce(() => {
    getLatestSchedule().then((data) => setSchedule(data.data?.length > 0 ? data.data : null))
  })

  const onFileInput = async (e) => {
    const data = await addSchedule(e.target.files[0])
    toast.success(data.message)
  }

  return (
    <Layout title="Home | Watchnode">
      <Header />
      <div className="h-screen w-screen bg-gradient-to-r from-black via-gray-800 to-black flex justify-between items-center relative z-40">
        <div className="w-full h-screen flex justify-center items-center mr-28">
          {schedule ? (
            <div className="grid grid-cols-7 grid-rows-8">Schedule details</div>
          ) : (
            <p className="text-white text-4xl font-bold">No Schedules Uploaded Yet</p>
          )}
        </div>
        <div className="absolute bottom-0 right-0 w-28 h-screen-nav flex justify-center items-center bg-primary-base hover:bg-primary-hover transition-all duration-300 cursor-pointer">
          <CloudUploadIcon className="w-16 h-16 mr-3 text-white" />
          <input type="file" className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0" onInput={onFileInput} />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Home
