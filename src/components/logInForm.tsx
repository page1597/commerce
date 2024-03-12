import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleLoginButton from "./ui/googleLoginButton";
import { fbGoogleLogIn } from "@/services/firebase/user";
import Alert from "./alert";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { logInFormSchema } from "@/types/formSchemas/logIn";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogIn from "@/hooks/auth/useLogin";

export default function LogInForm({ logIn }: { logIn: any }) {
  const { isPending, showAlert, setShowAlert, alertContent } = useLogIn();

  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof logInFormSchema>) {
    await logIn(values);
  }

  return (
    <>
      <Alert setShowAlert={setShowAlert} showAlert={showAlert} alertContent={alertContent} />
      <Form {...form}>
        <div className="flex flex-col justify-center items-center md:w-96 w-11/12">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
            <div className="flex md:flex-row w-full flex-col">
              <div className="flex flex-col justify-between h-20 w-full md:gap-0 gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="이메일" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder="비밀번호" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                id="log_in"
                className="md:ml-2 md:h-full md:w-36 bg-zinc-700 hover:bg-zinc-800 md:mt-0 mt-3"
                type="submit"
                disabled={isPending}
              >
                로그인
              </Button>
            </div>
          </form>

          <div className="w-full flex flex-col justify-center items-center mt-14">
            <div className="text-zinc-500 mb-5">소셜 로그인</div>
            <GoogleLoginButton onClick={fbGoogleLogIn} />
          </div>
        </div>
      </Form>
    </>
  );
}
