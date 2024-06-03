import React from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import FormInput from './form/form-input';
import FormPassword from './form/form-password';

export default function FormLogin() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col gap-14">
        <h1 className="text-3xl font-bold text-white mb-20 text-center">
          LOGIN
        </h1>
        <div>
          <Label htmlFor="email" className="text-white text-xs">
            Email
          </Label>
          <FormInput id="email" name="email" placeholder="Insira seu e-mail" />
        </div>
        <div>
          <Label htmlFor="password" className="text-white text-xs">
            Senha
          </Label>
          <FormPassword
            id="password"
            name="password"
            placeholder="Insira sua senha"
          />
        </div>
        <Button className="mt-20 bg-tertiary font-bold hover:bg-transparent hover:border-2 hover:border-white">
          Entrar
        </Button>
      </div>
    </div>
  );
}
