# Semáforo inteligente — Sistemas Ciberfísicos

Este repositorio contiene una maqueta de un semáforo inteligente (HTML/CSS/JS) pensada para la tarea de Sistemas Ciberfísicos.

## Resumen de funcionamiento

El semáforo tiene dos grupos principales:
- Semáforo vehicular
- Semáforo peatonal

Hay un botón peatonal que el usuario puede pulsar para solicitar el cruce.

Principio clave: el semáforo vehicular se mantiene en verde por defecto. El botón peatonal está bloqueado hasta que el semáforo vehicular haya estado un tiempo mínimo en verde. Esto evita que el tráfico se detenga indefinidamente por pulsaciones continuas del botón peatonal.

## Estados y transiciones

Las luces y sus estados principales son:

- Vehicular
	- Verde (activo por defecto)
	- Amarillo (transición)
	- Rojo (detiene tráfico — los peatones cruzan)

- Peatonal
	- Rojo (no cruzar)
	- Verde (puede cruzar — sincronizado con el rojo vehicular)

Flujo típico cuando se solicita cruce:
1. El semáforo vehicular está en Verde.
2. Tras permanecer al menos el tiempo mínimo en Verde, el sistema habilita el botón peatonal (el botón se marca como `ON`).
3. Si el usuario pulsa el botón y el mínimo de tiempo ya pasó:
	 - El semáforo vehicular cambia a Amarillo (duración: tiempo amarillo).
	 - Después del amarillo, el vehicular pasa a Rojo y el peatonal a Verde (duración: tiempo rojo / peatón).
	 - Tras ese intervalo, se regresa a Verde vehicular y Rojo peatonal, y el ciclo re-inicia.

Si el usuario pulsa el botón antes de que el tiempo mínimo en Verde haya terminado, la solicitud se encola hasta que el mínimo se cumpla.

## Tiempos y factor de tráfico

Los tiempos principales son configurables desde el panel (menú):
- Verde — Tiempo base (ms): valor base para la duración en verde.
- Amarillo — Tiempo base (ms): duración fija para la transición.
- Rojo/Peatón — Tiempo base (ms): duración durante la cual los peatones cruzan y el tráfico está en rojo.

Existe un control `trafficFactor` que actúa como factor multiplicador sobre el tiempo de Verde. En la implementación actual:
- timeGreen = greenBase * trafficFactor
- timeYellow = yellowBase
- timeRed = redBase / trafficFactor

Esto significa:
- A mayor factor de tráfico, el verde vehicular se alarga (más flujo vehicular permitido).
- El tiempo de peatón (rojo vehicular) se reduce proporcionalmente con mayor tráfico, para priorizar el tránsito vehicular.

## Cómo probar

1. Abrir el siguiente [Link](https://semaforo-inteligente.vercel.app/) en un navegador moderno.
2. Ajustar los tiempos en el menú y probar el botón peatonal.
3. Observar la lógica: el semáforo vehicular empieza en verde y el botón se habilita sólo después del tiempo verde mínimo.
