class Slider {
    constructor({
        slider,
        sliderLine,
        prev,
        next,
        dir
    }) {
        this.slider = document.querySelector(slider);
        this.sliderLine = document.querySelector(sliderLine);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.dir = dir == undefined ? `X` : dir.toUpperCase() == `Y` ? `Y` : `X`
        this.slides = [...this.sliderLine.children]
        this.sliderLine.style.height = `${this.height()}px`
        this.active = 0
        this.moveSize = this.dir === `X` ? this.sliderLine.clientWidth : this.sliderLine.clientHeight
        console.log(this.moveSize);

        this.slides.forEach((slide, i) => {
            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${this.moveSize}px)`
                slide.classList.add(`hide`)
            }
            if (i === this.slides.length - 1) {
                slide.style.transform = `translate${this.dir}(-${this.moveSize}px)`
            }

        })

        this.next.addEventListener('click', () => this.move(this.next));
        this.prev.addEventListener('click', () => this.move(this.prev));
    }
    move(btn) {
        const moveSlide = btn == this.next ? -this.moveSize : this.moveSize
        // let moving = btn == 
        this.slides.forEach((slide, i) => {
            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${-moveSlide}px)`
            }
        })
        // console.log(this.slides[this.active]);
        this.slides[this.active].style.transform = `translate${this.dir}(${this.next ? moveSlide : -moveSlide}px)`
        this.slides[this.active].style.transition = `ease 1s`
    }
    height() {
        return Math.max(...this.slides.map(slide => slide.clientHeight))
    }
}
new Slider({
    slider: `.slider`,
    sliderLine: `.slider__line`,
    prev: `.prev`,
    next: `.next`,
    dir: `X`
})