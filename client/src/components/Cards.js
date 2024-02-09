import React from 'react'

const Cards = (props) => {
    return (
        <>
            <div className="card text-center ">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src={props.source} className="img-fluid" />
                </div>
                <div className="card-header">{props.header}</div>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">
                        {props.para}
                    </p>
                </div>
            </div>

        </>
    )
}

export default Cards