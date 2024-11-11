import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditBookForm from '../../components/books/editbookform';

const EditBook = () => {

    return (
        <div className="libraryContainer">
            <h1>My Library</h1>
            
            <div>
                <EditBookForm />
            </div>
        </div>
    );
};

export default EditBook;