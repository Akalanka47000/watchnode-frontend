import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Switch from 'react-switch'
import { ClockIcon } from '@heroicons/react/solid'
import { Input, Button } from '../components/common'
import { Footer, Header, Layout } from '../components/layout'
import {
  getScheduleNotificationSettings,
  getUserNotificationSettings,
  updateScheduleNotificationSettings,
  updateUserNotificationSettings,
} from '../services/setting'
import toast from '../libs/toastify'
import useEffectOnce from '../hooks/useEffectOnce'

const Settings = () => {
  const scheduleId = useParams().schedule_id
  const [formData, setFormData] = useState({
    notification_enabled: true,
    notification_period: 60,
  })

  useEffectOnce(() => {
    if (scheduleId) {
      getScheduleNotificationSettings().then((data) => setFormData(data.data))
    } else {
      getUserNotificationSettings().then((data) => setFormData(data.data))
    }
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    })
  }

  const handleSwitchChange = () => {
    setFormData({
      ...formData,
      notification_enabled: !formData.notification_enabled,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      notification_enabled: formData.notification_enabled,
      notification_period: formData.notification_period,
    }
    if (!scheduleId) {
      await updateUserNotificationSettings(payload)
    } else {
      await updateScheduleNotificationSettings(payload)
    }
    toast.success('Notification settings updated successfully')
  }

  return (
    <Layout title="Settings | Watchnode">
      <Header />
      <div className="h-screen w-screen bg-gradient-to-r from-black via-gray-800 to-black flex justify-center items-center relative z-40">
        <div className="bg-white/90 backdrop-blur py-12 px-7 md:px-12 w-11/12 lg:w-1/2 rounded-2xl">
          <span className="font-bold text-2xl">Settings</span>
          <form className="flex flex-col mt-6" onSubmit={onSubmit}>
            <label className="flex justify-between align-items-center mb-2">
              <span className="font-semibold">Enable Notifications</span>
              <Switch onChange={handleSwitchChange} checked={formData.notification_enabled} onColor="#8334eb" />
            </label>
            <Input
              type="number"
              id="notification_period"
              placeholder="Notification Period"
              required
              value={formData.notification_period}
              onChange={handleInputChange}
              prefixIcon={<ClockIcon />}
            />
            <Button value="Update" padding="px-12 py-2 md:py-3" extraClasses="mt-4" />
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Settings
