'use client';
import Image from 'next/image';
import logo from '/public/logo.png';
import FormLogin from '@/components/form-login';
import LoginFactory from '@/main/factories/login-factory';

export default function Login() {
  return (
    <LoginFactory>
      <div className="w-full h-screen bg-secondary flex items-center relative">
        <div className=" w-full flex items-center justify-center">
          <Image alt="imagem de logo" src={logo.src} width={500} height={500} />
        </div>
        <div className="w-1/3 h-screen bg-tertiary bg-opacity-75 py-28 px-10">
          <FormLogin />
        </div>
      </div>
    </LoginFactory>
  );
}
