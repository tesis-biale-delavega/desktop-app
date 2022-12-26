export const indexes = [
  {
    name: "DVI",
    value: "dvi",
    selected: false,
    info: {
      description:
        "Es el índice de Broadband Greenness más simple. \n" +
        "Mide la diferencia entre la luz infrarroja cercana (la cual es fuertemente reflectada por las plantas) y la luz roja (la cual es absorbida por la vegetación). Por lo tanto distingue entre suelo y vegetación. No tiene en cuenta los efectos causados por efectos atmosféricos o sombras.\n",
      formula: "DVI = nir - red",
    },
  },
  {
    name: "NDVI",
    value: "ndvi",
    selected: false,
    info: {
      description:
        "Este índice es la medida de una planta verde saludable. Es el índice DVI pero normalizado para obtener un resultado entre -1 y 1. Este índice es muy sensible a cambios de brillo en el suelo y fenómenos atmosféricos. \n" +
        "Este índice es más preciso en la mitad de la temporada cuando las plantaciones se encuentran en su etapa de crecimiento.\n",
      interpretation:
        "Los valores negativos están formados principalmente por nubes, agua o nieve, y los valores cercanos a cero por rocas o suelo. Valores moderados (de 0,2 a 0,3) representan arbustos y prados, mientras que valores grandes (de 0,6 a 0,8) indican bosques tropicales y templados.\n" +
        "\n" +
        "Las plantas siempre toman valores positivos entre 0,2 y 1. La vegetación densa y saludable debe tener un valor superior a 0,5. Un valor entre 0.2 y 0.5 indica una vegetación escasa.\n",
      formula: "NDVI = (nir - red) / (nir + red)",
    },
  },
  {
    name: "NDRE",
    value: "ndre",
    selected: false,
    info: {
      description:
        "Este índice combina la banda espectral infrarroja cercana con la banda Red Edge. Es utilizada para monitorear plantaciones de gran densidad y en sus etapas de madurez. Es un método para medir la cantidad de clorofila en las plantas.\n",
      interpretation:
        "Valores entre  -1 y 0.2 indican suelo o cultivos en desarrollo.\n" +
        "\n" +
        "Valores entre 0.2 y 0.6 indican plantas que no son saludables o no son suficientemente maduras.\n" +
        "\n" +
        "Valores entre 0.6 y 1 indican plantas saludables y maduras.\n",
      formula: "NDRE = (nir - reg) / (nir + reg)",
    },
  },
  {
    name: "EVI",
    value: "evi",
    selected: false,
    info: {
      description:
        "Mide el verdor de la vegetación. Ofrece una mejora al índice NDVI ya que brinda mejores resultados en áreas de mucha concentración de hojas, situación donde el índice NDVI puede saturarse. \n",
      interpretation:
        "Valores en el rango de -1 a 1.\n" +
        "\n" +
        "Valores entre 0.2 y 0.8 indican vegetación saludable.\n",
      formula: "EVI = (nir - red) / (nir + 6 * red - 7.5 * blue + 1)",
    },
  },
  {
    name: "OSAVI",
    value: "osavi",
    selected: false,
    info: {
      description:
        "Es una optimización al índice NDVI. Este indicador es útil en casos donde se cuenta con plantaciones esparcidas donde se puede observar el suelo a través del dosel de las plantas.\n" +
        "Utiliza un valor constante de 0,16 para ajustar los cambios ocasionados por la baja cobertura de las plantas e impacto del suelo en las ondas captadas.\n",
      interpretation:
        "Valores entre -1 y 0.2 indican suelo.\n" +
        "\n" +
        "Valores entre 0.2 y 0.4 indican que las plantas se encuentran en etapa de germinación.\n" +
        "\n" +
        "Valores entre 0.4 y 0.6 indican que las plantas se encuentran en etapa de desarrollo.\n",
      formula: "OSAVI = (nir - red) / (nir + red + 0.16)",
    },
  },
  {
    name: "SAVI",
    value: "savi",
    selected: false,
    info: {
      description:
        "Se trata de otra optimización al índice NDVI para contrarrestar el efecto ocasionado por la alta esparsión de los cultivos. \n" +
        "Es utilizado para el análisis de plantas jóvenes, o áreas áridas donde las plantaciones se encuentran muy esparcidas (< 15% de cobertura del área total) y suelo expuesto.\n",
      interpretation:
        "El índice toma valores entre -1 y 1, cuanto menor sea el valor, menor densidad de hojas tienen las plantaciones.\n",
      formula: "SAVI = (1.5 * (nir - red)) / (nir + red + 0.5)",
    },
  },
  {
    name: "VARI",
    value: "vari",
    selected: false,
    info: {
      description:
        "Se utiliza para estimar la fracción de vegetación en una escena. Se enfoca en la vegetación presente en la parte visible del espectro y mitiga diferencias de iluminación y fenómenos atmosféricos.\n",
      formula: "VARI = (gre - red) / (gre + red - blue)",
    },
  },
  {
    name: "ARVI",
    value: "arvi",
    selected: false,
    info: {
      description:
        "Es utilizado porque es relativamente insensible a fenómenos atmosféricos(lluvia, niebla, humo, polución). Aprovecha el canal Azul para contrarrestar estos fenómenos.\n",
      interpretation:
        "El índice toma valores entre -1 y 1, la vegetación verde generalmente toma valores entre 0,2 y 0,8.\n",
      formula: "ARVI = (nir - 2 * red + blue) / (nir + 2 * red + blue)",
    },
  },
  {
    name: "NDWI",
    value: "ndwi",
    selected: false,
    info: {
      description:
        "Este índice es utilizado para detectar cuerpos de agua en las plantaciones, permitiendo distinguirlos del suelo y la vegetación. Es útil para distinguir áreas inundadas o zonas irrigadas.\n",
      interpretation:
        "Valores entre 0,2 y 1 indican una superficie de agua.\n" +
        "\n" +
        "Valores entre 0.0 y 0,2 indican una zona inundada o húmeda.\n" +
        "\n" +
        "Valores entre -0,3 y 0.0 indican una sequía moderada / superficies no acuosas.\n" +
        "\n" +
        "Valores entre -1 y -0.3 indican sequía / superficies no acuosas.\n",
      formula: "NDWI = (gre - nir) / (gre + nir)",
    },
  },
  {
    name: "SIPI",
    value: "sipi",
    selected: false,
    info: {
      description:
        "Este índice estima la relación entre los carotenoides y la clorofila. Valores altos en el índice (alto contenido de carotenoides y bajo de clorofila) pueden indicar que la planta se encuentra estresada pudiendo resultar en enfermedades.\n",
      interpretation:
        "El rango del índice SIPI toma valores desde 0 hasta 2, donde la vegetación verde saludable generalmente se encuentra entre 0.8 y 1.8.\n",
      formula: "SIPI = (nir - blue) / (nir - red)",
    },
  },
  {
    name: "ARI1",
    value: "ari1",
    selected: false,
    info: {
      description:
        "Las plantas débiles contienen mayores concentraciones de antocianinas, por lo que este índice es utilizado para medir el nivel de estrés de las plantas.",
      interpretation:
        "Los valores de este índice van desde 0 hasta un poco más que 0.2. El rango más común para vegetación verde se encuentra entre 0.001 y 0.1.",
      formula: "ARI1 = (1 / gre) - (1 / reg)",
    },
  },
];
