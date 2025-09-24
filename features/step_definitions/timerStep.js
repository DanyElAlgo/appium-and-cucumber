import { Given, When, Then } from '@wdio/cucumber-framework'
import timerPage from '../../pageObjects/timerPage';
import { time } from 'console';
const assert = require('assert');

Given('Estoy en la pestaña de temporizador', async () => {
    await timerPage.openTimerTab();
});

Given('No hay temporizadores en ejecución', async () => {
    if(await timerPage.backspaceButton.isDisplayed()){
        // Guard Clause
        return;
    }
    await timerPage.deleteTimer();
});

When('Inicio un temporizador de {string} de tiempo', async (segundos) => {
    await timerPage.setTimer(segundos);
    await timerPage.startTimer();
});

Then('El temporizador debería estar corriendo', async () => {
    const isDisplayed = await timerPage.startButton.isDisplayed();
    expect(isDisplayed).toBe(true);
});

When('Inicio un temporizador de {string} minutos y {string} segundos', async (minutos, segundos) => {
    await timerPage.setTimer(minutos);
    await timerPage.setTimer(segundos);
    await timerPage.startTimer();
});

Then('El temporizador de {string}:{string} debería estar visible', async (minutos, segundos) => {
    const isDisplayed = await timerPage.timerDisplay.isDisplayed();
    expect(isDisplayed).toBe(true);
    const timerText = await timerPage.getTimerText();
    assert.strictEqual(timerText, `${minutos} minutes ${segundos} seconds`);
});

When('Hago click en el botón de añadir un minuto', async () => {
    await timerPage.addMinute();
});

When('Elimino el temporizador', async () => {
    await timerPage.deleteTimer();
});

Then('El temporizador ya no debería existir', async () => {
    await driver.pause(2000);
    const isDisplayed = await timerPage.backspaceButton.isDisplayed();
    expect(isDisplayed).toBe(true);
});