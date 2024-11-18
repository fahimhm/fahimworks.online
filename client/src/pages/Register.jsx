import { useState } from "react"
import RegisterLoginButton from "../components/RegisterLoginButton"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'

function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const { email, username, password, confirmPassword } = data
    try {
      const {data} = await axios.post('/register', { email, username, password, confirmPassword })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Register success. Welcome!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div>
          <h2 className="font-bold text-xl md:text-3xl">FAHIM&apos;s <span className="bg-[#f84525] text-white px-2 rounded-md">PORTFOLIO</span></h2>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={registerUser} method="post">
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Register</span>
              </center>
            </div>

            <div className="mt-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <input
                type='password'
                name="password"
                id="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <input
                type='password'
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <RegisterLoginButton buttonName='Sign Up' textNoLink='Already have account?' linkTo='/login' textLink='Sign In' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register