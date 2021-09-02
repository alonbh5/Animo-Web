const mongoose = require('mongoose');

export type Article = {
    title?: string;
    author?: string;
    url?: string;
    img?: string;
    content?: string;
   
}
