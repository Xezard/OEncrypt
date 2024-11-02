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

import { EncryptNoteCommand } from '../commands/EncryptCommand'
import { DecryptNoteCommand } from '../commands/DecryptCommand'

import { PluginCommand } from 'src/model/PluginCommand'

export class CommandsRegistry {
  constructor(
    private plugin: Plugin, 

    private translationService: TranslationService, 
    private encryptionService: EncryptionService
  ) {
    this.loadAndRegisterCommands()
  }

  async loadAndRegisterCommands() {
    const commands = [
      new DecryptNoteCommand(
        this.translationService, 
        this.encryptionService
      ),

      new EncryptNoteCommand(this.translationService, this.encryptionService)
    ]

    this.registerAll(commands)

    return commands
  }

  register(command: PluginCommand) {
    this.plugin.addCommand({
      id: this.getCommandId(command),
      name: command.name,
      callback: () => command.execute()
    })
  }

  registerAll(commands: PluginCommand[]) {
    commands.forEach(command => this.register(command))
  }

  private getCommandId(command: PluginCommand): string {
    const className = command.constructor.name
    return className.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '').replace('_COMMAND', '')
  }
}