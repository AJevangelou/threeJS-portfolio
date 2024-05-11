import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({name: '', email: '' , message: ''})
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  
  const handleChange =  (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };
  const handleFocus = () =>{
    
  }
  const handleBlur = () =>{

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.send( 
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Alex",
        from_email: form.email,
        to_email: 'johnyevag95@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });
      setForm({name: '', email: '', message: ''});
      showAlert({show:true, text:'Message sent successfully!', type:'success'})
    }).catch((error)=> {
      setIsLoading(false);
      console.log(error);
      showAlert({
        show: true,
        text: "I didn't receive your message 😢",
        type: "danger",
      });
    })

  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container max-lg: h-screen w-full'>
      {alert.show && <Alert {...alert}/>}
      <div className='flex-1 min-w-[50%] flex flex-col'> 
        <h1 className='head-text'>Get In touch</h1>

        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-14'>
          
          <label className='text-black-500 font-semibold'>
          Name
            <input type="text" name='name' className='input' placeholder='John' required value={form.name} onChange={handleChange}
            onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <label className='text-black-500 font-semibold'>
          Email
            <input type="text" name='email' className='input' placeholder='@gmail.com' required value={form.email} onChange={handleChange}
            onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <label className='text-black-500 font-semibold'>
          Your Message
            <textarea name='message' rows={4} className='input' placeholder='Type your text here' required value={form.message} onChange={handleChange}
            onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <button className='btn' type='submit' onFocus={handleFocus} disabled={isLoading} onBlur={handleBlur}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        </div>
        <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
          <Canvas camera={{position: [0,0, 5], fov:75, near:0.1, far:1000}} >
            <Suspense fallback={<Loader/>}/>
            <directionalLight intensity={2.5} position={[0,0,1]}/>
            <ambientLight intensity={0.5} />
            <Fox position={[0.5, 0.35, 0]} rotation={[12.6,-0.6,0]} scale={[0.5, 0.5, 0.5]} currentAnimation={currentAnimation}/>
          </Canvas>
        </div>
      
    </section>
  )
}

export default Contact