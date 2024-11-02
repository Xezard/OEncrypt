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
import { App } from 'obsidian'

import { ObsidianLocale } from 'src/model/ObsidianLocale'

import ru from 'src/locales/ru'
import en from 'src/locales/en'

export class TranslationService {
  private translations: Record<string, any>

  private currentLocale: ObsidianLocale

  constructor(
    private app: App
  ) {
    this.currentLocale = this.getCurrentLocale()

    this.setLanguage(this.currentLocale)
    this.startLocaleWatcher()
  }

  private startLocaleWatcher() {
    this.app.workspace.on("layout-change", () => {
      const locale = this.getCurrentLocale()

      if (locale === this.currentLocale) {
        return
      }

      this.currentLocale = locale
      this.setLanguage(locale)
    })
  }

  private getCurrentLocale(): ObsidianLocale {
    return (window.localStorage.getItem('language') || 'en') as ObsidianLocale
  }

  private setLanguage(language: ObsidianLocale) {
    this.translations = language === 'en' ? en : ru
  }

  t(path: string): string {
    return this.getNestedTranslation(this.translations, path) || path
  }

  private getNestedTranslation(obj: Record<string, any>, path: string): string | undefined {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj)
  }
}