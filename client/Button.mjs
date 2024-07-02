export function Button() {
    // Render the button first
    const buttonElement = `
        <button id="click">Click me!</button>
    `;

    // Now add event listener after rendering
    setTimeout(() => {
        document.getElementById('click').addEventListener('click', () => {
            console.log('clicked');
        });
    }, 0);

    return buttonElement;
}
