import { useState } from 'react';

function App() {
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: '',
        edad: '',
        peso: '',
        altura: '',
        genero: '',
        estiloVida: '',
        objetivo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosUsuario((prevDatos) => ({
            ...prevDatos,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={datosUsuario.nombre}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Edad (años)</label>
                    <input
                        type="number"
                        name="edad"
                        min="1"
                        max="120"
                        value={datosUsuario.edad}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Peso (kg)</label>
                    <input
                        type="number"
                        name="peso"
                        min="1"
                        step="0.01"
                        value={datosUsuario.peso}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Altura (cm)</label>
                    <input
                        type="number"
                        name="altura"
                        min="1"
                        step="0.01"
                        value={datosUsuario.altura}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Género</label>
                    <select name="genero" value={datosUsuario.genero} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                        <option value="" disabled>Selecciona tu género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Estilo de vida</label>
                    <select name="estiloVida" value={datosUsuario.estiloVida} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                        <option value="" disabled>Selecciona tu estilo de vida</option>
                        <option value="Sedentario">Sedentario</option>
                        <option value="Activo">Activo</option>
                        <option value="Muy activo">Muy activo</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Objetivo</label>
                    <select name="objetivo" value={datosUsuario.objetivo} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                        <option value="" disabled>Selecciona tu objetivo</option>
                        <option value="Perder peso">Perder peso</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                        <option value="Ganancia muscular">Ganancia muscular</option>
                    </select>
                </div>

            </div>
            <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-600/20 w-full mt-4 py-3  text-white font-bold py-2 px-4 rounded-xl transition-colors transition-duration-200">
                Calcular Macronutrientes
            </button>

        </form>
    )
}
export default App