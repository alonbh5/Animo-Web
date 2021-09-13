const mongoose = require('mongoose');

export type Article = {
    title?: string;
    author?: string;
    link?: string;
    img?: string;
    content?: string;
   
}
