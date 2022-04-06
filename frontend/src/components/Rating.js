import React from 'react'
import './Rating.css'

export default function Rating({rating,numReviews}) {
  return (
    <div>
      {rating>0 && <div>
          <span className={rating>=1 ? "fa fa-star checked" :"fa fa-star"}> </span>
          <span className={rating>=2 ? "fa fa-star checked" :"fa fa-star"}> </span>
          <span className={rating>=3 ? "fa fa-star checked" :"fa fa-star"}> </span>
          <span className={rating>=4 ? "fa fa-star checked" :"fa fa-star"}> </span>
          <span className={rating>=5 ? "fa fa-star checked" :"fa fa-star"}> <small id='vote-num'> {numReviews?`${numReviews} - votes`:""} </small>  </span>
      </div>}
    </div>
  )
}
