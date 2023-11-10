"use client"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { auth, githubProvider } from "@/utils/firebase.config"
import { GithubAuthProvider, fetchSignInMethodsForEmail, GoogleAuthProvider, signInWithPopup, signInWithCredential, linkWithCredential } from "firebase/auth"
import { useState } from "react"

const Login = () => {

  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [errorMessage, setErrorMessage] = useState<string>()


  const handleGoogleLoginClick = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      route.push("/");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
  }

  const handleGithubLoginClick = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      let user = result.user
      route.push("/");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error)
      fetchSignInMethodsForEmail(auth, email).then(providers => {
        console.log(providers)
      })
      switch(errorCode){
        case "auth/account-exists-with-different-credential":
          setErrorMessage("Email has been signed with other OAuth, use other account or login with your mail instead");
          break;
        default:
          setErrorMessage("Login Failed!")
      }
    })
  }

  
  return (
    <div className="w-screen h-screen bg-gradient-to-r flex justify-center items-center from-[#F07654] to-[#F5DF2E] ">
      <div className="bg-white w-[400px] p-3 flex flex-col items-center h-[500px] shadow-md">
        <div className="w-[97%] h-[20%] flex-col flex justify-around">
          <button onClick={handleGithubLoginClick} className="w-[100%] border-2 flex items-center justify-center bg-black text-white">
            <FaGithub />
            <span className="mx-3">Github</span>
          </button>
          <button onClick={handleGoogleLoginClick} className="w-[100%] border-2 flex items-center justify-center  ">
            <FcGoogle />
            <span className="mx-3">Google</span>
          </button>
        </div>
        <div className="h-[70%] flex justify-center items-center border-2 w-[97%]">
          Comming soon....
        </div>
        {errorMessage && <div className="bg-[#f7a2a2] flex justify-center items-center text-red-600 w-[97%] h-[50px]">
          {errorMessage} 
        </div>}
      </div>
    </div>
  )
}

export default Login