import { Layout } from '../components/layout'
import AuthForm from '../components/auth/auth_form'

const Login = () => {
  return (
    <Layout title="Login | Watchnode">
      <div>
        <div className="h-screen w-screen bg-gradient-to-r from-black via-gray-800 to-black flex justify-center items-center relative z-50">
          <AuthForm type="login" />
        </div>
      </div>
    </Layout>
  )
}

export default Login
