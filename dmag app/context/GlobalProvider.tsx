import { createContext, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "@/utils/appwrite";

const FirstBootContext = createContext<any | null>(null);

const GlobalProvider = ({ children }: { children: any }) => {
  const [firstTime, set_firstTime] = useState<string | null>(null);
  const [orgCode, set_orgCode] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const first_run = async () => {
      const firstTimeStorageValue = useAsyncStorage("FirstTime");
      const _first_time = await firstTimeStorageValue.getItem();
      _first_time ? set_firstTime(_first_time) : set_firstTime("YES");

      const orgNameStorageValue = useAsyncStorage("orgName");
      const _org_code = await orgNameStorageValue.getItem();
      _org_code ? set_orgCode(_org_code) : set_orgCode("");
    };

    const appWriteOps = async () => {
      getCurrentUser()
        .then((res) => {
          if (res) {
            setIsLogged(true);
            console.log(res);
            setUser(res);
          } else {
            setIsLogged(false);
            setUser(null);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    first_run();
    appWriteOps();
  }, []);

  return (
    <FirstBootContext.Provider
      value={{
        firstTime,
        set_firstTime,
        orgCode,
        set_orgCode,
        loading,
        isLogged,
        user,
        setUser,
        setIsLogged,
      }}
    >
      {children}
    </FirstBootContext.Provider>
  );
};

export default GlobalProvider;
export const useGlobalContext = () => useContext(FirstBootContext);
