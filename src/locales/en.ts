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

export default {
  "select": "Select",
  "file": "File",
  "size": "Size",
  "updated": "Updated",
  "encrypt": "Encrypt",
  "confirm": "Confirm",

  "enter-passphrase": "Enter passphrase",
  "encrypted-text": "🔒 Encrypted text",

  "encryption": {
    "note": "Encrypt note"
  },

  "decryption": {
    "note": "Decrypt note"
  },

  "exceptions": {
    "note-not-selected": "[!] Error: No files are open for encryption or decryption.",
    "public-key-is-missing": "[!] Error: The public key is not specified.",
    "private-key-is-missing": "[!] Error: The private key is not specified.",
    "passphrase-is-missing": "[!] Error: The passphrase is not specified.",
    "incorrect-passphrase": "[!] Error: The passphrase is incorrect.",
    "note-already-encrypted": "[!] Error: The note is already encrypted.",
    "note-not-encrypted": "[!] Error: The note is not encrypted.",
    "text-not-encrypted": "[!] Error: Text not encrypted."
  },

  "settings": {
    "public-key": {
      "name": "Public PGP key",
      "description": "Load your PGP public key from a file."
    },

    "private-key": {
      "name": "Private PGP key",
      "description": "Load your PGP private key from a file."
    },

    "cache-passphrase": {
      "name": "Cache the passphrase",
      "description": "Enable or disable passphrase caching."
    },

    "passphrase-cache-duration": {
      "name": "The duration of the passphrase caching",
      "description": "Set the duration of passphrase caching in seconds. (Setting the value to 0 caches the passphrase until Obsidian restarts)"
    }
  }
}