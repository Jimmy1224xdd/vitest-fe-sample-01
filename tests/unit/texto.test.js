import { describe, it, expect } from 'vitest';
import { validarTexto, formatearTexto, contarPalabras } from '../../src/js/utils/texto.js';

// ============================================================
// Pruebas unitarias para validarTexto
// ============================================================
describe('validarTexto', () => {
  // --- Casos válidos ---
  it('debe retornar válido para un texto con 3 o más caracteres', () => {
    const resultado = validarTexto('Comprar pan');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar válido para un texto con exactamente 3 caracteres', () => {
    const resultado = validarTexto('ABC');
    expect(resultado.valido).toBe(true);
  });

  it('debe retornar válido para un texto con 200 caracteres (límite)', () => {
    const texto = 'A'.repeat(200);
    const resultado = validarTexto(texto);
    expect(resultado.valido).toBe(true);
  });

  //validar los casos invalidos --
  it('debe retornar inválido cuando el texto está vacio',()=>{
    const resultado = validarTexto('');//Arrange - Act
    expect(resultado.valido).toBe(false);//Assert
    expect(resultado.error).toContain('vacío');
  });

  it('debe retornar inválido cuando el texto es < 3 car.',()=>{
    const resultado = validarTexto('Hi');
    expect (resultado.valido).toBe(false);
    expect (resultado.error).toContain('menos 3');
  });

});

// ============================================================
// Pruebas unitarias para formatearTexto
// ============================================================
describe('formatearTexto', () => {
  it('debe convertir la primera letra a mayúscula y el resto a minúscula', () => {
    const resultado = formatearTexto('hOLA MUNDO');
    expect(resultado).toBe('Hola mundo');
  });

  it('debe retornar un string vacío si se ingresa un string vacío', () => {
    const resultado = formatearTexto('');
    expect(resultado).toBe('');
  });

  it('debe retornar un string vacío si solo hay espacios', () => {
    const resultado = formatearTexto('   ');
    expect(resultado).toBe('');
  });
});

// ============================================================
// Pruebas adicionales — Tarea 1
// ============================================================
describe('Pruebas adicionales — Tarea 1', () => {
  // 1. validarTexto: texto con caracteres especiales (emojis, tildes, eñes)
  it('debe retornar válido para un texto con caracteres especiales (emojis, tildes, eñes)', () => {
    const resultado = validarTexto('Mañana iré a jugar ⚽');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  // 2. validarTexto: texto con espacios iniciales seguido de texto válido (ej. "   ABC")
  it('debe retornar válido para un texto con espacios iniciales y al menos 3 caracteres reales', () => {
    const resultado = validarTexto('   ABC');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  // 3. formatearTexto: texto con caracteres especiales como "árbol" (debe resultar en "Árbol")
  it('debe formatear texto con caracteres especiales capitalizando el primero', () => {
    const resultado = formatearTexto('árbol');
    expect(resultado).toBe('Árbol');
  });

  // 4. formatearTexto: texto que ya está correctamente formateado (no debe alterarse)
  it('debe retornar el mismo texto si ya está correctamente formateado', () => {
    const resultado = formatearTexto('Estudiar software');
    expect(resultado).toBe('Estudiar software');
  });
});

// ============================================================
// Pruebas unitarias para contarPalabras — Tarea 3
// ============================================================
describe('contarPalabras', () => {
  it('debe retornar 0 si el string está vacío', () => {
    const resultado = contarPalabras('');
    expect(resultado).toBe(0);
  });

  it('debe retornar 0 si el string solo tiene espacios', () => {
    const resultado = contarPalabras('     ');
    expect(resultado).toBe(0);
  });

  it('debe retornar 1 para una sola palabra', () => {
    const resultado = contarPalabras('Hola');
    expect(resultado).toBe(1);
  });

  it('debe contar correctamente múltiples palabras', () => {
    const resultado = contarPalabras('Hola mundo desde vitest');
    expect(resultado).toBe(4);
  });

  it('debe contar correctamente palabras separadas por múltiples espacios intermedios o saltos de línea', () => {
    const resultado = contarPalabras('  Estudiar  verificación    de   software\nsegunda línea ');
    expect(resultado).toBe(6);
  });

  it('debe lanzar un Error si el argumento no es un string', () => {
    expect(() => contarPalabras(12345)).toThrowError('El argumento debe ser un texto (string).');
    expect(() => contarPalabras(null)).toThrowError('El argumento debe ser un texto (string).');
    expect(() => contarPalabras(undefined)).toThrowError('El argumento debe ser un texto (string).');
  });
});
