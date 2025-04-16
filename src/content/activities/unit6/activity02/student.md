# Actividad 2


## INPUTS

| Fuente                     | Tipo de dato       | Rango/Formato        | ¿Simulado? | Conexión con Storytelling |
|---------------------------|--------------------|----------------------|------------|----------------------------|
| Audio de la canción (micrófono o archivo) | Numérico (amplitud, frecuencia) | Amplitud: 0.0–1.0 / Frecuencia: Hz | No         | La energía y estructura rítmica de la canción guía la evolución visual de la narrativa. |
| Interacciones del público desde celulares (toques y sliders) | Texto, numérico | Color: "rojo"/"verde"/... <br> Tamaño: 1–10 | No         | Las decisiones del público influyen directamente en los atributos visuales de las partículas, haciéndolos partícipes activos de la escena. |
| Control remoto de "ruleta" desde un tercer dispositivo (tablet o laptop) | Numérico/booleano | Índices de grupo: 0,1 / Activado: true/false | No         | Activa o desactiva la participación de grupos en distintos momentos, generando una dinámica narrativa por turnos y control del foco participativo. |

## PROCESS

### Descripción textual del algoritmo

1. **Análisis del audio**  
   Se utiliza la librería de análisis de sonido para extraer en tiempo real:
   - Picos de amplitud → aumentan la intensidad de las partículas.
   - Frecuencia dominante → influye en el tipo de figura generada (más baja = formas naturales, más alta = formas geométricas celtas).
   - Cambios rítmicos → activan transiciones visuales suaves o bruscas.

2. **Interacción del público**  
   - Cada celular envía datos de color y tamaño seleccionados.
   - Estos datos se aplican a una fracción del sistema de partículas que el público puede controlar visualmente en tiempo real.
   - Las decisiones individuales se mezclan en un promedio colectivo o se asignan por grupos.

3. **Control de ruleta (tercer dispositivo)**  
   - Un algoritmo simple selecciona qué grupo tiene permiso para influir en la visualización.
   - Se alterna entre grupos cada cierto tiempo o según el progreso de la canción.
   - El grupo activo tiene mayor impacto en los atributos de la visualización; el grupo pasivo solo observa.

4. **Generación de partículas y visualización**  
   - El sistema genera partículas que se mueven según algoritmos de física básica (fuerzas, atracción, repulsión).
   - Los atributos de las partículas (color, tamaño, forma, agrupación) cambian con base en los inputs anteriores.

### Pseudocódigo simplificado

```pseudo
SI grupo_1_activo == true ENTONCES
    aplicar_inputs(grupo_1)
SINO
    aplicar_inputs(grupo_2)

SI amplitud_audio > umbral ENTONCES
    aumentar_intensidad_visual()

SI frecuencia_audio < 300Hz ENTONCES
    generar_formas_naturales()
SINO
    generar_formas_celtas()

actualizar_visuales(color, tamaño, ritmo)
```

### Generatividad y respuesta en tiempo real

- El sistema no repite patrones exactos: las partículas tienen un grado de aleatoriedad en su posición y comportamiento.
- Cada visualización es única por la combinación de audio e intervención del público.
- Las decisiones del tercer dispositivo (ruleta) introducen momentos impredecibles y dan ritmo a la participación grupal.

### Conexión con el storytelling

- La experiencia se construye como un viaje colectivo.
- Los visuales crecen en complejidad con la música y la energía del público.
- La ruleta crea momentos de protagonismo para distintos grupos, generando tensión, pausa y sorpresa.

---

## OUTPUTS

| Tipo          | Elementos generados                      | Propiedades dinámicas                                       |
|---------------|------------------------------------------|--------------------------------------------------------------|
| Visual        | Partículas animadas                      | Color, tamaño, trayectoria, forma, agrupación, intensidad     |
| Escena completa | Paisaje generativo evolutivo            | Cambios de fondo, estructura visual según inputs             |
| Participación | Efecto de visibilidad de grupo activo    | Aumenta visibilidad del grupo activo, baja la del pasivo     |

### Relación Input → Process → Output

- **Frecuencia del audio** → Cambia el tipo de figura generada (natural vs. celta).
- **Amplitud del audio** → Aumenta la energía del movimiento de partículas.
- **Color y tamaño desde celulares** → Se aplican directamente a una porción de partículas.
- **Grupo activo (ruleta)** → Controla qué conjunto de usuarios tiene impacto en el sistema visual.

### Cómo los outputs manifiestan el storytelling

- Las visualizaciones actúan como una expansión visual de la canción en vivo.
- Las formas y movimientos de las partículas reflejan la intensidad y carácter de la música.
- La participación del público transforma la obra en una creación colectiva.
- La ruleta crea un vaivén narrativo de control y expectativa, aportando estructura dramática.
