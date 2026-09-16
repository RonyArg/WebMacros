import Form from './components/Form';
import Results from './components/Results';
import { useState } from 'react';
import { calcularCalorias, calcularMacronutrientes } from './utils/nutritionCalculator';

function App() {
  // Estado para guardar los resultados del cálculo de calorías y macronutrientes
  const [resultados, setResultados] = useState(null);

  const handleCalculate = (datosUsuario) => {
    try {
      const resultadoCalorias = calcularCalorias(
        datosUsuario.peso, datosUsuario.altura, datosUsuario.edad, datosUsuario.genero, datosUsuario.estiloVida, datosUsuario.objetivo
      );

    const resultadoMacronutrientes = calcularMacronutrientes(
      resultadoCalorias.calorias, datosUsuario.peso, datosUsuario.objetivo
    );
    setResultados({
      calorias: resultadoCalorias.calorias,
      proteinas: resultadoMacronutrientes.proteinas,
      grasas: resultadoMacronutrientes.grasas,
      carbohidratos: resultadoMacronutrientes.carbohidratos,
      alertaMicronutrientes: resultadoCalorias.alertaMicronutrientes
    });
  } catch (error) {
    alert("Hubo un error calculando los datos: " + error.message);
  }
  };

  const handleReset = () => {
    setResultados(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Barra de navegación */}
      <nav className="sticky top-0 z-50 bg-emerald-600/80 backdrop-blur-sm shadow-md w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-white font-bold">Cuida Tu Nutrición</h1>
          {/* Posibles enlaces de navegación */}
        </div>
      </nav>

      <main className=" flex flex-col items-center justify-center pt-10 px-8 pb-10">

        {/* Bordes redondeados */}
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl p-8 border border-gray-100">

          <div className="text-center w-full mb-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {resultados ? "Tus resultados nutricionales" : "Calcula tus macronutrientes"}
            </h2>
            <p className="text-gray-600">
              {resultados ? "Están basados en tus datos personales" : "Descubre cuántas calorías, proteínas, carbohidratos y grasas necesitas realmente para alcanzar tus objetivos."}
            </p>
          </div>

          {/* FORMULARIO O RESULTADOS */}
          {/* Si 'resultados' es null, se muestra el Formulario */}
          {!resultados ? (
            <Form onSubmitData={handleCalculate} />
          ) : (
            /* Si 'resultados' tiene datos, mostramos los Resultados y el botón de volver */
            <div className="flex flex-col animate-fade-in">
              <Results resultados={resultados} />
              <button onClick={handleReset} className="mt-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
              Cambiar datos
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default App
