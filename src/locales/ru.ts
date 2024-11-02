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
  "select": "Выбрать",
  "file": "Файл",
  "size": "Размер",
  "updated": "Обновлён",
  "encrypt": "Зашифровать",
  "confirm": "Подтвердить",

  "enter-passphrase": "Введите кодовую фразу",
  "encrypted-text": "🔒 Зашифрованный текст",

  "encryption": {
    "note": "Зашифровать заметку"
  },

  "decryption": {
    "note": "Расшифровать заметку"
  },

  "exceptions": {
    "note-not-selected": "[!] Ошибка: Ни одного файла не открыто для шифрования или дешифрования.",
    "public-key-is-missing": "[!] Ошибка: Публичный ключ не указан.",
    "private-key-is-missing": "[!] Ошибка: Приватный ключ не указан.",
    "passphrase-is-missing": "[!] Ошибка: Кодовая фраза не указана.",
    "incorrect-passphrase": "[!] Ошибка: Неверная кодовая фраза.",
    "note-already-encrypted": "[!] Ошибка: Заметка уже зашифрована.",
    "note-not-encrypted": "[!] Ошибка: Заметка не зашифрована.",
    "text-not-encrypted": "[!] Ошибка: Текст не зашифрован."
  },

  "settings": {
    "public-key": {
      "name": "Публичный PGP ключ",
      "description": "Загрузите свой открытый ключ PGP из файла."
    },

    "private-key": {
      "name": "Приватный PGP ключ",
      "description": "Загрузите свой приватный ключ PGP из файла."
    },

    "cache-passphrase": {
      "name": "Кэшировать кодовую фразу",
      "description": "Включить или отключить кэширование кодовой фразы."
    },

    "passphrase-cache-duration": {
      "name": "Длительность кэширования кодовой фразы",
      "description": "Установите продолжительность хранения кодовой фразы в секундах. (Установка значения 0 кэширует кодовую фразу до перезапуска Obsidian)"
    }
  }
}