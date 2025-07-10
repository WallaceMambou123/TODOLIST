import React from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import Tofftodo from '../assets/images/temp1.png'


function accueil_list() {
  return (
    <div className='accueil_back'>
        <div className='presentation'>
            <h1>To Do List</h1>
            <br/>
           <p>TodoList est une application intuitive et conviviale conçue pour vous aider à organiser vos tâches quotidiennes et à améliorer votre productivité. Que vous soyez un étudiant, un professionnel ou simplement quelqu'un qui souhaite mieux gérer son temps, TodoList s'adapte à vos besoins.</p>
           <Link to="todo" className='com_button'>
                Commencons   <FontAwesomeIcon style={{position: 'relative', top :'2px' ,paddingRight : "10px" }} icon={faArrowRight} />
            </Link>
        </div>

        <div className='photo'>
            <img src={Tofftodo} style={{width : "30%", height: "10%"}} />
        </div>
    </div>
  )
}

export default accueil_list