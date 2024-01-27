import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { firebaseAuth, getUser } from "@/firebase";
import { UserInfoType } from "@/types";
//provider/authProvider.tsx 에서 유저 정보를 내려줘야 한다.
// onAuthStateChanged를 실행하고 useEffect를 사용해 변경을 감지하자.
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfoType | null>(null);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(async (currentUser) => {
      console.log("구독 시작: ", currentUser);
      if (currentUser) {
        await getUser(currentUser.uid).then((user) => {
          if (user) {
            setUser({
              type: user.type,
              name: user.name,
              email: user.email,
            });
          }
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
