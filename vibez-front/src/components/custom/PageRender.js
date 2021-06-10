import React from 'react';
import NotFound from '../NotFound/NotFound';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
const generatepage = (pageName) => {
    const component = () => require(`../../page/${pageName}`).default

    try {
      return React.createElement(component())
    } catch (err) {
      return <NotFound />
    }
}

const PageRender = () => {
    const {page, id} = useParams()

    const {auth} = useSelector(state => state)

    let pageName = "";

    if(auth.token){
      if(id){
        pageName = `${page}/[id]` 
      }else{
        pageName = `${page}`
      }
    }
    
    return generatepage(pageName)
}
export default PageRender;