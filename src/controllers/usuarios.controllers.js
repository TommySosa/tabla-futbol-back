import { pool } from '../db.js'

export const registerUser = async (req, res) => {
    const { nombre, email, contraseña, rol } = req.body;
  
    try {
      if (!nombre || !email || !contraseña || !rol) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }

      const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'El email ya está registrado' });
      }

      const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?,?,?,?)',
        [nombre, email, contraseña, rol]
      );
  
      const insertedUserId = result.insertId;

      res.status(201).json({
        id: insertedUserId,
        nombre,
        email,
        rol,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Algo salió mal al registrar el usuario' });
    }
  };
  

export const loginUser = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }
        
        const usuario = rows[0];
        if (contraseña !== usuario.contraseña) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.send({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Algo salió mal al iniciar sesión' });
    }
};