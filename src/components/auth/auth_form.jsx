import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserIcon, KeyIcon, MailIcon } from '@heroicons/react/solid'
import { Input, Button, Checkbox, NextLottie } from '../common'
import welcomeAnimation from '../../../public/assets/animations/welcome.json'
import arrowAnimation from '../../../public/assets/animations/arrow-right.json'
import { login, register } from '../../services/auth'
import toast from '../../libs/toastify'

const AuthForm = ({ type }) => {
  const navigateTo = useNavigate()
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (type === 'login') {
      const { data } = await login({
        email: formData.name,
        password: formData.password,
      })
      if (rememberMe) localStorage.setItem('rememberMe', 'true')
      else localStorage.removeItem('rememberMe')
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigateTo('/')
    } else {
      const data = await register(formData)
      navigateTo('/login')
      setTimeout(() => {
        toast.success(data.message)
      }, 300)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur py-12 px-7 md:px-12 w-11/12 lg:w-1/2 rounded-2xl">
      <div className="flex justify-center items-center">
        <div className="w-9/12 sm:w-7/12 xl:w-4/12 mb-10">
          <NextLottie animationData={welcomeAnimation} />
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
            <p className="text-sm text-blue ml-2 font-semibold">Remember Me</p>
          </div>
        </div>
        <Button value={type === 'login' ? 'Login' : 'Register'} padding="px-12 py-2 md:py-3" extraClasses="mt-4" />
        <div className="group flex justify-end items-center mt-6">
          <div className="flex justify-center items-center">
            <p className="text-sm text-blue ml-2 font-semibold">{type === 'login' ? "Don't have an account yet" : 'Already have an account'}</p>{' '}
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
