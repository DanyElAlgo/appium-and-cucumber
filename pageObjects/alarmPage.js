class AlarmPage {

  get alarmTab() { return $('~Alarm'); }
  get addButton() { return $('~Add alarm'); }
  get okBtn() { return $('id=android:id/button1'); }
  get cancelBtn() { return $('id=android:id/button2'); }
  get deleteBtn() { return $('id=com.android.deskclock:id/delete'); }

  hourElement(hour) {
    return $(`android=new UiSelector().description("${hour}")`);
  }

  minuteElement(minute) {
    return $(`android=new UiSelector().description("${minute}")`);
  }

  alarmWithTime(time) {
    return $(`android=new UiSelector().textContains("${time}")`);
  }

 expandAlarm(time) {
    return $(`android=new UiSelector().description("Expand ${time} alarm")`);
    }

  async openAlarmTab() {
    await this.alarmTab.waitForDisplayed({ timeout: 5000 });
    await this.alarmTab.click();
  }

  async createAlarm(hour, minute) {
    await this.addButton.waitForDisplayed({ timeout: 5000 });
    await this.addButton.click();

    await this.hourElement(hour).click();
    await this.minuteElement(minute).click();

    await this.okBtn.click();
  }

  async isAlarmDisplayed(time) {
    const alarm = this.alarmWithTime(time);
    await alarm.waitForDisplayed({ timeout: 5000 });
    return alarm.isDisplayed();
  }

  async cancelAlarm(hour, minute) {
    await this.addButton.waitForDisplayed({ timeout: 5000 });
    await this.addButton.click();

    await this.hourElement(hour).click();
    await this.minuteElement(minute).click();

    await this.cancelBtn.click();
  }

  async deleteAlarm(time) {
    const alarm = await this.alarmWithTime(time);
    await expect(alarm).toBeDisplayed();

    // Expandir la alarma antes de borrar (si aplica)
    const expand = await this.expandAlarm(time);
    if (await expand.isDisplayed()) {
        await expand.click();
        await driver.pause(5000);
    }

    const delBtn = await this.deleteBtn();
    await driver.pause(5000);
    await delBtn.waitForDisplayed({ timeout: 5000 });
    await delBtn.click();
  }

}

module.exports = new AlarmPage();
