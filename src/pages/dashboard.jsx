import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ImUsers } from 'react-icons/im'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Footer, Header, Layout } from '../components/layout'
import useEffectOnce from '../hooks/useEffectOnce'
import { getAllUsers } from '../services/user'
import { getAllNotifications } from '../services/notifications'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const Dashboard = () => {
  const [userData, setUserData] = useState(null)
  const [notificationData, setNotificationData] = useState(null)

  useEffectOnce(() => {
    getAllUsers('filter[role]=USER').then((res) => {
      setUserData(res.data)
    })
    getAllNotifications().then((res) => {
      const data = {}
      res.data?.forEach((item) => {
        if (data[item.user._id]) {
          data[item.user._id].count += 1
        } else {
          data[item.user._id] = {
            name: item.user.name,
            count: 1,
          }
        }
      })
      setNotificationData({
        total: res.data.length || 0,
        data,
      })
    })
  }, [])

  return (
    <Layout title="Dashboard | Watchnode">
      <Header />
      <div className="h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-black flex justify-center items-center relative">
        <div className="w-screen min-h-screen flex flex-col justify-start items-center pt-28">
          <div className="w-11/12 h-1/2 justify-start flex flex-col lg:flex-row p-8 gap-x-12">
            <div className="min-h-[14rem] flex flex-col justify-center items-center bg-white/5 hover:bg-transparent border-transparent hover:border hover:border-white/10 backdrop-blur-sm p-12 mb-12 lg:mb-0 rounded-lg transition duration-300 cursor-pointer">
              <span className="text-white text-5xl font-semibold">{userData?.length || 0}</span>
              <span className="text-white text-2xl text-center">Registered Users</span>
            </div>

            <div className="w-full">
              <Link to="/users">
                <div className="min-h-[14rem] flex flex-col justify-center items-center bg-white/5 hover:bg-transparent border-transparent hover:border hover:border-white/10 backdrop-blur-sm p-12 mb-12 lg:mb-0 rounded-lg transition duration-300 cursor-pointer">
                  <ImUsers className="text-white w-12 h-12 mb-3" />
                  <span className="text-white text-2xl text-center">User Management</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-11/12 h-1/2 justify-end flex flex-col lg:flex-row px-8 gap-x-12">
            <span className="text-white text-2xl">Total Notifications Sent Out: {notificationData?.total}</span>
          </div>
          <div className="w-11/12 h-1/2 justify-start flex flex-col lg:flex-row p-8 gap-x-12">
            <div className="w-full h-1/2">
              {notificationData && (
                <Bar
                  data={{
                    labels: Object.keys(notificationData?.data)?.map((key) => notificationData['data'][key].name),
                    datasets: [
                      {
                        label: 'Notifications Sent Per User',
                        backgroundColor: Object.keys(notificationData?.data)?.map(() => '#fff'),
                        borderColor: Object.keys(notificationData?.data)?.map(() => '#fff'),
                        data: Object.keys(notificationData?.data)?.map((key) => notificationData['data'][key].count),
                      },
                    ],
                  }}
                  height={450}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          maxRotation: 90,
                          minRotation: 20,
                        },
                        grid: {
                          color: '#ffffff10',
                          lineWidth: 1,
                        },
                      },
                      y: {
                        grid: {
                          color: '#ffffff10',
                          lineWidth: 1,
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Dashboard
