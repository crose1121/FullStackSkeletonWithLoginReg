import React from 'react';


const NewItemForm = () => { //change function name for each project
    return (
        <div>
            <form action="">

                <div className="form-group">
                    <label htmlFor=""> </label> {/* change labels and inputs for each project*/ }
                    <input type="text" className="form-control" />
                </div>

                <hr />
                <input type="submit" value="" className="btn btn-info" />
            </form>
        </div>
    );
};



export default NewItemForm; //change this for each project