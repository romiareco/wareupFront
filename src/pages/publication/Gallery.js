import React, { useState, useEffect } from "react";
import { BackdropGallery } from "./BackdropGallery";

import prod1 from "../Pictures/image-product-1.jpg";
import prod2 from "../Pictures/image-product-2.jpg";
import prod3 from "../Pictures/image-product-3.jpg";
import prod4 from "../Pictures/image-product-4.jpg";

import thumb1 from "../Pictures/image-product-1-thumbnail.jpg";
import thumb2 from "../Pictures/image-product-2-thumbnail.jpg";
import thumb3 from "../Pictures/image-product-3-thumbnail.jpg";
import thumb4 from "../Pictures/image-product-4-thumbnail.jpg";
import { Deposit } from "../../api";
import { useAuth } from "../../hooks";
import { mapBase64ToImage } from "../../utils/mapFunctions";
import noImage from "../../assets/deposit-images/producto-sin-imagen.png";

// const IMAGES = [prod1, prod2, prod3, prod4];
//const THUMBS = [thumb1, thumb2, thumb3, thumb4];

const depositController = new Deposit();

export function Gallery({ depositId }) {
  const { accessToken } = useAuth();
  const [currentImage, setCurrentImage] = useState({});
  const [currentPassedImage, setCurrentPassedImage] = useState({});
  const [open, setOpen] = useState(false);
  const [depositImages, setDepositImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await depositController.getDepositImages(
          accessToken,
          depositId
        );

        if (response.depositImages.length > 0) {
          const processedImages = response.depositImages.map(
            (depositImage) => (
                mapBase64ToImage(depositImage.image)
            )
          );
          setDepositImages(processedImages);
          setCurrentImage(processedImages[0]);
        } else {
          setDepositImages(noImage);
          setCurrentImage(noImage);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, depositId]);

  const handleClick = (index) => {
    setCurrentImage(depositImages[index]);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          <img src={currentImage} alt="product-1" onClick={handleToggle} />
        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
        />
        <div className="thumbnails">
          {depositImages.map((th, index) => {
            return (
              <div
                className="img-holder"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div className={`outlay ${index === 0 && "activated"}`}></div>
                <img src={th} alt={`product-${index + 1}`} />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
