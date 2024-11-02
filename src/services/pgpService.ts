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
import * as openpgp from 'openpgp'

import { PluginState } from 'src/state/pluginState'

import { INCORRECT_PASSPHRASE_EXCEPTION_MESSAGE } from '../constants/constants'

export class PGPService {
  constructor(
    private state: PluginState
  ) {}

  async encrypt(content: string): Promise<string> {
    if (!this.state.publicKey) {
      throw new Error("exceptions.public-key-is-missing")
    }

    try {
      const publicKey = await openpgp.readKey({ 
        armoredKey: this.state.publicKey.content 
      })
      const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: content }),
        encryptionKeys: publicKey,
        format: 'armored'
      })

      return encrypted as string
    } catch (error) {
      throw new Error(`Failed to encrypt the content: ${error.message}`)
    }
  }

  async decrypt(content: string): Promise<string> {
    if (!this.state.privateKey) {
      throw new Error("exceptions.private-key-is-missing")
    }

    try {
      const privateKey = await openpgp.readPrivateKey({ armoredKey: this.state.privateKey.content })
      const decryptedPrivateKey = await openpgp.decryptKey({
        privateKey,
        passphrase: this.state.passphrase
      })

      const message = await openpgp.readMessage({ armoredMessage: content })
      const { data: decryptedStreamOrString } = await openpgp.decrypt({
        message,
        decryptionKeys: decryptedPrivateKey
      })

      if (decryptedStreamOrString instanceof ReadableStream) {
        return await this.streamToString(decryptedStreamOrString)
      }
      
      return decryptedStreamOrString as string
    } catch (error) {
      console.log(error)

      this.state.resetPassphrase()

      if (error.message.includes(INCORRECT_PASSPHRASE_EXCEPTION_MESSAGE)) {
        throw new Error("exceptions.incorrect-passphrase")
      }

      throw new Error(`Failed to decrypt the content: ${error.message}`)
    }
  }

  private async streamToString(stream: ReadableStream<string>): Promise<string> {
    const reader = stream.getReader()
    const chunks: string[] = []
    let result

    while (!(result = await reader.read()).done) {
      chunks.push(result.value)
    }

    return chunks.join('')
  }
}