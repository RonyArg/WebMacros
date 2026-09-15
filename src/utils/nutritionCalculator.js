export const calcularCalorias = (pesoInput, alturaInput, edadInput, genero, estilo, objetivo) => {
    
    // Se convierten las entradas a números y se validan
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