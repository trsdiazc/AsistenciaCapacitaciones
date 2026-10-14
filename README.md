# 📱 Sistema de Toma de Asistencia para Capacitaciones (Offline-First PWA)

Un sistema corporativo de marcación de asistencia diseñado para capacitaciones en campo, entornos industriales o zonas rurales con **conectividad limitada o nula**. 

Combina la flexibilidad de una **Progressive Web App (PWA)** desarrollada con código nativo (HTML/JS) y la capacidad de almacenamiento sin costos de **Google Sheets & Google Apps Script**.

---

## 🎯 Objetivo y Problema que Resuelve

En zonas rurales o locaciones de planta donde **no hay señal celular ni Wi-Fi**, las aplicaciones tradicionales o formularios web fallan al no poder conectar con un servidor. Por otro lado, herramientas *low-code* como AppSheet resultan tediosas de configurar y rígidas en su mantenimiento.

Esta solución ofrece un flujo **infranqueable, intuitivo y 100% resiliente a fallas de red**:
* **Garantía Offline:** La interfaz abre en menos de 1 segundo sin importar la cobertura.
* **Sin Fraude:** Valida la identidad corporativa por correo y requiere un **PIN/Código temporal** generado en el momento por el formador (dictado o escrito en pizarra).
* **Validación Diferida:** El código actúa como la llave de cruce entre la asistencia del alumno y la sesión creada por el formador cuando los dispositivos recuperan señal.
* **Costo $0:** Construido sobre la infraestructura gratuita de GitHub Pages y Google Workspace.

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue un patrón de **PWA + Backend Serverless**:

```text
  [ Celular del Empleado ]
           │
           ├── (Sin Señal) ──> Service Worker (sw.js) ──> Carga Interfaz desde Caché
           │                         │
           │                         └──> Guardado Local en localStorage
           │
           └── (Con Señal) ──> Envío Masivo/Directo (POST) ──> Google Apps Script ──> Google Sheets
