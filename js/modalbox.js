class Modal {
  constructor(box) {
    this.box = box,
    this.render()
  }    
  render() {
    if (Array.from(this.box.children).some(item => item.closest('img'))) {
      let boxInner = document.createElement('div');
      boxInner.classList.add('item__inner-img');
      Array.from(this.box.children).forEach(item => {
        if (item.closest('img')) boxInner.append(item);
      });
      Array.from(boxInner.children).forEach((item, idx) => item.setAttribute('data-i', `${idx}`))
      this.box.append(boxInner);
    }
    window.addEventListener('click', event => {
      if (event.target.closest('img') && event.target != modalImg) { 
        this.images = event.target.parentElement.querySelectorAll('img');
        this.slide = event.target.getAttribute('data-i');
        modalImg.src = event.target.src;
        modalBox.append(modalImg)
        document.body.append(modalBox);
        this.images.length > 1 ? modalBox.append(btnModalLeft, btnModalRight, btnModalClose) : modalBox.replaceChildren(modalImg, btnModalClose);
      }
      else if (event.target == modalBox || event.target == btnModalClose) {
        modalBox.remove()
      }
    });        
    btnModalLeft.addEventListener('click', () => {
      this.start = -1;
    });
    btnModalRight.addEventListener('click', () => {
      this.start = 1;
    });
  }
  get start() {
    return this.slide
  } 
  set start(n) {
    this.slide = (+this.slide + n + this.images.length) %this.images.length;
    modalImg.src = this.images[this.slide].src
  }
}
let boxs = document.querySelectorAll('.item');
let modalBox = document.createElement('div');
let modalImg = document.createElement('img');
modalBox.classList.add('modal__bg');
modalImg.classList.add('modal__img');
let btnModalLeft = document.createElement('div');
let btnModalRight = document.createElement('div');
let btnModalClose = document.createElement('div');
btnModalLeft.classList.add('btn__modal-left');
btnModalRight.classList.add('btn__modal-right');
btnModalClose.classList.add('btn__modal-close');
for (let box of boxs) {
  new Modal(box);
}


// add image count class
let itemInnerImgs = document.querySelectorAll('.item__inner-img');
itemInnerImgs.forEach(item => {
  // console.log(item.children.length)
  if (item.children.length >= 4) {
    let itemImgCount = document.createElement('div');
    itemImgCount.classList.add('item__img-count');
    itemImgCount.innerHTML = `+${item.children.length - 3}`;
    item.append(itemImgCount)
  }
});
