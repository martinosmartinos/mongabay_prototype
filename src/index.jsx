// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
 
ReactDOM.render(<App source='https://news.mongabay.com/wp-json/wp/v2/posts/?_embed&per_page=10'/>, document.getElementById('app'));
