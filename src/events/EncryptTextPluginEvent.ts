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
  EventRef, 
  Plugin 
} from 'obsidian'

import { EncryptionService } from 'src/services/encryptionService'
import { TranslationService } from 'src/services/translationService'

import { PluginEvent } from '../model/PluginEvent'

export class EncryptTextPluginEvent implements PluginEvent {
  title: string
  icon = 'lock'

  constructor(
    translationService: TranslationService, 
    private encryptionService: EncryptionService,
  ) {
    this.title = translationService.t('encrypt')
  }

  register(plugin: Plugin): EventRef {
    return plugin.app.workspace.on('editor-menu', (menu, editor) => {
      const text = editor.getSelection()

      if (!text || this.encryptionService.isEncrypted(text)) {
        return
      }

      menu.addItem((item) => {
        item.setTitle(this.title)
         .setIcon(this.icon)
         .onClick(async () => {
          const result = await this.encryptionService.encryptText(text)

          if (!result) {
            return
          }

          editor.replaceSelection(result)
        })
      })
    })
  }
}