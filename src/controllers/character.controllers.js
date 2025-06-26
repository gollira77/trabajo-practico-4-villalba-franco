import Character from "../models/character.model.js";

const validacionesCharacter = async (data, isUpdate = false, id=null) => {
    const errores = [];

    if (!data.name || data.name.trim() === '') errores.push("El nombre es obligatorio");
    if (!Number.isInteger(data.ki)) errores.push("El KI debe ser un número entero.");
    if (!data.race) errores.push("La raza es totalmente obligatoria.");
    if (!['Male', 'Female'].includes(data.gender)) errores.push("El género debe ser si o si es 'Male' o 'Female'.");
    if (data.description && typeof data.description !== 'string') errores.push("La descripción debe contener texto.");

    const existe = await Character.findOne({ where: { name: data.name } });
        if (existe && (!isUpdate || existe.id != id)) {
            errores.push("Ya existe un personaje con ese nombre.");
        }

    return errores;
}

export const getAllCharacters = async (res) => {
    try {
        const characters = await Character.findAll(); 
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCharacterById = async (req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (!character) return res.status(404).json({ error: "No se encontro ningun personaje" });
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createCharacter = async (req, res) => {
    const errores = await validacionesCharacter(req.body);
    if (errors.length) return res.status(400).json({ errores });

    try {
        const newChar = await Character.create(req.body);
        res.status(201).json(newChar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCharacter = async (req, res) => {
  const character = await Character.findByPk(req.params.id);
  if (!character) return res.status(404).json({ error: "Personaje no encontrado" });

  const errores = await validacionesCharacter(req.body, true, req.params.id);
  if (errores.length) return res.status(400).json({ errores });

  try {
    await character.update(req.body);
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCharacter = async (req, res) => {
  const character = await Character.findByPk(req.params.id);
  if (!character) return res.status(404).json({ error: "Personaje no encontrado" });

  try {
    await character.destroy();
    res.json({ message: "Personaje eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};