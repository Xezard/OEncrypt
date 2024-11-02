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
    } else {
      fileInfoElement.empty()
    }
  
    const updatedDate = new Date(key.updated).toLocaleString()
  
    const fileData = [
      { label: this.translationService.t('file'), value: key.name },
      { label: this.translationService.t('size'), value: `${key.size.toString()} bytes` },
      { label: this.translationService.t('updated'), value: updatedDate }
    ]
  
    fileData.forEach(data => {
      const label = createEl('strong', { text: `${data.label}: ` })
      const valueText = document.createTextNode(data.value)
      
      fileInfoElement.appendChild(label)
      fileInfoElement.appendChild(valueText)
      fileInfoElement.appendChild(createEl('br'))
    })
  }
}