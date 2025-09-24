Feature: Gestión de temporizadores
Background:
    Given Estoy en la pestaña de temporizador
    And No hay temporizadores en ejecución

  @addTimerHappyPath
  Scenario: Crear un nuevo temporizador
    When Inicio un temporizador de "1234" de tiempo
    Then El temporizador debería estar corriendo

  @checkTimer
  Scenario: Verificar el temporizador en ejecución
    When Inicio un temporizador de "05" minutos y "45" segundos
    Then El temporizador de "5":"44" debería estar visible

  @addExtraTime
  Scenario: Añadir un minuto adicional al temporizador en ejecución
    When Inicio un temporizador de "01" minutos y "35" segundos
    And Hago click en el botón de añadir un minuto
    Then El temporizador de "2":"33" debería estar visible

  @deleteTimer
  Scenario: Eliminar un temporizador existente
    When Inicio un temporizador de "01" minutos y "33" segundos
    And Elimino el temporizador
    Then El temporizador ya no debería existir


# Por algún motivo, el temporizador no logra introducir el número "0" en las pruebas,
# No importa el debug realizado ni los ids utilizados, no funciona con "0"...