import siteNotFinishedImage from "../../assets/site-not-finished/site-not-finished.jpg";

export function SiteUnderConstruction() {
    return (
        <div>
        <img
          src={siteNotFinishedImage}
          alt="Sitio no terminado"
          style={{ width: "100%", height: "600px" }}
        />
      </div>

    );
}