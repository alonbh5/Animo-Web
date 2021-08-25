const mongoose = require('mongoose');

export type User = {
    id?: string;
    role_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    age?: number;
    gender?: string; 
    permissions_to_app?: string[];
    persQuiz?: []
    personality?: string;
}
