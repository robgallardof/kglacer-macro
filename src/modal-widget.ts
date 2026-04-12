export type ModalWidgetOptions = {
  closeSelector?: string
  focusSelector?: string
}

/** Reusable modal controller for image dialogs. */
export class ModalWidget {
  protected ignoreNextBackdropClick = false

  public constructor(
    protected readonly dialog: HTMLDialogElement,
    protected readonly options: ModalWidgetOptions = {},
  ) {
    this.dialog.classList.add('modal-widget')
    const closeButton = this.options.closeSelector
      ? this.dialog.querySelector<HTMLButtonElement>(this.options.closeSelector)
      : undefined
    closeButton?.addEventListener('click', () => {
      this.dialog.close()
    })
    this.dialog.addEventListener('click', (event) => {
      if (this.ignoreNextBackdropClick) {
        this.ignoreNextBackdropClick = false
        return
      }
      if (event.target === this.dialog) this.dialog.close()
    })
  }

  public open() {
    if (!this.dialog.open) {
      this.dialog.style.position = 'fixed'
      this.dialog.style.left = ''
      this.dialog.style.top = ''
      this.dialog.style.margin = 'auto'
      this.dialog.showModal()
    }
    if (this.options.focusSelector) {
      this.dialog
        .querySelector<HTMLElement>(this.options.focusSelector)
        ?.focus({ preventScroll: true })
    }
  }

  public markBackdropClickIgnored() {
    this.ignoreNextBackdropClick = true
  }
}
