const mongoose = require('mongoose');

export type Role = {
    role_id: number;
    Permissions: string[];
    role_type: string;
}
