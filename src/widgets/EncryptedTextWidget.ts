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
  EditorView, 
  WidgetType 
} from '@codemirror/view'

import { EncryptionService } from 'src/services/encryptionService'
import { TranslationService } from 'src/services/translationService'

export class EncryptedTextWidget extends WidgetType {
  constructor(
    private view: EditorView,

    private translationService: TranslationService,
    private encryptionService: EncryptionService,
    
    private encryptedText: string,

    private from: number,
    private to: number
  ) {
    super()
  }

  toDOM(): HTMLElement {
    const button = document.createElement('button')
    button.classList.add('encrypted-text-button')
    button.innerText = this.translationService.t('encrypted-text')
    
    button.onclick = async () => {
      if (this.encryptionService.isNoteEncrypted()) {
        await this.encryptionService.decryptFile()
        return
      }

      const decryptedText = await this.encryptionService.decryptText(this.encryptedText)

      if (decryptedText == undefined) {
        return
      }

      const transaction = this.view.state.update({
        changes: { 
          from: this.from, 
          to: this.to, 
          insert: decryptedText 
        }
      })
      
      this.view.dispatch(transaction)
    }

    return button
  }
}