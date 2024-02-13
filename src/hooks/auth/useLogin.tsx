import { logInFormSchema } from "@/types/formSchemas/logIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useLogIn(logIn: any) {
  function onSubmit(values: z.infer<typeof logInFormSchema>) {
    logIn(values);
  }

  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return { onSubmit, form };
}
