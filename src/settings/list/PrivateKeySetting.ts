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
import { FileService } from 'src/services/fileService'
import { UIService } from 'src/services/uiService'

import { PluginSetting } from 'src/model/PluginSetting'
import { PGPKeyFile } from 'src/model/PGPKeyFile'

import { SUPPORTED_KEY_FILE_EXTENSIONS } from 'src/constants/constants'

export class PrivateKeySetting implements PluginSetting {
  name: string
  description: string

  constructor(
    private state: PluginState, 
    private translationService: TranslationService, 
    private uiService: UIService
  ) {
    this.name = this.translationService.t('settings.private-key.name')
    this.description = this.translationService.t('settings.private-key.description')
  }

  register(setting: Setting) {
    setting.addButton((button) => {
      button.setButtonText(this.translationService.t('select')).onClick(() => {
        FileService.readFileFromFileSystem(SUPPORTED_KEY_FILE_EXTENSIONS, async (file, content) => {
          const key = {
            name: file.name,
            content: content as string,
            size: file.size,
            updated: file.lastModified
          } as PGPKeyFile

          await this.state.set('privateKey', key)

          this.uiService.updatePGPKeyFileDisplay(setting, this.state.privateKey)
        })
      })

      if (this.state.privateKey) {
        this.uiService.updatePGPKeyFileDisplay(setting, this.state.privateKey)
      }
    })
  }
}