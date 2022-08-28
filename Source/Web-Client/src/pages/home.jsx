import { Footer, Header, Layout } from '../components/layout'

const Login = () => {
  return (
    <Layout title="Home | Watchnode">
      <Header />
      <div className="h-screen w-screen bg-gradient-to-r from-black via-gray-800 to-black flex justify-center items-center relative z-40"></div>
      <Footer />
    </Layout>
  )
}

export default Login
