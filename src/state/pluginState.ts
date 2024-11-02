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

import { PGPKeyFile } from 'src/model/PGPKeyFile'

export class PluginState {
  public publicKey: PGPKeyFile
  public privateKey: PGPKeyFile

  public passphrase?: string
  public cachePassphrase: boolean = false
  public passphraseCacheDuration: number = 0
  public passphraseSetTimestamp: number = 0

  constructor(
    private plugin: Plugin
  ) {}

  async save() {
    const { publicKey, privateKey, cachePassphrase, passphraseCacheDuration } = this
    const data = { publicKey, privateKey, cachePassphrase, passphraseCacheDuration }

    await this.plugin.saveData(data)
  }

  async load() {
    const data = await this.plugin.loadData()

    if (!data) {
      return
    }
  
    this.publicKey = data.publicKey
    this.privateKey = data.privateKey
    this.cachePassphrase = data.cachePassphrase || false
    this.passphraseCacheDuration = data.passphraseCacheDuration || 0
  }

  async set<Key extends keyof this>(key: Key, value: this[Key]) {
    this[key] = value
    await this.save()
  }

  getPassphrase(): string | undefined {
    const currentTime = Date.now()

    if (this.cachePassphrase && this.passphrase && (currentTime < this.passphraseSetTimestamp)) {
      return this.passphrase
    } else {
      this.resetPassphrase()
    }
  }

  resetPassphrase(): void {
    this.passphrase = undefined
    this.passphraseSetTimestamp = 0
  }
}