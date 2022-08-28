import { Layout } from '../components/layout'
import AuthForm from '../components/auth/auth_form'

const Register = () => {
  return (
    <Layout title="Register | Watchnode">
      <div>
        <div className="h-screen w-screen bg-gradient-to-r from-black via-gray-800 to-black flex justify-center items-center relative z-50">
          <AuthForm type="register" />
        </div>
      </div>
    </Layout>
  )
}

export default Register
