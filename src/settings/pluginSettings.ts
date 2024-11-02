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
import { 
  Plugin,
  PluginSettingTab, 
  Setting 
} from 'obsidian'

import { PluginState } from 'src/state/pluginState'
import { TranslationService } from 'src/services/translationService'
import { UIService } from 'src/services/uiService'

import { PublicKeySetting } from './list/PublicKeySetting'
import { PrivateKeySetting } from './list/PrivateKeySetting'
import { PassphraseCachingSetting } from './list/PassphraseCachingSetting'
import { PassphraseCacheDurationSetting } from './list/PassphraseCacheDurationSetting'

import { PluginSetting } from 'src/model/PluginSetting'

export class PluginSettings extends PluginSettingTab {
  private settings: PluginSetting[] = []

  constructor(
    plugin: Plugin, 
    private state: PluginState,
    private translationService: TranslationService,
    private uiService: UIService
  ) {
    super(plugin.app, plugin)

    this.registerSettings()
  }

  registerSettings() {
    const cacheDurationSetting = new PassphraseCacheDurationSetting(
      this.state, 
      this.translationService
    )
    const passphraseCachingSetting = new PassphraseCachingSetting(
      this.state, 
      this.translationService, 
      cacheDurationSetting
    )
    
    this.settings.push(cacheDurationSetting)
    this.settings.push(passphraseCachingSetting)
    this.settings.push(new PrivateKeySetting(this.state, this.translationService, this.uiService))
    this.settings.push(new PublicKeySetting(this.state, this.translationService, this.uiService))
  }

  display() {
    const { containerEl } = this

    containerEl.empty()

    this.settings.forEach(setting => {
      const obsidianSetting = new Setting(containerEl)
        .setName(setting.name)
        .setDesc(setting.description)

      setting.register(obsidianSetting)
    })
  }
}