import { ChangeEvent, useContext, useState } from "react";
import Input from "../../components/atoms/Input/Input";
import { SAILogo } from "../../components/molecules/SAILogo/SAILogo";
import { Sidebar } from "../../components/organisms/Sidebar/Sidebar";
import { FormField } from "../../components/molecules/FormField/FormField";
import { Label } from "../../components/atoms/Label/Label";
import Button from "../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const loginFormSchema = z.object({
  login: z.string()
    .min(1, "Login é obrigatório"),
  password: z.string()
    .min(1, "Senha é obrigatória")
})

type loginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
  const navigate = useNavigate();
  // const { authenticated, login } = useContext(AuthContext);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const loginValue = watch("login");
  const passwordValue = watch("password");

  // if (authenticated) navigate("/home");

  async function handleLogin(data: loginFormData) {
    // try {
    //   await login(data.email, data.password);
    //   toast.info("Login realizado com sucesso!");
    // } catch (err) {
    //   if (err instanceof Error)
    //     toast.error(err.message);
    // }
  }

  return <div className="flex w-full h-full">
    <Sidebar className="w-1/3 bg-white-200 h-full border-none">
      <SAILogo className="absolute"/>

      <form onSubmit={handleSubmit(handleLogin)} className="
        relative w-full h-full flex flex-col justify-center gap-4
      ">
        <FormField haveError={!!errors.login} errorMessage={errors.login?.message}>
          <Label>Login</Label>
          <Input
            type="text"
            // {...register("email")}
            value={loginValue??""}
            onChange={ev => setValue("login", ev.target.value)}
            placeholder="Insira seu email"
            borderless
          ></Input>
        </FormField>

        <FormField haveError={!!errors.password} errorMessage={errors.password?.message}>
          <Label>Senha</Label>
          <Input
            type="password"
            value={passwordValue??""}
            onChange={ev => setValue("password", ev.target.value)}
            placeholder="Insira sua senha"
            borderless
          ></Input>
        </FormField>

        <Button
          color="blue"
          disabled={isSubmitting}
        >
          <Label className="w-full p-2">Login</Label>
        </Button>
      </form>
    </Sidebar>

    <div className="w-full h-full bg-gray-700">
      <img
        src="https://images.unsplash.com/photo-1737047119483-1ddb4cb13540?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="object-cover h-full w-full"
      />
    </div>
  </div>
}