import { useState } from 'react'
import * as _ from 'lodash'
import { CloudUploadIcon } from '@heroicons/react/solid'
import { Footer, Header, Layout } from '../components/layout'
import useEffectOnce from '../hooks/useEffectOnce'
import { addSchedule, getLatestSchedule, updateSchedule } from '../services/schedule'
import toast from '../libs/toastify'
import Input from '../components/common/input'
import { Button } from '../components/common'

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

  const handleSubmit = () => {
    schedule.events = schedule.events.map((event) => {
      return {
        ...event,
        name: event.name || '---'
      }
    })
    updateSchedule(schedule._id, {
      events: schedule.events
    }).then((data) => {
      toast.success(data.message)
    })
  }

  return (
    <Layout title="Home | Watchnode">
      <Header />
      <div className="min-h-screen w-screen bg-gradient-to-r from-black via-gray-800 to-black flex justify-between items-center relative z-40 pt-20">
        <div className="w-full min-h-screen flex justify-center items-center mr-28 mb-24">
          {schedule && schedule?.events?.length > 0 ? (
            <div className="flex flex-col w-full justify-center items-center">
              <div className='w-full flex justify-center items-center mb-8 px-8 xl:px-[8rem]'>
                <Button value="<<" padding="px-12 py-2 md:py-3" extraClasses={`rounded-r-none font-bold ${day <= 1 ? 'bg-gray-600' : ''}`} onClick={() => {
                  if (day > 1) setDay(day - 1)
                }} />
                <div className='w-full px-10 bg-white py-2 md:py-3 text-center'>
                  {new Date(schedule.events.slice((24 * (day - 1)), (24 * (day - 1)) + 24)[0].start).toLocaleString('en-us', { weekday: 'long' })}
                </div>
                <Button value=">>" padding="px-12 py-2 md:py-3" extraClasses={`rounded-l-none font-bold ${day >= 7 ? 'bg-gray-600' : ''}`} onClick={() => {
                  if (day < 7) setDay(day + 1)
                }} />
              </div>
              <form className="w-full grid grid-cols-1 xl:grid-cols-2 content-center place-items-center place-content-center px-2 xl:px-24">
                {
                  schedule.events.slice((24 * (day - 1)), (24 * (day - 1)) + 24 ).map((event, index) => {
                    return (
                      <div className='w-11/12 flex justify-center items-center'>
                        <div className='w-6/12 md:w-4/12 2xl:w-3/12 h-full py-3 px-6 bg-primary-base text-white rounded-l-md'>
                          {new Date(event.start).toLocaleTimeString()}
                        </div>
                        <Input
                          key={index}
                          label={event.name}
                          name={event.name}
                          type="text"
                          value={event.name}
                          required
                          wrapperclasses="w-6/12 md:w-8/12 2xl:w-9/12"
                          className="h-full py-3.5 px-3 rounded-r-md rounded-l-none focus:ring-0"
                          onChange={(e) => {
                            const events = schedule.events
                            events[index].name = e.target.value
                            setSchedule({ ...schedule, events })
                          }}
                        />
                      </div>
                    )
                  })
                }
              </form>
              <div className='w-full px-8 xl:px-[8rem]'>
                <Button value="Update" padding="w-full px-12 py-2 md:py-3" extraClasses="mt-4" onClick={handleSubmit} />
              </div>
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
