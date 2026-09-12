import {useState} from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Barra de navegación */}
      <nav className="fixed top-0 bg-green-400 shadow-md w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-white font-bold">Cuida Tu Nutrición</h1>
          
          
          </div>

          
      </nav>

      <main className=" flex flex-col items-center justify-center pt-24 px-4 pb-10">

        {/* Bordes redondeados */}
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl p-8 border border-gray-100">

        <div className="text-center max-w-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Calcula tus macronutrientes</h2>
          <p className="text-gray-600">
            Descubre cuántas calorías, proteínas, carbohidratos y grasas necesitas realmente para alcanzar tus objetivos.
          </p>
        </div>
      </div>
      </main>
    </div>
  )
}

export default App
