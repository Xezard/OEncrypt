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

import { PluginSetting } from 'src/model/PluginSetting'

export class PassphraseCacheDurationSetting implements PluginSetting {
  public setting: Setting

  name: string
  description: string

  constructor(
    private state: PluginState, 
    private translationService: TranslationService
  ) {
    this.name = `${this.translationService.t('settings.passphrase-cache-duration.name')}?`
    this.description = this.translationService.t('settings.passphrase-cache-duration.description')
  }

  register(setting: Setting) {
    this.setting = setting.addText(text => text.setValue(this.state.passphraseCacheDuration.toString()).onChange(async (value) => {
      const duration = parseInt(value, 10)

      await this.state.set('passphraseCacheDuration', isNaN(duration) || duration < 0 ? 0 : duration)
    }))
  }
}