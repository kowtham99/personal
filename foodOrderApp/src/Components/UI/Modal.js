import classes from "./Modal.module.css";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;

// import styles from "./Modal.module.css";
// import ReactDom from "react-dom";
// import { Fragment } from "react";

// const BackDrop = (props) => {
//   return <div className={styles.backdrop} onClick = {props.onClose}></div>;
// };

// const ModalOverLay = (props) => {
//   return (
//     <div className={styles.modal}>
//       <div className={styles.content}>{props.children}</div>
//     </div>
//   );
// };
// const portalElement = document.getElementById("overlays");
// const Modal = (props) => {
//   return (
//     <Fragment>
//       {ReactDom.createPortal(<BackDrop onClose = {props.onClose}/>, portalElement)}
//       {ReactDom.createPortal(
//         <ModalOverLay>{props.children}</ModalOverLay>,
//         portalElement
//       )}
//     </Fragment>
//   );
// };

// export default Modal;
