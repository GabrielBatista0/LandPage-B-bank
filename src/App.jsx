import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter,Routes, useNavigate} from "react-router-dom";
import Home from './pages/Home'
import Nav from './components/Nav'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Main from './pages/Main';
import axios from 'axios';
import env from "react-dotenv";
import SweetAlert2  from 'sweetalert2' ;

function App() {
  const[logado,setLogado] = useState()
  const [dados,setDados] = useState()
  const [token,setToken] = useState()
  const[contador,setContador] = useState(0)
  const[bloq,setBloq] = useState(false)
  const navigate = useNavigate()

    const logar= (cpf, senha)=>{
      axios.post(`${import.meta.env.VITE_SERVIDOR}auth/jwt/create`,{
          id_fiscal: cpf,
          password: senha
        }).then((res)=>{
          console.log(res)
          localStorage.setItem("Token",JSON.stringify({acess:res.data.access,refresh:res.data.refresh}))
          localStorage.setItem("dados", JSON.stringify({cpf:cpf}))
          setLogado(true)
        }).catch((erro)=>{
          console.log(erro)
          if (contador<=3) {
            setContador(contador+1)
            SweetAlert2.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Seu usuário ou senha está incorreto!',
              // footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          else{
              SweetAlert2.fire({
              icon: 'error',
              title: 'É você mesmo??',
              text: 'Seu usuário ou senha está incorreto, sua conta será bloqueada!',
              // footer: '<a href="">Why do I have this issue?</a>'
            })
            setBloq(true) 
          }
         
        })
    }

    useEffect(()=>{
      if (logado==true) {
        navigate('/B&bank')
        setDados(JSON.parse(localStorage.getItem("dados")))  
        setToken(JSON.parse(localStorage.getItem("Token")))  
      }
      else{
        navigate('/')
      }
    },[logado])

  return (
    <>
    {window.location.pathname =="/login" || window.location.pathname =="/cadastro"?null:<Nav dados ={dados} token={token}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login logar={logar} bloq={bloq}/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/B&bank' element={<Main/>}/>
      </Routes> 

    </>
  )
}

export default App
