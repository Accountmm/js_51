class Slider {
    constructor({
        slider,
        sliderLine,
        prev,
        next,
        dir,
        autoPlay,
        autoPlayTime
    }) {
        this.slider = document.querySelector(slider);
        this.sliderLine = document.querySelector(sliderLine);
        this.sliderLine.style.cursor = `pointer`
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.autoPlayTime = autoPlayTime || 4000
        this.dir = dir == undefined ? `X` : dir.toUpperCase() == `Y` ? `Y` : `X`
        this.slides = [...this.sliderLine.children]
        this.sliderLine.style.height = `${this.height()}px`
        this.active = 0
        this.moveSize = this.dir === `X` ? this.sliderLine.clientWidth : this.sliderLine.clientHeight
        // console.log(this.moveSize);
        this.sliderLine.style.overflow = `hidden`;   
        this.slides[this.active].style.transition = `ease 1s`
        this.slides.forEach((slide, i) => {
            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${this.moveSize}px)`
                // slide.classList.add(`hide`)
            }
            if (i === this.slides.length - 1) {
                slide.style.transform = `translate${this.dir}(-${this.moveSize}px)`
            }

        })

        if (autoPlay) {
            this.play = setInterval(() => {
                this.move(this.next)
            }, this.autoPlayTime);
        }
        this.next.addEventListener('click', () => {
            this.move(this.next)
            clearInterval(this.play)
        });
        this.prev.addEventListener('click', () => {
            this.move(this.prev)
            clearInterval(this.play)
        });
        // this.sliderLine.addEventListener(`click`, (e) => this.clickMove(e))
    }
    changeActive(btn) {
        if (btn == this.next) {
            this.active++
            if (this.active > this.slides.length - 1) {
                this.active = 0
            }
        } else if (btn == this.prev) {
            this.active--
            if (this.active < 0) {
                this.active = this.slides.length - 1
            }
        }

        // console.log(this.active);
    }

    // clickMove(e) {
    //     // this.slides.forEach((slide, i) => {
    //     //     i
    //     //     if (i < 0) {
    //     //         i = this.slides.length - 1
    //     //     }
    //     //     console.log(i);
    //     // }) 
    //     if (e.offsetX < this.sliderLine.clientWidth / 2) {
    //         this.slides[this.active].style.transform = `translate${this.dir}(${this.moveSize}px)`
    //         // console.log(this.nextIndex);
    //         // const left = e.offsetX < this.sliderLine.clientWidth / 2


    //     } else {
    //         // console.log('right');
    //         this.slides[this.active].style.transform = `translate${this.dir}(${-this.moveSize}px)`
    //     }
    //     // this.changeActive()
    // }
    dislableBtn() {
        this.prev.disabled = true;
        this.next.disabled = true;
        setTimeout(() => {
            this.prev.disabled = false;
            this.next.disabled = false;
        }, 1050);
    }
    move(btn) {
        // console.log(this.dislableBtn());
        const moveSlide = btn == this.next ? -this.moveSize : this.moveSize
        // let moving = btn == 
        this.slides.forEach((slide, i) => {
            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${-moveSlide}px)`
                slide.style.transition = `0s`
            }
        })
        // console.log(this.slides[this.active]);
        this.slides[this.active].style.transform = `translate${this.dir}(${this.next ? moveSlide : -moveSlide}px)`
        this.changeActive(btn)
        this.slides[this.active].style.transform = `translate(0)`
        this.slides[this.active].style.transition = `ease 1s`
        this.dislableBtn()
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
    dir: `x`,
    autoPlay: true,
    autoPlayTime: 3000
})