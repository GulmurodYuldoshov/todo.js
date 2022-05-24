var elInput = document.querySelector('.js-input')
var elList = document.querySelector('.js-last')

var localData = localStorage.getItem('todos')
var todos = localData ? JSON.parse(localData) : [];


 
let handDeleteTodo = (evt)=>{
let filtredArr = []
for (let i = 0; i < todos.length; i++) {
if(todos[i].id !== evt.target.dataset.id){
  filtredArr.push(todos[i])
}
}
todos = filtredArr
localStorage.setItem('todos', JSON.stringify(filtredArr))
renderElements(filtredArr)
}




function creatTodo(todo){
  var elLi = document.createElement('li')
  var elCheckbox = document.createElement('input')
  var elTitle = document.createElement('p')
  var elDiv = document.createElement('div')
  var elBtnEdit= document.createElement('button')
  var elBtnDelete= document.createElement('button')

  elBtnEdit.textContent = 'Edit'
  elBtnEdit.className = 'btn  btn-success me-2 edit'
  elBtnDelete.textContent = 'Delete'
  elBtnDelete.className = 'btn btn-danger delete'
  elBtnDelete.dataset.id = todo.id


  elDiv.className = 'ms-auto'
  elTitle.className = 'm-0 ms-2 '
  elLi.className = ' border-bottom py-2 px-3 d-flex align-items-center'
  
  elCheckbox.type='checkbox'
  elCheckbox.className = 'mb-0'
  
 
  elTitle.textContent = todo.title
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

elList.addEventListener('click', (evt)=>{
  if(evt.target.matches('.delete')){
    handDeleteTodo(evt)
  } else if(evt.target.matches('.edit')){
    prompt('uzgartirmoqchimisiz')
  }
})
renderElements(todos);
