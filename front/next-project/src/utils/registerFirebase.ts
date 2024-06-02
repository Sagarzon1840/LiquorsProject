
const registerUserFirebase = async (formData: any, auth:any, createUserWithEmailAndPassword: any ,setIsSuccess: any, setErrors: any, router: any, errors: any, setIsLoading: any, setToken: any) => {
      try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user; //Objeto que contiene información del usuario registrado. (token, mail, etc.)
            console.log('lo que devuelve firebase:', user);
            setIsSuccess(true);
            setErrors({});
            setTimeout(() => {
                  router.push("/login")
            }, 2000);
      } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error en el registro:', errorCode, errorMessage);
            setErrors({ ...errors, submit: errorMessage }); 
      } finally {
            setIsLoading(false);
      }
};

export default registerUserFirebase;
