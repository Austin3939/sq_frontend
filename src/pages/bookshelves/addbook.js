import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewBookForm from '../../components/books/newbookform';
import './editbook.css';

const EditBook = () => {

    return (
        <div className="libraryContainer">
            <div>
                <NewBookForm />
            </div>
        </div>
    );
};

export default EditBook;