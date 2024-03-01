export const getFirstContainer = (id) => document.querySelector(`[data-id="${id}"]`);
export function handlerClick(event) {
  const { id } = event.target;
  this.$router.push({ path: '/about', query: { id } });
}

export function handleDragEnter(event) {
  event.preventDefault();
  const { target } = event;

  this.containersDataId.forEach((element) => {
    if (target.getAttribute('data-id') === element) {
      this.dropableContainer = target;
    }
  });
}

export function handleDragStart(event) {
  const data = {
    element: event.target.outerHTML,
    dataId: event.target.id,
  };
  const jsonData = JSON.stringify(data);
  event.dataTransfer.setData('text/html', jsonData);
  this.previousContainer = event.target.parentElement;
}

export function handleDrop(event) {
  event.stopPropagation();
  if (this.previousContainer !== this.dropableContainer) {
    const draggedElement = JSON.parse(event.dataTransfer.getData('text/html'));
    this.isDropped = true;
    this.droppedElementId = draggedElement.dataId;
    this.dropableContainer.innerHTML += draggedElement.element;
    this.dropableContainer.childNodes.forEach((element) => {
      element.addEventListener('dragstart', this.handleDragStart);
      element.addEventListener('click', this.handlerClick);
    });
  }
}

export function addNewUserCard(Vue, UserCard) {
  const NewUserCardComponent = Vue.extend(UserCard);
  const newUserCardInstance = new NewUserCardComponent({
    propsData: {
      handleDragStart: this.handleDragStart,
      handlerClick: this.handlerClick,
    },
  });
  newUserCardInstance.$store = this.$store;
  newUserCardInstance.$mount();
  this.firstContainer.appendChild(newUserCardInstance.$el);
}

export function removePreiousUserCard() {
  this.previousContainer.childNodes.forEach((element) => {
    if (element.id === this.droppedElementId) {
      element.remove();
      this.isDropped = false;
    }
  });
}
