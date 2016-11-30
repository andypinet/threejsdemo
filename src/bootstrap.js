export function bootstrapRender(renderFunc) {
    return function render() {
        requestAnimationFrame(render);
        renderFunc();
    }
}