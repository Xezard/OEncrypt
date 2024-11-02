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
  Notice 
} from 'obsidian'
import * as pako from 'pako'
import createBaseX from 'base-x'

import { PluginState } from 'src/state/pluginState'
import { TranslationService } from './translationService'
import { PGPService } from './pgpService'
import { ModalsRegistry } from './modalsRegistry'

import { 
  BASE62_ALLOWED_SYMBOLS,
  BASE_NOTE_EXTENSION,
  CIPHER_REPLACE_PLACEHOLDER, 
  ENCRYPTED_NOTE_EXTENSION, 
  ENCRYPTED_TEXT, 
  ENCRYPTED_TEXT_PREFIX 
} from '../constants/constants'

export class EncryptionService {
  private base62 = createBaseX(BASE62_ALLOWED_SYMBOLS)

  constructor(
    private app: App,
    private state: PluginState,
    private translationService: TranslationService,
    private pgpService: PGPService,
    private modalsRegistry: ModalsRegistry
  ) {}

  async encryptText(text?: string): Promise<string | undefined> {
    if (!this.validateText(text)) {
      return
    }

    const encryptedText = await this.processContent(text!, 'encrypt')
    return encryptedText ? this.encodeText(encryptedText) : undefined
  }

  async decryptText(text?: string): Promise<string | undefined> {
    if (!this.validateText(text) || !this.isEncrypted(text!)) {
      new Notice(this.translationService.t('exceptions.text-not-encrypted'))
      return
    }

    await this.ensurePassphrase()

    const content = this.extractEncryptedContent(text!)
    const decompressed = pako.inflate(this.base62.decode(content), { to: 'string' })
    return this.processContent(decompressed, 'decrypt')
  }

  async encryptFile() {
    const content = await this.getActiveFileContent()

    if (!content || this.isEncrypted(content)) {
      new Notice(this.translationService.t('exceptions.note-already-encrypted'))
      return
    }

    const encrypted = await this.encryptText(content)

    if (!encrypted) {
      return
    }

    await this.replaceFile(encrypted, ENCRYPTED_NOTE_EXTENSION)
  }

  async decryptFile() {
    const content = await this.getActiveFileContent()

    if (!content || !this.isEncrypted(content)) {
      new Notice(this.translationService.t('exceptions.note-not-encrypted'))
      return
    }

    const decrypted = await this.decryptText(content)

    if (!decrypted) {
      return
    }

    await this.replaceFile(decrypted, BASE_NOTE_EXTENSION)
  }

  isEncrypted(text: string): boolean {
    return text.startsWith(ENCRYPTED_TEXT_PREFIX)
  }

  isNoteEncrypted(): boolean {
    const activeFile = this.getActiveFile()
    return !!activeFile && activeFile.name.endsWith(ENCRYPTED_NOTE_EXTENSION)
  }

  private async ensurePassphrase() {
    let passphrase = this.state.getPassphrase()

    if (!passphrase) {
      await this.modalsRegistry.action('enter-passphrase', 'open')
    }

    passphrase = this.state.getPassphrase()

    if (!passphrase) {
      new Notice(this.translationService.t('exceptions.passphrase-is-missing'))
      return Promise.reject()
    }
  }

  private validateText(text?: string): boolean {
    return !!text?.trim()
  }

  private async getActiveFileContent(): Promise<string | undefined> {
    const activeFile = this.getActiveFile()
    return activeFile ? this.app.vault.cachedRead(activeFile) : undefined
  }

  private getActiveFile() {
    const activeFile = this.app.workspace.getActiveFile()

    if (!activeFile) {
      new Notice(this.translationService.t('exceptions.note-not-selected'))
    }

    return activeFile
  }

  private encodeText(encryptedText: string): string {
    const compressed = pako.deflate(encryptedText)
    const encoded = this.base62.encode(compressed)
    return ENCRYPTED_TEXT.replace(CIPHER_REPLACE_PLACEHOLDER, encoded)
  }

  private extractEncryptedContent(text: string): string {
    return text.slice(ENCRYPTED_TEXT_PREFIX.length).split('|')[0]
  }

  private async replaceFile(content: string, extension: string) {
    const activeFile = this.getActiveFile()

    if (!activeFile) {
      return
    }

    const filePath = activeFile.path
    const baseFilePath = filePath.endsWith(ENCRYPTED_NOTE_EXTENSION)
      ? filePath.slice(0, -ENCRYPTED_NOTE_EXTENSION.length)
      : filePath.slice(0, filePath.lastIndexOf('.'))
    const newFilePath = `${baseFilePath}${extension}`

    await this.app.vault.create(newFilePath, content)
    await this.app.fileManager.trashFile(activeFile)
    await this.app.workspace.openLinkText(newFilePath, '', false)
  }

  private async processContent(content: string, action: 'encrypt' | 'decrypt'): Promise<string | undefined> {
    try {
      return action === 'encrypt'
        ? await this.pgpService.encrypt(content)
        : await this.pgpService.decrypt(content)
    } catch (error) {
      new Notice(this.translationService.t(error.message))
    }
  }
}