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
import { Plugin } from 'obsidian'
import { 
  Decoration,
  EditorView,
  ViewPlugin, 
  ViewUpdate
} from '@codemirror/view'

import { TranslationService } from './translationService'
import { EncryptionService } from './encryptionService'

import { EncryptedTextViewPlugin } from 'src/widgets/EncryptedTextViewPlugin'

export class EditorExtensionsRegistry {
  constructor(
    private plugin: Plugin, 
    private translationService: TranslationService,
    private encryptionService: EncryptionService
  ) {
    this.loadAndRegisterAll()
  }

  loadAndRegisterAll() {
    const extensions = [
      ViewPlugin.define((view: EditorView) => {
        const plugin = new EncryptedTextViewPlugin(
          view, 
          this.translationService, 
          this.encryptionService
        )
        
        return {
          decorations: () => plugin.decorations,
          update: (update: ViewUpdate) => {
            plugin.update(update)
          },
          destroy: () => plugin.destroy()
        }
      }, {
        decorations: (instance) => instance.decorations() || Decoration.none
      })
    ]

    extensions.forEach(extension => this.plugin.registerEditorExtension(extension))
  }
}