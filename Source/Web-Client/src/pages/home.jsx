import { useState } from 'react'
import * as _ from 'lodash'
import { CloudUploadIcon } from '@heroicons/react/solid'
import { Footer, Header, Layout } from '../components/layout'
import useEffectOnce from '../hooks/useEffectOnce'
import { addSchedule, getLatestSchedule, updateSchedule } from '../services/schedule'
import toast from '../libs/toastify'
import Input from '../components/common/input'

const Home = () => {
  const [schedule, setSchedule] = useState({
    user: '',
    events: []
  })

  const [day, setDay] = useState(1)

  const fetchSchedule = () => {
    getLatestSchedule().then((data) => setSchedule(data.data || {}))
  }

  useEffectOnce(() => {
    fetchSchedule()
  })

  const onFileInput = async (e) => {
    const data = await addSchedule(e.target.files[0])
    toast.success(data.message)
    fetchSchedule()
  }

  const handleSubmit = (e) => {
    updateSchedule(schedule._id, schedule).then((data) => {
      toast.success(data.message)
    })
  }

  return (
    <Layout title="Home | Watchnode">
      <Header />
      <div className="min-h-screen w-screen bg-gradient-to-r from-black via-gray-800 to-black flex justify-between items-center relative z-40 pt-20">
        <div className="w-full min-h-screen flex justify-center items-center mr-28 mt-12">
          {schedule && schedule?.events?.length > 0 ? (
              <div className="flex flex-col w-full justify-center items-center">
                <form className="w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                  {
                    schedule.events.slice(day - 1, 24).map((event, index) => {
                      return (
                        <Input
                          key={index}
                          label={event.name}
                          name={event.name}
                          type="time"
                          value={event.time}
                          required
                        />
                      )
                    })
                  }
                </form>
              </div>
          ) : (
            <p className="text-white text-4xl font-bold">No Schedules Uploaded Yet</p>
          )}
        </div>
        <div className="absolute top-0 right-0 w-28 min-h-screen h-full flex justify-center items-center bg-primary-base hover:bg-primary-hover transition-all duration-300 cursor-pointer">
          <CloudUploadIcon className="w-16 h-16 mr-3 text-white" />
          <input type="file" className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0" onChange={onFileInput} />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Home
