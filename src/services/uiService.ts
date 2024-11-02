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
import { Setting } from 'obsidian'

import { TranslationService } from './translationService'

import { PGPKeyFile } from 'src/model/PGPKeyFile'

export class UIService {
  constructor(
    private translationService: TranslationService
  ) {}

  updatePGPKeyFileDisplay(setting: Setting, key: PGPKeyFile): void {
    let fileInfoElement = setting.settingEl.querySelector('.file-info-display') as HTMLDivElement

    if (!fileInfoElement) {
      fileInfoElement = document.createElement('div')
      fileInfoElement.className = 'file-info-display'
      fileInfoElement.style.marginLeft = '1rem'
      setting.settingEl.appendChild(fileInfoElement)
    }

    const updatedDate = new Date(key.updated).toLocaleString()

    fileInfoElement.innerHTML = `
      <strong>${this.translationService.t('file')}:</strong> ${key.name}<br/>
      <strong>${this.translationService.t('size')}:</strong> ${key.size.toString()} bytes<br/>
      <strong>${this.translationService.t('updated')}:</strong> ${updatedDate}
    `
  }
}