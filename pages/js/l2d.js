

(async function () {
    // Create Pixi.js application with transparent background
    const app = new PIXI.Application({
        view: document.getElementById('l2d'),
        backgroundColor: 0x000000,
        transparent: true
    });

    // Load Live2D model
    const model = await PIXI.live2d.Live2DModel.from('../assets/dolls/97/l2d/break/char097_break.model3.json');
    app.stage.addChild(model);

    const scaling = .1// Scaling factor for L2D
    model.scale.set(scaling);

    // Center and scale the model to fit within the canvas
    function adjustModelSize() {
        const canvasWidth = app.screen.width;
        const canvasHeight = app.screen.height;
        // Center the model
        model.position.set(canvasWidth / 2, canvasHeight / 2);
        model.anchor.set(0.5, 0.5);
    }

    // Initial adjust
    adjustModelSize();

    // Resize the canvas when the window is resized
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        adjustModelSize();
    });
})();