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

import { TranslationService } from './translationService'
import { EncryptionService } from './encryptionService'

import { EncryptNotePluginEvent } from '../events/EncryptNotePluginEvent'
import { EncryptTextPluginEvent } from '../events/EncryptTextPluginEvent'
import { DecryptNotePluginEvent } from '../events/DecryptNotePluginEvent'

import { PluginEvent } from '../model/PluginEvent'

export class EventRegistry {
  constructor(
    private plugin: Plugin, 

    private translationService: TranslationService, 
    private encryptionService: EncryptionService,
  ) {
    this.registerEvents()
  }

  async registerEvents() {
    const events = [
      new DecryptNotePluginEvent(this.translationService, this.encryptionService),
      new EncryptNotePluginEvent(this.translationService, this.encryptionService),
      new EncryptTextPluginEvent(this.translationService, this.encryptionService)
    ]

    this.registerAll(events)

    return events
  }

  register(event: PluginEvent) {
    this.plugin.registerEvent(event.register(this.plugin))
  }

  registerAll(events: PluginEvent[]) {
    events.forEach(event => this.register(event))
  }
}