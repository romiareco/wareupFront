import React, { useState, useEffect } from "react";
import { Backdrop, IconButton } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export function BackdropGallery({
  open,
  handleClose,
  currentPassedImage,
  depositImages,
}) {
  const [backdropImage, setBackdropImage] = useState(currentPassedImage);
  const [currentPassedImageIndex, setCurrentPassedImageIndex] = useState(1);

  useEffect(() => {
    setBackdropImage(currentPassedImage);
    depositImages.forEach((imgg, index) => {
      imgg === currentPassedImage && setCurrentPassedImageIndex(index);
    });
  }, [currentPassedImage, depositImages]);

  const handleClick = (index = null) => {
    setBackdropImage(depositImages[index]);
    setCurrentPassedImageIndex(index);
  };

  const handleIncrement = () => {
    if (currentPassedImageIndex === depositImages.length - 1) {
      setBackdropImage(depositImages[0]);
      setCurrentPassedImageIndex(0);
    } else {
      setBackdropImage(depositImages[currentPassedImageIndex + 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (currentPassedImageIndex === 0) {
      setBackdropImage(depositImages[depositImages.length - 1]);
      setCurrentPassedImageIndex(depositImages.length - 1);
    } else {
      setBackdropImage(depositImages[currentPassedImageIndex - 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex - 1);
    }
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  return (
    <Backdrop
      className="backdrop"
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <section className="backdrop-content">
        <IconButton
          onClick={handleClose}
          sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <div className="image">
          <IconButton
            className="icon-button-prev"
            disableRipple
            onClick={() => {
              handleDecrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NavigateBeforeRoundedIcon />
          </IconButton>
          <IconButton
            className="icon-button-next"
            disableRipple
            onClick={() => {
              handleIncrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NavigateNextRoundedIcon />
          </IconButton>
          <img
            src={backdropImage}
            alt="selected-product"
            style={{ cursor: "auto" }}
          />
        </div>
        <div className="thumbnails">
          {depositImages.map((th, index) => {
            return (
              <div
                className="img-holder-backd"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div
                  className={`outlay ${
                    index === currentPassedImageIndex && "activated"
                  }`}
                ></div>
                <img src={th} alt={`product-${index + 1}`} />
              </div>
            );
          })}
        </div>
      </section>
    </Backdrop>
  );
}
