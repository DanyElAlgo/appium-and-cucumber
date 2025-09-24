class timerPage {
    get timerTab() { return $('~Timer'); }
    get startButton() { return $('android=new UiSelector().className("android.widget.FrameLayout").instance(7)'); }
    get timerDisplay() { return $('id=com.android.deskclock:id/timer_time_text');}
    get addMinuteButton() { return $('id=com.android.deskclock:id/reset_add'); }
    get deleteTimerButton() { return $('id=com.android.deskclock:id/left_button'); }
    get backspaceButton() { return $('id=com.android.deskclock:id/delete'); }

    async addMinute() {
        await this.addMinuteButton.waitForDisplayed({ timeout: 5000 });
        await this.addMinuteButton.click();
    }
    async deleteTimer() {
        await this.deleteTimerButton.waitForDisplayed({ timeout: 5000 });
        await this.deleteTimerButton.click();
    }
    async openTimerTab() {
        await this.timerTab.waitForDisplayed({ timeout: 5000 });
        await this.timerTab.click();
    }
    async startTimer() {
        await this.startButton.waitForDisplayed({ timeout: 5000 });
        await this.startButton.click();
    }
    async setTimer(time){
    for (let i = 0; i < time.length; i++) {
        const digit = time[i];
        const digitElement = $(`android=new UiSelector().text("${digit}")`);
        await digitElement.waitForDisplayed({ timeout: 5000 })
        await digitElement.click();
        }
    }
    async getTimerText() {
        await this.timerDisplay.waitForDisplayed({ timeout: 5000 });
        return this.timerDisplay.getAttribute("contentDescription");
    }
}

module.exports = new timerPage();