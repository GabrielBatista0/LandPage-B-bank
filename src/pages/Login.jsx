import React, { useState, useEffect} from 'react';
import NomeBank from '../components/Nomebank';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import SweetAlert2  from 'sweetalert2' ;
import axios from 'axios';
import env from "react-dotenv";
import InputText from '../components/InputText';



const Login = ({logar,bloq}) => {
    const[cpf,setCPF] = useState('')
    const[senha,setSenha] = useState('')

    return ( 
        <div className='flex w-full h-full bg-[#1A1B1A]'>
            <div className=" lg:w-1/2 h-screen bg-cover bg-[url('src/assets/login.jpg')]">
            </div>
            <div className='w-full lg:w-1/2 h-screen bg-[#1A1B1A] flex justify-center items-center flex-col'>
                <h1 className='font-oswald text-white text-2xl mb-4 sm:text-4xl sm:font-bold sm:p-4'>Acesse sua conta</h1>
                <div className='lg:w-1/3 flex items-start flex-col justify-center'>
                  <InputText textUp={'CPF'} type='text' disabled={bloq} onChange={(e)=> setCPF(e.target.value)}/>
                  <InputText textUp={'Senha'}  type='password' disabled={bloq} onChange={(e)=> setSenha(e.target.value)}/>
                   <div className='flex items-center'>
                    <p className='text-white p-2'>Esqueceu a sua senha?</p><Link className='font-bold text-white hover:text-[#0ACF53]'> Clique aqui!</Link>
                    </div>
                    <div className='flex justify-center items-center w-full'>
                    <Link className='font-bold text-white hover:text-[#0ACF53]' to={'/cadastro'}> Não sou cliente ainda!</Link>
                    </div>
                </div>
                <button className="bg-[#0ACF53] h-10 w-36 rounded-[20px] flex justify-center items-center mt-9 hover:bg-[#30B561] font-oswald font-medium text-white text-xl" onClick={()=>logar(cpf,senha)}> Login </button>
            </div>

        </div>
     );
}
 
export default Login;
