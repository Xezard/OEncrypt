/*
 * This file is part of OEncrypt.
 *
 * OEncrypt is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * OEncrypt is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OEncrypt. If not, see <http://www.gnu.org/licenses/>.
 */
import { Setting } from 'obsidian'

import { PluginState } from 'src/state/pluginState'
import { TranslationService } from 'src/services/translationService'

import { PassphraseCacheDurationSetting } from './PassphraseCacheDurationSetting'

import { PluginSetting } from 'src/model/PluginSetting'

export class PassphraseCachingSetting implements PluginSetting {
  name: string
  description: string

  constructor(
    private state: PluginState, 
    private translationService: TranslationService, 
    private passphraseCacheDurationSetting: PassphraseCacheDurationSetting
  ) {
    this.name = `${this.translationService.t('settings.cache-passphrase.name')}?`
    this.description = this.translationService.t('settings.cache-passphrase.description')
  }

  register(setting: Setting) {
    setting.addToggle(toggle => toggle.setValue(this.state.cachePassphrase).onChange(async (value) => {
      await this.state.set('cachePassphrase', value)

      this.togglePassphraseCacheDurationSetting()
    }))
  }

  private togglePassphraseCacheDurationSetting() {
    if (this.state.cachePassphrase) {
      this.passphraseCacheDurationSetting.setting.settingEl.show()
    } else {
      this.passphraseCacheDurationSetting.setting.settingEl.hide()
    }
  }
}