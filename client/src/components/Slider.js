import React from 'react'

const Slider = () => {
    return (
        <>
            <div id="carouselExampleInterval" className="carousel slide" data-mdb-ride="carousel" data-mdb-carousel-init>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-mdb-interval={10000}>
                        <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" className="d-block w-100" alt="Wild Landscape" />
                    </div>
                    <div className="carousel-item" data-mdb-interval={2000}>
                        <img src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp" className="d-block w-100" alt="Camera" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp" className="d-block w-100" alt="Exotic Fruits" />
                    </div>
                </div>
                <button className="carousel-control-prev" data-mdb-target="#carouselExampleInterval" type="button" data-mdb-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" data-mdb-target="#carouselExampleInterval" type="button" data-mdb-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </>
    )
}

export default Slider