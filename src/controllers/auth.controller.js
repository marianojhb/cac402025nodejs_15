import authService from '../services/auth.service.js';


const login = async (req, res) =>{
  try {
    const { email, password } = req.body;
    const credential = { email, password }
    
    const token  = await authService.validateUserCredentials(credential);
    
    if (!token) {
      return res.status(401).json({message:"Credenciales invalidas"});
    }
    return res.status(200).json({ token });
  } catch(err)
  {
    console.error("Login error:",err);
    return res.status(500).json({ message: "Error en el servidor"})
  }
} 

const authController = {
  login
}

export default authController;