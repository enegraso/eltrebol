import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { getAllCategories } from '../../store/actions/categories'

const CategoriesAdmin = (props) => {

     useEffect(() => {
        props.getAllCategories()
    },[]) 

    if (!props.allCategories) 
        return <> Cargando... </>
 
    return <>
         {props.allCategories.map(category => {
            return <div key={ category.id }>{ category.id } - {category.category} <button> Editar </button> <button> Eliminar </button> </div>
         })}
    </>
}

const mapStateToProps = (state) => {
    return {
        allCategories: state.allCategories
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(getAllCategories())
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(CategoriesAdmin)