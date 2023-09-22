import "../styles/globals.css";
import {ListItem} from "@chakra-ui/react";
import axios from "axios";
import {useEffect} from "react";
import ReactDOM from 'react-dom';
import document from '@angular/common';
import "@angular/compiler";

export default function updatePictures() {
  useEffect(() => {
    axios
      .get("http://localhost:8080/pictures")
        .then(function (response) {
          console.log(response.data)
          const newPics = response.data;
          return (
            <ul>
              {newPics.map((newPic: {id: any;}) =>
                <ListItem key={newPic.id}/>
              )}
            </ul>
          )
        })
        .catch(function (error) {
          console.log(error);
        });
  }, []);
}

useEffect(() => {
  // @ts-ignore
  const root = ReactDOM.unstable_createRoot(global.document.getElementById('root'));
  root.render(updatePictures);//<Picture image_address={updatePictures().image_address} alt_text={updatePictures().alt_text}/>);
})
  