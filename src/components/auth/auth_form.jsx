import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserIcon, KeyIcon, MailIcon } from '@heroicons/react/solid'
import { Input, Button, Checkbox, NextLottie } from '../common'
import welcomeAnimation from '../../../public/assets/animations/welcome.json'
import arrowAnimation from '../../../public/assets/animations/arrow-right.json'
import { login, register } from '../../services/auth'
import toast from '../../libs/toastify'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/user'

const AuthForm = ({ type }) => {
  const navigateTo = useNavigate()
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (type === 'login') {
      await login({
        email: formData.name,
        password: formData.password,
      }).then((res) => {
        if (res) {
          if (rememberMe) localStorage.setItem('rememberMe', 'true')
          else localStorage.removeItem('rememberMe')
          localStorage.setItem('token', res.data.access_token)
          dispatch(setUser(res.data.user))
          navigateTo('/')
        }
      })
    } else {
      await register(formData).then((data) => {
        if (data) {
          navigateTo('/login')
          setTimeout(() => {
            toast.success(data.message)
          }, 300)
        }
      })
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur border-2 border-primary-base/50 py-12 px-7 md:px-12 w-11/12 lg:w-1/2 rounded-2xl">
      <div className="flex justify-center items-center">
        <div className="w-9/12 sm:w-7/12 xl:w-4/12 mb-10">
          <div className="border-2 border-primary-base rounded-full">
            <NextLottie animationData={welcomeAnimation} />
          </div>
        </div>
      </div>
      <form id={`${type}Form`} className="flex flex-col " onSubmit={onSubmit}>
        <Input
          type={type === 'login' ? 'email' : 'text'}
          id="name"
          placeholder={type === 'login' ? 'Email' : 'Name'}
          required
          onChange={handleInputChange}
          prefixIcon={<UserIcon />}
        />
        {type === 'register' && <Input type="text" id="email" placeholder="Email" required onChange={handleInputChange} prefixIcon={<MailIcon />} />}
        <Input id="password" type="password" placeholder="Password" required onChange={handleInputChange} prefixIcon={<KeyIcon />} />

        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <Checkbox checked={rememberMe} toggle={setRememberMe} />
            <p className="text-sm text-white ml-2 font-semibold">Remember Me</p>
          </div>
        </div>
        <Button value={type === 'login' ? 'Login' : 'Register'} padding="px-12 py-2 md:py-3" extraClasses="mt-4" />
        <div className="group flex justify-end items-center mt-6">
          <div className="flex justify-center items-center">
            <p className="text-sm text-white ml-2 font-semibold">{type === 'login' ? "Don't have an account yet" : 'Already have an account'}</p>{' '}
            <div className="h-8 w-8 invert -rotate-90">
              <NextLottie animationData={arrowAnimation} />
            </div>{' '}
            <a
              className="cursor-pointer text-sm text-primary-base hover:text-primary-hover group-hover:mr-2 transition-all duration-300"
              href={type === 'login' ? '/register' : '/login'}
            >
              {type === 'login' ? 'Register' : 'Login'}
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
