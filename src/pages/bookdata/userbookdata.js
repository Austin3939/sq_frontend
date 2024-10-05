import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserBookDataForm from '../../components/books/userbookdataform';

const EditBook = () => {

    return (
        <div className="libraryContainer">
            <h1>User Book Data</h1>
            
            <div>
                <UserBookDataForm />
            </div>
        </div>
    );
};

export default EditBook;