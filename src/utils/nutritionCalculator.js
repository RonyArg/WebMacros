/**
 * Calcula las calorías necesarias según el peso, altura, edad y objetivos.
 * formula: Miffflin-St Jeor
 */ 
export const calcularCalorias = (pesoInput, alturaInput, edadInput, genero, estilo, objetivo) => {
    
    const peso = Number(pesoInput);
    const altura = Number(alturaInput);
    const edad = Number(edadInput);

    // Validación de entradas 
    if (
        peso <= 0 || altura <= 0 || edad <= 0 || 
        isNaN(peso) || isNaN(altura) || isNaN(edad)
    ) {
        throw new Error("Por favor, introduce valores numéricos válidos mayores a 0.");
    }

    // Fórmula TMB - Miffflin-St Jeor 
    let tmb = (10 * peso) + (6.25 * altura) - (5 * edad);
    
    const esHombre = genero.trim().toLowerCase() === "masculino";
    if (esHombre) {
        tmb += 5;
    } else {
        tmb -= 161;
    }

    // Factor de actividad estandarizado (3 niveles)
    let factorActividad = 1.2; // Sedentario por defecto
    const estiloNormalizado = estilo.trim().toLowerCase();
    
    switch (estiloNormalizado) {
        case "sedentario":
            factorActividad = 1.2;
            break;
        case "activo":
            factorActividad = 1.55;
            break;
        case "muy activo":
            factorActividad = 1.725;
            break;
    }

    const mantenimiento = tmb * factorActividad;
    let caloriasFinales = mantenimiento;

    // Ajuste de calorías 
    const objNormalizado = objetivo.trim().toLowerCase();
    if (objNormalizado.includes("perder")) {
        caloriasFinales = mantenimiento * 0.80; // Déficit del 20%
    } else if (objNormalizado.includes("ganancia")) {
        caloriasFinales = mantenimiento * 1.15; // Superávit del 15%
    } 

    // Límite de seguridad y Advertencia
    const limiteSeguro = esHombre ? 1500 : 1200;
    let alertaMicronutrientes = false; // Alerta para déficit de micronutrientes
    
    if (caloriasFinales <= limiteSeguro) {
        caloriasFinales = limiteSeguro;
        alertaMicronutrientes = true; 
        
        console.warn(
            `Riesgo de déficit de micronutrientes. ` +
            `Cálculo ajustado al límite de seguridad (${limiteSeguro} calorías). ` +
            `Se recomienda aumentar la actividad física.`
        );
    }

    return {
        calorias: Math.round(caloriasFinales),
        alertaMicronutrientes
    };
}

/**
 * Calcula los macronutrientes necesarios según las calorías totales, peso y objetivos
 * Se establecen límites para asegurar una dieta equilibrada y evitar déficits en proteínas y grasas esenciales.
 * */
export const calcularMacronutrientes = (caloriasTotales, pesoInput, objetivo) => {
    const peso = Number(pesoInput);
    
    if (peso <= 0 || isNaN(peso) || caloriasTotales <= 0) {
        throw new Error("Datos inválidos para calcular macronutrientes.");
    }

    const objNormalizado = objetivo.trim().toLowerCase();

    // CÁLCULO DE PROTEÍNAS. 2.2g/kg para proteger músculo en déficit. 2.0g/kg para volumen/mantenimiento.
    const multiplicadorProteina = objNormalizado.includes("perder") ? 2.2 : 2.0;
    let proteinasGramos = peso * multiplicadorProteina;
    let proteinasKcal = proteinasGramos * 4;

    // La proteína nunca debe superar el 40% de las calorías totales para no saturar la dieta y permitir la entrada de otros nutrientes.
    const maxProteinasKcal = caloriasTotales * 0.40;
    if (proteinasKcal > maxProteinasKcal) {
        proteinasKcal = maxProteinasKcal;
        proteinasGramos = proteinasKcal / 4;
    }

    // CÁLCULO DE GRASAS (25% del total calórico)
    let grasasKcal = caloriasTotales * 0.25;
    let grasasGramos = grasasKcal / 9;

    // La grasa nunca debe bajar de 30g de grasa diarios.
    if (grasasGramos < 30) {
        grasasGramos = 30;
        grasasKcal = grasasGramos * 9;
    }

    // CÁLCULO DE CARBOHIDRATOS (El resto de energía disponible)
    let carbohidratosKcal = caloriasTotales - (proteinasKcal + grasasKcal);
    
    // Evita negativos en casos de manipulaciones de datos
    if (carbohidratosKcal < 0) {
        carbohidratosKcal = 0;
    }
    const carbohidratosGramos = carbohidratosKcal / 4;

    return {
        calorias: Math.round(caloriasTotales),
        proteinas: Math.round(proteinasGramos),
        grasas: Math.round(grasasGramos),
        carbohidratos: Math.round(carbohidratosGramos)
    };
};