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
import { RangeSetBuilder } from '@codemirror/state'
import { 
  Decoration, 
  DecorationSet, 
  EditorView
} from '@codemirror/view'

import { TranslationService } from 'src/services/translationService'
import { EncryptionService } from 'src/services/encryptionService'

import { EncryptedTextWidget } from 'src/widgets/EncryptedTextWidget'

import { ENCRYPTED_TEXT_REGEXP } from '../constants/constants'

export class EncryptedTextDecorator {
  constructor(
    private translationService: TranslationService, 
    private encryptionService: EncryptionService
  ) {}

  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>()

    for (const { from, to } of view.visibleRanges) {
      this.processVisibleRange(view, from, to, builder)
    }

    return builder.finish()
  }

  private processVisibleRange(
    view: EditorView, 
    from: number, 
    to: number, 
    builder: RangeSetBuilder<Decoration>
  ) {
    const text = view.state.doc.sliceString(from, to)
    const encryptedMatches = this.findEncryptedMatches(text, from)

    for (const { start, end, encryptedText } of encryptedMatches) {
      this.addDecoration(builder, view, encryptedText, start, end)
    }
  }

  private findEncryptedMatches(
    text: string, 
    from: number
  ): Array<{ 
    start: number
    end: number,
    encryptedText: string
  }> {
    const matches: Array<{ 
      start: number
      end: number
      encryptedText: string 
    }> = []

    let match

    while ((match = ENCRYPTED_TEXT_REGEXP.exec(text)) !== null) {
      const start = from + match.index
      const end = start + match[0].length
      const encryptedText = match[0]

      matches.push({ 
        start, 
        end, 
        encryptedText
      })
    }

    return matches
  }

  private addDecoration(
    builder: RangeSetBuilder<Decoration>, 
    view: EditorView, 
    encryptedText: string,
    start: number, 
    end: number
  ) {
    builder.add(
      start,
      end,
      Decoration.replace({
        widget: new EncryptedTextWidget(
          view,
          this.translationService, 
          this.encryptionService,
          encryptedText,
          start, 
          end
        )
      })
    )
  }
}