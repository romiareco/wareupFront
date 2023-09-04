import React, { useState, useEffect } from "react";
import { BackdropGallery } from "./BackdropGallery";
import { Deposit } from "../../api";
import { useAuth } from "../../hooks";
import { mapBase64ToImage } from "../../utils/mapFunctions";
import noImage from "../../assets/deposit-images/producto-sin-imagen.png";
import "../../theme/PublicationView.css";

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
          const processedImages = response.depositImages.map((depositImage) =>
            mapBase64ToImage(depositImage.image)
          );
          setDepositImages(processedImages);
          setCurrentImage(processedImages[0]);
        } else {
          setDepositImages([noImage]);
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
          <img
            src={currentImage}
            alt="product-1"
            onClick={handleToggle}
            className="current-image"
          />
        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
          depositImages={depositImages}
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
                <img
                  src={th}
                  alt={`product-${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
