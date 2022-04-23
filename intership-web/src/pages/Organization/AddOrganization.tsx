/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

const AddOrganization = ({active, setActive}) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={active?"modal active":"modal"} onClick={() => setActive(false)}>
           <div className="modal__content" onClick={e => e.stopPropagation()}>
                <input type='text'></input>
                <input type='text'></input>
                <input type='text'></input>
            </div> 
        </div>
    )
}

export default AddOrganization

// class Names библиотека