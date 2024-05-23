import { htmlClasses, svgs } from '../../scripts/globals/enums';

describe('htmlClasses', () => {
    test('should have expected keys', () => {
        expect(htmlClasses.DIALOG).toBe('dialog')
        expect(htmlClasses.DIALOG_BUTTON_CLOSE).toBe('dialog-button-close')
        expect(htmlClasses.DIALOG_OPEN).toBe('dialog-open')
        expect(htmlClasses.DIALOG_PHOTO_LINK).toBe('dialog-photo-link')
    })
})

describe('svgs', () => {
    test('should have expected keys', () => {
        expect(svgs.DIALOG_CLOSE_BTN.startsWith('<svg')).toBeTruthy()
    })
})