import React, { useState } from 'react';
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from 'history';
import Home from './Home';
import Modal from './Modal'
import '../App.css';

function App() {
  const history = createBrowserHistory();
  const [showModal, setShowModal] = useState(false);
  const [imageDetail, setImageDetail] = useState(null);

  const handleModal = () => {
    setShowModal((state) => !state.showModal)
  };

  const handleClose = () => {
    handleModal();
    history.back();
  }
  const handleImageClick = (image) => {
    handleModal();
    setImageDetail(image);
    history.push("/photo");
  }
  return (
    <Router history={history}>
        <Home handleImageClick={handleImageClick}>
          <Switch>
            <Route path="/photo">
              <Modal show={showModal} imageInfo={imageDetail} onClose={handleClose} />
            </Route>
          </Switch>
        </Home>
    </Router>
  );
}

export default App;
