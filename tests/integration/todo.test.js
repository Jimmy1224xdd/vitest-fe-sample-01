import { describe, it, expect, beforeEach } from 'vitest';
import {
  crearTareaElemento,
  agregarTarea,
  eliminarTarea,
  alternarTarea,
  limpiarCompletadas,
  actualizarContador,
  mostrarError,
} from '../../src/js/dom/todo.js';

// Helper: crea una lista <ul> fresca para cada prueba
function crearLista() {
  return document.createElement('ul');
}

// ============================================================
// Pruebas de integración — manipulación del DOM
// ============================================================
describe('crearTareaElemento', () => {
  it('debe crear un elemento <li> con la clase "tarea-item"', () => {
    const li = crearTareaElemento('Test');
    expect(li.tagName).toBe('LI');
    expect(li.classList.contains('tarea-item')).toBe(true);
  });

  
});

describe('agregarTarea', () => {
  let lista;

  beforeEach(() => {
    lista = crearLista();
  });

  it('debe agregar un <li> a la lista cuando el texto es válido', () => {
    const resultado = agregarTarea('Aprender vitest', lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Aprender vitest');
  });

  it('debe formatear el texto antes de agregarlo (primera mayúscula, siguientes minúsculas)', () => {
    const resultado = agregarTarea('eSTudIAR VeRiFIcaCIon de SW', lista);
    expect(resultado.exito).toBe(true);
    const span = lista.querySelector('.tarea-texto');
    expect(span.textContent).toBe('Estudiar verificacion de sw');
  });
});

describe('eliminarTarea', () => {
  it('debe eliminar el elemento <li> del DOM', () => {
    const lista = crearLista();
    agregarTarea('Tarea a eliminar', lista);
    const li = lista.querySelector('.tarea-item');

    eliminarTarea(li);
    expect(lista.children.length).toBe(0);
  });
});

describe('alternarTarea', () => {
  it('debe agregar la clase "completada" cuando el checkbox está marcado', () => {
    const li = crearTareaElemento('Tarea test');
    const checkbox = li.querySelector('.tarea-checkbox');
    checkbox.checked = true;

    alternarTarea(li, checkbox);
    expect(li.classList.contains('completada')).toBe(true);
  });

  
});

describe('limpiarCompletadas', () => {
  it('debe eliminar solo las tareas completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea pendiente', lista);
    agregarTarea('Tarea completada', lista);

    // Marcar la segunda como completada
    const items = lista.querySelectorAll('.tarea-item');
    const checkbox = items[1].querySelector('.tarea-checkbox');
    checkbox.checked = true;
    alternarTarea(items[1], checkbox);

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(1);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Tarea pendiente');
  });

  
});

describe('actualizarContador', () => {
  it('debe mostrar "0 tareas" cuando la lista está vacía', () => {
    const lista = crearLista();
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('0 tareas');
  });

  it('debe mostrar "1 tarea" cuando hay exactamente un elemento', () => {
    const lista = crearLista();
    agregarTarea('Única tarea', lista);
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('1 tarea');
  });

  
});

describe('mostrarError', () => {
  it('debe establecer el texto del contenedor con el mensaje de error', () => {
    const contenedor = document.createElement('div');
    mostrarError('Error de prueba', contenedor);
    expect(contenedor.textContent).toBe('Error de prueba');
  });
});

// ============================================================
// Pruebas adicionales — Tarea 2
// ============================================================
describe('Pruebas adicionales — Tarea 2', () => {
  it('debe eliminar la tarea de la lista al hacer clic en el botón eliminar', () => {
    // Arrange
    const lista = crearLista();
    agregarTarea('Estudiar vitest', lista);
    const li = lista.querySelector('.tarea-item');
    const btnEliminar = li.querySelector('.btn-eliminar');

    // Act
    btnEliminar.click();

    // Assert
    expect(lista.children.length).toBe(0);
  });

  it('debe alternar la clase "completada" cuando el checkbox cambia de estado', () => {
    // Arrange
    const li = crearTareaElemento('Estudiar vitest');
    const checkbox = li.querySelector('.tarea-checkbox');

    // Act - Marcar checkbox y disparar evento change
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    // Assert
    expect(li.classList.contains('completada')).toBe(true);

    // Act - Desmarcar checkbox y disparar evento change
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    // Assert
    expect(li.classList.contains('completada')).toBe(false);
  });

  it('debe permitir agregar una tarea con exactamente 200 caracteres', () => {
    // Arrange
    const lista = crearLista();
    const textoLargo = 'A ' + 'B'.repeat(198); // 200 caracteres válidos

    // Act
    const resultado = agregarTarea(textoLargo, lista);

    // Assert
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
  });

  it('debe dejar la lista vacía al limpiar completadas si todas están completadas', () => {
    // Arrange
    const lista = crearLista();
    agregarTarea('Primera tarea', lista);
    agregarTarea('Segunda tarea', lista);

    const items = lista.querySelectorAll('.tarea-item');
    items.forEach(li => {
      const checkbox = li.querySelector('.tarea-checkbox');
      checkbox.checked = true;
      li.classList.add('completada');
    });

    // Act
    const eliminadas = limpiarCompletadas(lista);

    // Assert
    expect(eliminadas).toBe(2);
    expect(lista.children.length).toBe(0);
  });
});

// ============================================================
// Pruebas adicionales — Tarea 3 (Validación de palabras)
// ============================================================
describe('Validación de cantidad de palabras (Tarea 3)', () => {
  it('debe rechazar una tarea con una sola palabra', () => {
    // Arrange
    const lista = crearLista();
    const texto = 'Estudiar'; // 1 sola palabra

    // Act
    const resultado = agregarTarea(texto, lista);

    // Assert
    expect(resultado.exito).toBe(false);
    expect(resultado.error).toBe('La tarea debe tener al menos 2 palabras.');
    expect(lista.children.length).toBe(0);
  });

  it('debe aceptar una tarea con dos o más palabras', () => {
    // Arrange
    const lista = crearLista();
    const texto = 'Estudiar verificación'; // 2 palabras

    // Act
    const resultado = agregarTarea(texto, lista);

    // Assert
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
  });
});
