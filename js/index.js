let elInput = document.querySelector('.js-input')
let elList = document.querySelector('.js-last')

let localData = localStorage.getItem('todos')
let todos = localData ? JSON.parse(localData) : [];


 






function creatTodo(todo){
  let elLi = document.createElement('li')
  let elCheckbox = document.createElement('input')
  let elTitle = document.createElement('p')
  let elDiv = document.createElement('div')
  let elBtnEdit= document.createElement('button')
  let elBtnDelete= document.createElement('button')

  elBtnEdit.textContent = 'Edit'
  elBtnEdit.className = 'btn  btn-success me-2 edit'
 

  elBtnDelete.textContent = 'Delete'
  elBtnDelete.className = 'btn btn-danger delete'
 
  

  elDiv.className = 'ms-auto'
  elLi.className = ' border-bottom py-2 px-3 d-flex align-items-center item'
  elLi.dataset.id = todo.id

  elCheckbox.checked = todo.isComplated
  elCheckbox.type='checkbox'
  elCheckbox.className = 'mb-0 complated'
  
  
  
  elTitle.textContent = todo.title
  elTitle.className = 'm-0 ms-2 '

  if(todo.isComplated){
    elTitle.classList.add('text-decoration-line-through')
    elTitle.classList.add('text-muted')
    
  }

  elLi.appendChild(elCheckbox)
  elLi.appendChild(elTitle)
  elLi.appendChild(elDiv)
  elDiv.appendChild(elBtnEdit)
  elDiv.appendChild(elBtnDelete)
  elList.appendChild(elLi)
}

function renderElements(array){
  elList.innerHTML=null
  for (var i = 0; i < array.length; i++) {
    creatTodo(array[i])
   }
 }
 
 
 elInput.addEventListener('keyup',function handAddTodo(evt){
   if(evt.keyCode===13){
     var newTodo={
       id:uuid.v4(),
       title:elInput.value,
       isComplated: false
      }
      todos.unshift(newTodo)
      renderElements(todos)
      localStorage.setItem('todos' , JSON.stringify(todos));
      elInput.value = null;
    }
  })

  
  let handDeleteTodo = (item)=>{
  let filtredArr = []
  for (let i = 0; i < todos.length; i++) {
  if(todos[i].id !== item.dataset.id){
    filtredArr.push(todos[i])
  }
  }
  todos = filtredArr
  localStorage.setItem('todos', JSON.stringify(filtredArr))
  renderElements(filtredArr)
  }

  let handEditTodo = (index) =>{
    let elText = prompt(`O'zgartiring`,todos[index].title)
    todos[index].title = elText
    localStorage.setItem('todos', JSON.stringify(todos))
    renderElements(todos)
  }

  let  handComplatedTodo = (evt,index) =>{
    todos[index].isComplated = evt.target.checked
    localStorage.setItem('todos', JSON.stringify(todos))
    renderElements(todos)
  }

  elList.addEventListener('click', (evt)=>{
    let elItem = evt.target.closest('.item')
    let foundTodoIndex = todos.findIndex((element)=>element.id === elItem.dataset.id)
    if(evt.target.matches('.delete')) return handDeleteTodo(elItem)
    if(evt.target.matches('.edit')) return handEditTodo(foundTodoIndex)
    if(evt.target.matches('.complated')) return handComplatedTodo(evt, foundTodoIndex)
    
})


renderElements(todos);
