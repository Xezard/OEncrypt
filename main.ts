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

import { PluginState } from 'src/state/pluginState'
import { PluginSettings } from 'src/settings/pluginSettings'
import { TranslationService } from 'src/services/translationService'
import { CommandsRegistry } from 'src/services/commandsRegistry'
import { PGPService } from 'src/services/pgpService'
import { UIService } from 'src/services/uiService'
import { EventRegistry } from 'src/services/eventRegistry'
import { EncryptionService } from 'src/services/encryptionService'
import { ModalsRegistry } from 'src/services/modalsRegistry'
import { EditorExtensionsRegistry } from 'src/services/editorExtensionsRegistry'

export default class OEncryptPlugin extends Plugin {
	private state: PluginState
	private translationService: TranslationService
	private uiService: UIService
	private settings: PluginSettings
	private pgpService: PGPService
	private modalsRegistry: ModalsRegistry
	private encryptionService: EncryptionService
	private commandsRegistry: CommandsRegistry
	private eventRegistry: EventRegistry
	private editorExtensionsRegistry: EditorExtensionsRegistry

  async onload() {
		this.state = new PluginState(this)

		await this.state.load()

		this.translationService = new TranslationService(this.app)
		this.uiService = new UIService(this.translationService)
		this.settings = new PluginSettings(
			this, 
			this.state, 
			this.translationService, 
			this.uiService
		)

		this.addSettingTab(this.settings)

		this.pgpService = new PGPService(this.state)
		this.modalsRegistry = new ModalsRegistry(this.app, this.state, this.translationService)
		this.encryptionService = new EncryptionService(
			this.app, 
			this.state,
			this.translationService, 
			this.pgpService,
			this.modalsRegistry
		)
		
		this.commandsRegistry = new CommandsRegistry(
			this, 
			this.translationService, 
			this.encryptionService
		)

    await this.commandsRegistry.loadAndRegisterCommands()

		this.eventRegistry = new EventRegistry(
			this, 
			this.translationService, 
			this.encryptionService, 
		)

		this.editorExtensionsRegistry = new EditorExtensionsRegistry(
			this, 
			this.translationService,
			this.encryptionService
		)
  }

	async onunload() {
    await this.state.save()
  }
}