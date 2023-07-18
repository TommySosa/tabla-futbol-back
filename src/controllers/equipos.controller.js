import { pool } from '../db.js'

export const getEquipos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM equipos')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const getEquipo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Equipo no encontrado'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const createEquipos = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({
            message: 'El nombre del equipo es requerido',
        });
    }

    try {
        const [rows] = await pool.query('SELECT id FROM equipos WHERE nombre = ?', [nombre]);
        if (rows.length > 0) {
            return res.status(409).json({
                message: 'El nombre del equipo ya está en uso',
            });
        }
        const result = await pool.query('INSERT INTO equipos (nombre) VALUES (?)', [nombre]);
        const createdId = result.insertId;
        return res.status(201).json({
            id: createdId,
            nombre,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal al crear el equipo',
        });
    }
};


export const deleteEquipo = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM equipos WHERE id = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Equipo no encontrado'
        })

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const updateEquipo = async (req, res) => {
    const { id } = req.params
    const { nombre, puntos, partidos_jugados, partidos_ganados, partidos_empatados, partidos_perdidos, goles_favor, goles_contra } = req.body

    try {
        const [result] = await pool.query('UPDATE equipos SET nombre = IFNULL(?, nombre), puntos = IFNULL(?, puntos), partidos_jugados = IFNULL(?, partidos_jugados),partidos_ganados = IFNULL(?,partidos_ganados), partidos_empatados = IFNULL(?, partidos_empatados), partidos_perdidos = IFNULL(?,partidos_perdidos), goles_favor = IFNULL(?, goles_favor),goles_contra = IFNULL(?, goles_contra) WHERE id = ? ', [nombre, puntos, partidos_jugados, partidos_ganados, partidos_empatados, partidos_perdidos, goles_favor, goles_contra, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Equipo no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}