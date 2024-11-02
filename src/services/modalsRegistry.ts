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
import { App } from 'obsidian'

import { TranslationService } from './translationService'
import { PluginState } from 'src/state/pluginState'

import { PassphraseModal } from 'src/modals/PassphraseModal'

import { ModalKey } from 'src/model/ModalKey'
import { PluginModal } from 'src/model/PluginModal'

export class ModalsRegistry {
  private modals: Map<ModalKey, PluginModal> = new Map()

  constructor(
    private app: App, 

    private state: PluginState, 
    private translationService: TranslationService
  ) {
    this.registerAll()
  }

  registerAll() {
    this.modals.set('enter-passphrase', new PassphraseModal(this.app, this.state, this.translationService))
  }

  async action(key: ModalKey, action: 'open' | 'close') {
    const modal = this.modals.get(key)

    if (action === 'open') {
      await modal?.openModal()
    } else {
      await modal?.closeModal()
    }
  }
}