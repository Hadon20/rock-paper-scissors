export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function disableButtons(disabled: boolean) {
    const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>
    buttons.forEach(btn => btn.disabled = disabled)
}