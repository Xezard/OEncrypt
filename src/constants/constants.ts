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

export const SUPPORTED_KEY_FILE_EXTENSIONS = '.asc, .pgp'
export const INCORRECT_PASSPHRASE_EXCEPTION_MESSAGE = 'Incorrect key passphrase'
export const CIPHER_REPLACE_PLACEHOLDER = '{cipher}'
export const ENCRYPTED_TEXT_PREFIX = '[oencrypt] => encrypted text: ';
export const ENCRYPTED_TEXT = `${ENCRYPTED_TEXT_PREFIX}${CIPHER_REPLACE_PLACEHOLDER}|`
export const ENCRYPTED_TEXT_REGEXP = new RegExp(`\\${ENCRYPTED_TEXT_PREFIX}(\\S+?)\\|`, 'g')
export const BASE_NOTE_EXTENSION = '.md'
export const ENCRYPTED_NOTE_EXTENSION = '.oenc.md'
export const BASE62_ALLOWED_SYMBOLS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'