const loginUserFireBase = async (formData: any, auth:any, signInWithEmailAndPassword: any ,setIsSuccess: any, setError: any, router: any, setIsLoading: any, setToken:any) => {

  try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        console.log('Usuario ha iniciado sesión:', user);
        //setToken: aca podria guardar un token al estado loca, y del componente al localstorage.
        setIsSuccess(true);
        setError(null)
        setToken(user.accesToken)
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