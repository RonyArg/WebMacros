import { afterEach, vi, describe, test, expect } from 'vitest';
import {
    calcularCalorias,
    calcularMacronutrientes
} from './nutritionCalculator.js';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('calcularCalorias', () => {
    test('calcula las calorías correctamente para un hombre con estilo de vida sedentario', () => {
        const resultado = calcularCalorias(
            80,
            180,
            30,
            "masculino",
            "sedentario",
            "mantenimiento"
        );
        expect(resultado.calorias).toBe(2136);
    });
    test("calcula las calorías correctamente para una mujer con estilo de vida sedentario", () => {
        const resultado = calcularCalorias(
            65,
            165,
            28,
            "femenino",
            "sedentario",
            "mantenimiento"
        );
        expect(resultado.calorias).toBe(1656);
    });
    test("aplica un 20% de déficit calórico para perder peso en hombres", () => {
        const resultado = calcularCalorias(
            80,
            180,
            30,
            "masculino",
            "sedentario",
            "perder peso"
        );
        expect(resultado.calorias).toBe(1709);
    });
    test("aplica un 20% de déficit calórico para perder peso en mujeres", () => {
        const resultado = calcularCalorias(
            65,
            165,
            28,
            "femenino",
            "sedentario",
            "perder peso"
        );
        expect(resultado.calorias).toBe(1325);
    });
    test("aplica un 15% de superávit calórico para ganar masa en hombres", () => {
        const resultado = calcularCalorias(
            80,
            180,
            30,
            "masculino",
            "muy activo",
            "ganancia de masa"
        );
        expect(resultado.calorias).toBe(3531);
    });
    test("aplica un 15% de superávit calórico para ganar masa en mujeres", () => {
        const resultado = calcularCalorias(
            65,
            165,
            28,
            "femenino",
            "activo",
            "ganancia de masa"
        );
        expect(resultado.calorias).toBe(2460);
    });
    test("ajusta al límite de seguridad para hombres", () => {
        const consoleWarn = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

        const resultado = calcularCalorias(
            40,
            150,
            70,
            "masculino",
            "sedentario",
            "perder peso"
        );
        expect(resultado.calorias).toBe(1500);
        expect(resultado.alertaMicronutrientes).toBe(true);
        expect(consoleWarn).toHaveBeenCalledOnce();
    });
    test("ajusta al límite de seguridad para mujeres", () => {
        const consoleWarn = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

        const resultado = calcularCalorias(
            40,
            150,
            70,
            "femenino",
            "sedentario",
            "perder peso"
        );
        expect(resultado.calorias).toBe(1200);
        expect(resultado.alertaMicronutrientes).toBe(true);
        expect(consoleWarn).toHaveBeenCalledOnce();
    });
});

describe("normalización y validación de entradas", () => {
    test("acepta valores numéricos recibidos como strings", () => {
        const resultado = calcularCalorias(
            "80",
            "180",
            "30",
            "masculino",
            "sedentario",
            "mantenimiento"
        );
        expect(resultado.calorias).toBe(2136);
    });
    test("ignora espacios en blanco", () => {
        const resultado = calcularCalorias(
            80,
            180,
            30,
            " masculino",
            "sedentario  ",
            "  mantenimiento  "
        );
        expect(resultado.calorias).toBe(2136);
    });
    test("ignora mayúsculas y minúsculas", () => {
        const resultado = calcularCalorias(
            80,
            180,
            30,
            "masculino",
            "SEDENTARIO",
            "MANTENIMIENTO"
        );
        expect(resultado.calorias).toBe(2136);
    });
    test("lanza error si el peso es 0", () => {
        expect(() => {
            calcularCalorias(
                0,
                180,
                30,
                "masculino",
                "sedentario",
                "mantenimiento"
            );
        }).toThrow("Por favor, introduce valores numéricos válidos mayores a 0.");
    });
    test("lanza error si la altura es 0 o negativo", () => {
        expect(() => {
            calcularCalorias(
                80,
                0,
                30,
                "masculino",
                "sedentario",
                "mantenimiento"
            );
        }).toThrow("Por favor, introduce valores numéricos válidos mayores a 0.");
    });
    test("lanza error si la edad es 0 o negativo", () => {
        expect(() => {
            calcularCalorias(
                80,
                180,
                0,
                "masculino",
                "sedentario",
                "mantenimiento"
            );
        }).toThrow("Por favor, introduce valores numéricos válidos mayores a 0.");
    });
});

describe("calcularMacronutrientes", () => {
    test("calcula los macronutrientes con el objetivo de mantenimiento", () => {
        const resultado = calcularMacronutrientes(2000, 80, "mantenimiento");
        expect(resultado).toEqual({
            calorias: 2000,
            proteinas: 160,
            grasas: 56,
            carbohidratos: 215
        });
    });
    test("calcula los macronutrientes con el objetivo de perder peso", () => {
        const resultado = calcularMacronutrientes(2000, 80, "perder peso");
        expect(resultado).toEqual({
            calorias: 2000,
            proteinas: 176,
            grasas: 56,
            carbohidratos: 199
        });
    });
    test("usa 2.2 gramos de proteína por kg al perder peso", () => {
        const resultado = calcularMacronutrientes(2000, 80, "perder peso");
        expect(resultado.proteinas).toBe(176);
    });
    test("no permite que las proteínas superen el 40% del total de calorías", () => {
        const resultado = calcularMacronutrientes(1000, 100, "perder peso");
        expect(resultado.proteinas).toBe(100);
    });
    test("mantiene un mínimo de 30 gramos de grasas", () => {
        const resultado = calcularMacronutrientes(1000, 50, "perder peso");
        expect(resultado.grasas).toBe(30);
    });
    test("lanza error si los datos son invalidos", () => {
        expect(() => {
            calcularMacronutrientes(0, 80, "mantenimiento");
        }).toThrow("Datos inválidos para calcular macronutrientes.");
    });
});