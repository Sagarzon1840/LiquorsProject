const loginUserFireBase = async (formData: any, auth:any, signInWithEmailAndPassword: any ,setIsSuccess: any, setError: any, router: any, setIsLoading: any) => {

  try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = JSON.stringify(userCredential.user.accessToken);
        localStorage.setItem("loginToken", user)
        setIsSuccess(true);
        setError(null)
        setTimeout(() => {
          router.push("/")
        }, 2000);
  } catch (error: any) {
        const errorMessage = error.message;
        console.error('Error en el inicio de sesión:', errorMessage);
        setError(errorMessage);
        setIsSuccess(false);
  } finally {
    setIsLoading(false);
  }
};

export default loginUserFireBase;