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
  App, 
  Modal, 
  Setting
} from 'obsidian'

import { PluginState } from 'src/state/pluginState'
import { TranslationService } from 'src/services/translationService'

import { PluginModal } from 'src/model/PluginModal'

export class PassphraseModal extends Modal implements PluginModal {
  private input: HTMLInputElement

  private passphrase: string

  openPromise?: (value: void | PromiseLike<void>) => void
  
  constructor(
    app: App, 

    private state: PluginState, 
    private translationService: TranslationService
  ) {
    super(app)

    this.init()
  }

  openModal(): Promise<void> {
    return new Promise((resolve) => {
      this.openPromise = resolve
      this.open()
    })
  }

  closeModal(): Promise<void> {
    this.close()

    if (this.openPromise) {
      this.openPromise()
      this.openPromise = undefined
    }

    return Promise.resolve()
  }

  init() {
    this.setTitle(this.translationService.t('enter-passphrase'))
    
    const passphraseSetting = new Setting(this.contentEl).addText((text) => {
      this.input = text.inputEl
      this.input.className = 'passphrase-input'
      this.input.type = 'password'

      text.onChange((value) => {
        this.passphrase = value
      })
    })

    passphraseSetting.infoEl.hidden = true

    new Setting(this.contentEl).addButton((button) =>
      button.setButtonText(this.translationService.t('confirm'))
        .setCta()
        .onClick(async () => {
          await this.state.set('passphrase', this.passphrase)
          
          this.reset()
          
          this.state.passphraseSetTimestamp = Date.now() + (this.state.passphraseCacheDuration * 1000)
          await this.closeModal()
        }))
  }

  reset() {
    this.input.value = ''
    this.passphrase = ''
  }

  onClose(): void {
    super.onClose()

    if (this.openPromise) {
      this.openPromise()
      this.openPromise = undefined
    }
  }
}