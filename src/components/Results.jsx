function Results ({resultados}) {

    if (!resultados) return null;

    return (
        <div className=" p-6 bg-white">
                  

            <div className="grid grid-cols-2 gap-4 text-center">
                {/* CALORÍAS (Destacado) */}
                <div className="col-span-2 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <p className="text-sm font-semibold text-emerald-800 uppercase tracking-wide">Calorías Diarias</p>
                    <p className="text-4xl font-black text-emerald-600">
                        {resultados.calorias} <span className="text-lg font-normal text-emerald-700">kcal</span>
                    </p>
                </div>

                {/* PROTEÍNAS */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Proteínas</p>
                    <p className="text-2xl font-bold text-blue-600">{resultados.proteinas}g</p>
                </div>

                {/* GRASAS */}
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                    <p className="text-sm font-semibold text-yellow-800 uppercase tracking-wide">Grasas</p>
                    <p className="text-2xl font-bold text-yellow-600">{resultados.grasas}g</p>
                </div>

                {/* CARBOHIDRATOS */}
                <div className="col-span-2 md:col-span-1 bg-purple-50 p-4 rounded-xl border border-purple-100 md:col-start-1 md:col-end-3 md:w-1/2 md:mx-auto">
                    <p className="text-sm font-semibold text-purple-800 uppercase tracking-wide">Carbohidratos</p>
                    <p className="text-2xl font-bold text-purple-600">{resultados.carbohidratos}g</p>
                </div>
            </div>

            {/* ALERTA en caso de llegar al límite de calorias o macronutrientes */}
            {resultados.alertaMicronutrientes && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 flex gap-3 items-start">
                    <p>
                        <strong className="font-bold">Aviso de seguridad médica:</strong> 
                        {" "}El cálculo se ha ajustado al límite calórico de seguridad para evitar problemas de salud. 
                        Para perder peso de forma saludable, te recomendamos aumentar tu actividad física diaria.
                    </p>
                </div>
            )}
        </div>
    );
}


export default Results;