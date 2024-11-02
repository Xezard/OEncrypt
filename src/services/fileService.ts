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

export class FileService {
  static readFileFromFileSystem(accept: string, callback: (file: File, content: string | ArrayBuffer | null | undefined) => void) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept

    input.onchange = async (event) => {
      const target = event.target as HTMLInputElement

      if (target.files && target.files.length > 0) {
        const file = target.files[0]
        const reader = new FileReader()

        reader.onload = async (e) => {
          callback(file, e.target?.result)
        }

        reader.readAsText(file)
      }
    }

    input.click()
  }
}