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
  DecorationSet, 
  EditorView, 
  ViewUpdate 
} from '@codemirror/view'

import { TranslationService } from 'src/services/translationService'
import { EncryptionService } from 'src/services/encryptionService'

import { EncryptedTextDecorator } from './EncryptedTextDecorator'

export class EncryptedTextViewPlugin {
  private decorator: EncryptedTextDecorator

  decorations: DecorationSet

  constructor(
    view: EditorView, 
    translationService: TranslationService, 
    encryptionService: EncryptionService
  ) {
    this.decorator = new EncryptedTextDecorator(translationService, encryptionService)

    this.decorations = this.decorator.buildDecorations(view)
  }

  update(update: ViewUpdate) {
    if (!update.docChanged && !update.viewportChanged) {
      return
    }

    this.decorations = this.decorator.buildDecorations(update.view)
  }

  destroy() {}
}