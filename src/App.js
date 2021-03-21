import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import './App.css';
import {Header, Cards, ImageSlider} from './components';
import {SliderData} from './components/slider/SliderData';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((resp) => resp.json())
            .then((json) => {
                setPosts(json);
                setLoading(false);
            });
    }, []);

    function handleDelete(id) {
        const confirmDelete = window.confirm("Are you realy want to delete?");
        if (confirmDelete) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
            .then((resp) => resp.json())
            .then(() => {
                let res = [...posts];
                let index =  _.findIndex(posts, (o) => { return o.id === id; });
                res.splice(index, 1)
                setPosts(res);
            }); 
        } 
        return null;
    }

    function handleEdit({title, description, id}) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'PUT', body: {title, body: description} })
        .then((resp) => resp.json())
        .then((data) => {
            let res = [...posts];
            let index =  _.findIndex(posts, (o) => { return o.id === data.id; });
            res[index] = {...res[index], ...{title, body: description}};
            setPosts(res);
        });
    }

    function handleCreate({title, description}) {
        fetch(`https://jsonplaceholder.typicode.com/posts`, { method: 'POST', body: {title, body: description} })
        .then((resp) => resp.json())
        .then((data) => {
            let res = [...posts];
            res.unshift({title, body: description, id: data.id});
            setPosts(res);
        });    
    }

    return (
        <div className="App">
            <Header onCreate={handleCreate}/>
            <Cards posts={posts} isLoading={loading} onDelete={handleDelete}  onEdit={handleEdit}/>
            <ImageSlider slides={SliderData}/>
        </div>
    );
}

export default App;
