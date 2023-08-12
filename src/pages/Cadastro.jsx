
import React, { useState, useEffect} from 'react';
import NomeBank from '../components/Nomebank';
import Footer from '../components/Footer';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import SweetAlert2  from 'sweetalert2' ;
import axios from 'axios';
import env from "react-dotenv";
import { Radio } from "@material-tailwind/react";
import InputText from '../components/InputText';


const Cadastro = () => {
    // const[image,setImage] = useState()
    const[nome,setNome] = useState()
    const[senha,setSenha] = useState()
    const[nascimento,setNascimento] = useState()
    const[rg,setRg] = useState()
    const[cpf,setCPF] = useState()
    const[preview,setPreview] =useState()
    const[parte,setParte] =useState(0)
    const[tipoConta,setTipoConta] =useState("")
    const[email,setEmail] = useState()
    const[ramal,setRamal] = useState(0)
    const[telefone,setTelefone] = useState()
    const[cep,setCep] = useState("")
    const[cidade,setCidade] = useState("")
    const[Bairro,setBairro] = useState("")
    const[logradouro,setLogradouro] = useState("")
    const[uf,setUf] = useState("")
    const[cepFormatado,setCepFormatado] = useState("")
    const[casa,setCasa] = useState("")

  const navigate = useNavigate()
    
    
    //Proxima tela
    const proximaTela = ()=>{
      setParte(parte+1)
    }
    // primeiro cdastrar o cliente no auth/user 
    //com base no response (se deu certo criar usuario) se sim agorar gerar o jwt
    const CadastrarClienteAuth = () => {
      axios.post(`${import.meta.env.VITE_SERVIDOR}auth/users/`,{
        id_fiscal:cpf,
        password:senha
        
      }).then((res)=>{
        console.log(res.status)
        if(res.status== 200 || res.status == 201){
          GetToken()
        }
        let erro = res.data
        console.log(erro)
      }).catch((erro)=>{
        console.log(erro)
        alert(erro)
      })
    }
    
    const GetToken= ()=>{
      axios.post(`${import.meta.env.VITE_SERVIDOR}auth/jwt/create`,{
        id_fiscal: cpf,
        password: senha
      }).then((res)=>{
        console.log(res)
        if(res.status == 200 || res.status == 201){
          localStorage.setItem("Token",JSON.stringify({acess:res.data.access,refresh:res.data.refresh}))
          CadastrarCliente(res.data.access)
        }
        
      }).catch((erro)=>{
        console.log(erro)
      })
    }
    
    const setarimage =(e)=>{
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
      setPreview(reader.result)
   };
        // setPreview(URL.createObjectURL(e.target.files[0]))
    }
    const CadastrarCliente=(acesso)=>{
      console.log(acesso)
      axios.post(`${import.meta.env.VITE_SERVIDOR}fastbank/clientes/`,{
        nome:nome,
        foto:preview,
        dt_nascimento:nascimento,
        rg:rg,
      
      },{headers: { Authorization: `JWT ${acesso}`}})
      .then((res)=>{
        console.log(res)
        let a = res.data
        console.log(a.at(-1))
        console.log(a);
        if(res.status== 200 || res.status == 201){
          CadastrarConta(acesso)
        }


      }).catch((erro)=>{
        console.log(erro)
        SweetAlert2.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar cliente!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
      })
    }

    const CadastrarConta=(acesso)=>{
      let agencia ="";
      let numero="";
      for (let i = 0; i <4 ; i++) {
          let aleatorio= Math.floor(Math.random()* (9 - 0) + 0);
          agencia+=aleatorio
          console.log(aleatorio)
      }
      for (let i = 0; i <6 ; i++) {
          let aleatorio= Math.floor(Math.random()* (9 - 0) + 0);
          numero+=aleatorio
      }
          axios.post(`${import.meta.env.VITE_SERVIDOR}/fastbank/conta/`,{                   
            ativo:true,
            agencia:agencia,
            tipo:tipoConta,
            numero:numero,
            saldo:0,
            cliente:' ',

        },{headers: { Authorization: `JWT ${acesso}`}})
        .then((res)=>{
        console.log(res)
            if(res.status== 200 || res.status == 201){
                cadastrarContato(acesso)
            }

        }).catch((erro)=>{
        console.log(erro)
        SweetAlert2.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao cadastrar Conta!',
        })
        })
        
      }

      const cadastrarContato=(acesso)=>{
        console.log(ramal);
        axios.post(`${import.meta.env.VITE_SERVIDOR}fastbank/contato/`,{
          telefone: telefone,
          ramal:ramal,
          observacao:null,
          email:email,
          cliente:' ',
        },{headers: { Authorization: `JWT ${acesso}`}})
        .then((res)=>{
        console.log(res)
            if(res.status== 200 || res.status == 201){
                cadastrarLocal(acesso)
            }

        }).catch((erro)=>{
        console.log(erro)
        SweetAlert2.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao cadastrar Contato!',
        })
        })
      }


    //Setar local
    useEffect(()=>{
      let a ="";
      if(cep.length ==8){
          for(var i=0; i<= cep.length;i++){
              if(i==5){
               a+="-"+cep.charAt(i)
              }
              else{
                  a = a+cep.charAt(i)
              }
              console.log(a);
          }
          setCepFormatado(a)
      }
   
  },[cep])

  useEffect(()=>{
    console.log(cepFormatado);
    axios.get(`https://cdn.apicep.com/file/apicep/${cepFormatado}.json`)
    .then((res) => {
      console.log(res.data)
      setBairro(res.data.district)
      setCidade(res.data.city)
      setLogradouro(res.data.address)
      setUf(res.data.state)
    }) 

},[cepFormatado])

const cadastrarLocal = (acesso)=>{
  console.log(acesso)
  axios.post(`${import.meta.env.VITE_SERVIDOR}fastbank/endereco/`,{
    logradouro:logradouro,
    bairro: Bairro,
    cep: cep,
    cidade:cidade,
    uf:uf,
    n_casa:casa,
    cliente:" ",
  
  },{headers: { Authorization: `JWT ${acesso}`}})
  .then((res)=>{
    console.log(res)
    let a = res.data
    console.log(a.at(-1))
    
    if(res.status== 200 || res.status == 201){
      navigate('/B&bank')
    }


  }).catch((erro)=>{
    console.log(erro)
    SweetAlert2.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Erro ao cadastrar Endereco!',
    })
  })

}

    return ( 
        <>
        <div className='flex w-full h-full bg-[#1A1B1A]'>
        <div className=" lg:w-1/2 h-screen bg-cover bg-[url('src/assets/verde.png')]">
        </div>
        {
            parte ==0?
            <>
            <div className='w-full lg:w-1/2 h-screen bg-[#1A1B1A] flex justify-center items-center flex-col'>
                <h1 className='font-oswald text-white text-2xl mb-4 sm:text-4xl sm:font-bold sm:p-4'>Criar sua conta</h1>
                <div className='lg:w-1/3 flex items-start flex-col justify-center'>
                    <InputText textUp={'Nome'} type='text'  onChange={(e)=> setNome(e.target.value)}/>
                    <InputText textUp={'CPF'}  type='text'  onChange={(e)=> setCPF(e.target.value)}/>
                    <InputText textUp={'RG'}  type='text'  onChange={(e)=> setRg(e.target.value)}/>
                    <InputText textUp={'Senha'}  type='password'  onChange={(e)=> setSenha(e.target.value)}/>
                    <InputText textUp={'Data de nascimento'}  type='date'  onChange={(e)=> setNascimento(e.target.value)}/>
                    <input className="text-white font-oswald" type='file'  onChange={setarimage}/>
                </div>
                {preview!=null? <img src={preview} className='w-24 h-24'></img>:null}
                <button className="bg-[#0ACF53] h-10 w-36 rounded-[20px] flex justify-center items-center mt-9 hover:bg-[#30B561] font-oswald font-medium text-white text-xl" onClick={proximaTela}> Próximo </button>
            </div>
            </>
            :
            parte ==1?
            <>
            <div className='w-full lg:w-1/2 h-screen bg-[#1A1B1A] flex justify-center items-center flex-col'>
                <h1 className='font-oswald text-white text-2xl mb-4 sm:text-4xl sm:font-bold sm:p-4'>Qual será o tipo de conta?</h1>
                <div className='lg:w-1/2 flex items-start flex-col justify-center'>
                <div class="flex items-center mr-4 gap-10 p-10">
                    <Radio id="Salario" name="type" label="Salario" color='green' value="S"  onClick={(e) =>setTipoConta(e.target.value)}  defaultChecked />
                    <Radio id="Deposito" name="type" label="Deposito" color='green' value="D" onClick={(e) =>setTipoConta(e.target.value)} />
                    <Radio id="Pagamento" name="type" label="Pagamento" color='green' value="P" onClick={(e) =>setTipoConta(e.target.value)} />
                </div>
                </div>
                <button className="bg-[#0ACF53] h-10 w-36 rounded-[20px] flex justify-center items-center mt-9 hover:bg-[#30B561] font-oswald font-medium text-white text-xl" onClick={proximaTela}> Próximo </button>
            </div>
            </>
            :
            parte==2?
            <>
            <div className='w-full lg:w-1/2 h-screen bg-[#1A1B1A] flex justify-center items-center flex-col'>
                <h1 className='font-oswald text-white text-2xl mb-4 sm:text-4xl sm:font-bold sm:p-4'>Cadastrar contato da sua conta:</h1>
                <div className='lg:w-1/3 flex items-start flex-col justify-center'>
                    <InputText textUp={'Email'} type='text'  onChange={(e)=>setEmail(e.target.value)} placeholder={"exemplo@gmail.com"}/>
                    <InputText textUp={'Ramal'}  type='numeric'  onChange={(e)=> setRamal(e.target.value)} placeholder={"(512)"}/>
                    <InputText textUp={'Telefone'}  type='text'  onChange={(e)=> setTelefone(e.target.value)} placeholder={"(DDD) 99999-0000"}/>
                </div>
                <button className="bg-[#0ACF53] h-10 w-36 rounded-[20px] flex justify-center items-center mt-9 hover:bg-[#30B561] font-oswald font-medium text-white text-xl" onClick={proximaTela}> Próximo </button>
            </div>
            </>
            :
            parte ==3?
            <>
            <div className='w-full lg:w-1/2 h-screen bg-[#1A1B1A] flex justify-center items-center flex-col'>
                <h1 className='font-oswald text-white text-2xl mb-4 sm:text-4xl sm:font-bold sm:p-4'>Qual é o seu endereço?</h1>
                <div className='lg:w-1/3 flex items-start flex-col justify-center'>
                    <InputText textUp={'CEP'} type='text' value={cep} onChange={(e)=> setCep(e.target.value)}/>
                    <InputText textUp={'Cidade'}  type='text' value={cidade}   disabled={true}/>
                    <InputText textUp={'Logradouro'}  type='text'  value={logradouro}  disabled={true}/>
                    <InputText textUp={'Bairro'}  type='text'  value={Bairro}  disabled={true}/>
                    <InputText textUp={'Estado'}  type='text'  value={uf}  disabled={true}/>
                    <InputText textUp={'N° Casa'}  onChange={(e)=> setCasa(e.target.value)}/>
                </div>
                <button className="bg-[#0ACF53] h-10 w-36 rounded-[20px] flex justify-center items-center mt-9 hover:bg-[#30B561] font-oswald font-medium text-white text-xl" onClick={CadastrarClienteAuth}> Cadastrar </button>
            </div>
            
            </>
            :null

        }
            
         

        </div>
        </>
     );
}
 
export default Cadastro;