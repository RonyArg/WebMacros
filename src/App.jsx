import { useState } from 'react';
import Form from './components/Form';

function App() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Barra de navegación */}
      <nav className="sticky top-0 z-50 bg-emerald-600/80 backdrop-blur-sm shadow-md w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-white font-bold">Cuida Tu Nutrición</h1>
          {/* Posibles enlaces de navegación */}
        </div>
      </nav>

      <main className=" flex flex-col items-center justify-center pt-24 px-8 pb-10">

        {/* Bordes redondeados */}
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl p-8 border border-gray-100">

          <div className="text-center w-full mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Calcula tus macronutrientes</h2>
            <p className="text-gray-600">
              Descubre cuántas calorías, proteínas, carbohidratos y grasas necesitas realmente para alcanzar tus objetivos.
            </p>
          </div>
          <Form />
        </div>
      </main>
    </div>
  )
}

export default App
