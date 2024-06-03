
/*import axios from 'axios';

export const loginUser = async (formData: any, setToken: any, setError: any, setIsSuccess: any, setIsLoading:any) => {
  try {
        const response = await axios.post('api/login', formData);
        //localStorage.setItem("userData", JSON.stringify(userData));
        setToken(response.data.token);
        setIsSuccess(true);
        setError(null);
        //localStorage.setItem("LoginStatus", JSON.stringify(true));
  } catch (error:any) {
        setError(error.response.data.message);
        setIsSuccess(false);
  } finally {
        setIsLoading(false);
  }
};*/